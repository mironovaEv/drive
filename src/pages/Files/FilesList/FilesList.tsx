/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useContext, useEffect, useState } from 'react';
import { Button, Layout, Space, Typography, Upload, UploadProps, message } from 'antd';
import { useLayoutConfig } from '../../../shared/hooks/useLayoutConfig/useLayoutConfig';
import { ReactReduxContext } from 'react-redux';
import { Paths } from '../../../shared/constants';
import block from 'bem-cn';
import MainHeader from '../../../features/MainHeader/MainHeader';
import './FilesList.scss';
import { FolderOutlined, CloudUploadOutlined, DoubleLeftOutlined, DeleteOutlined, FileOutlined } from '@ant-design/icons';
import FileComponent from '../components/FileComponent/FileComponent';
import {
  useCreateFolderMutation,
  useDeleteCompletelyMutation,
  useDeleteFilesMutation,
  useGetDirQuery,
  useGetFilesQuery,
  useGetRootDirQuery,
  useUploadFileMutation,
  useUploadMutation,
} from '../api/filesApi';
import { FormMode } from '../types';
import { IFolder } from '../api/types';
import { useNavigate } from 'react-router-dom';
import CreateRecordModal from '../components/createFolderModal/createFolder';
import { useGetFolderId } from '../../../shared/hooks/useGetFolderId/useGetFolderId';
import eventEmitter from '../../../shared/helpers/eventEmmiter';
import DeleteModal from '../components/deleteCompletelyModal/deleteCompletelyModal';
import axios from 'axios';
import { setUploadProgress } from '../../../redux/reducers/globalSlice';
import { useAppSelector } from '../../../redux/hooks';

const b = block('files-list');
const { Content } = Layout;

const FilesList: React.FC = () => {
  const navigate = useNavigate();
  const { setConfig } = useLayoutConfig();
  const { data: dataFiles, isLoading: isLoadingFiles } = useGetFilesQuery({ trashed: '' });
  const [checkedToDelete, setCheckedToDelete] = useState<string[]>([]);
  const [uploadPost, { isLoading: isLoadingUpload }] = useUploadMutation();

  const [showCreateRecordModal, setShowCreateRecordModal] = useState(false);
  const [formCreateRecordMode, setFormCreateRecordMode] = useState<FormMode>(FormMode.Create);
  const [initialValues, setInitialValues] = useState<IFolder | object>({});

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [create, { isLoading: isLoadingCreate }] = useCreateFolderMutation();
  const [deleteFiles, { isLoading: isLoadingDelete }] = useDeleteFilesMutation();
  const [deleteCompletely, { isLoading: isLoadingDeleteCompletely }] = useDeleteCompletelyMutation();
  const folderId = useGetFolderId();

  const isDisabled = folderId === useGetRootDirQuery({}).data?.id ? true : false;
  const { data: currentDirectory } = useGetDirQuery(folderId, { skip: folderId === undefined });
  const prevDirId = currentDirectory?.parents ? currentDirectory.parents[0] : null;

  const handleAddFolder = useCallback(() => {
    setFormCreateRecordMode(FormMode.Create);
    setInitialValues({});
    setShowCreateRecordModal(true);
  }, []);

  const onCreateFolder = useCallback(
    async (values: IFolder) => {
      const result = await create({
        folderName: values.folderName,
        targetFolderId: folderId,
      });
      return result;
    },
    [create, folderId]
  );

  const onDeleteFiles = useCallback(async () => {
    const result = checkedToDelete.length > 0 ? await deleteFiles(checkedToDelete) : null;
    setCheckedToDelete([]);

    return result;
  }, [checkedToDelete, deleteFiles]);

  const onDeleteCompletely = useCallback(async () => {
    const result = checkedToDelete.length > 0 ? await deleteCompletely(checkedToDelete) : null;
    setCheckedToDelete([]);

    return result;
  }, [checkedToDelete, deleteCompletely]);

  const handleUploadFiles = ({ file }) => {
    try {
      const response = uploadPost({
        //endpoint
        method: 'post', // post, put, patch, delete
        data: { targetFolderId: folderId, file: file }, //your data to send to your backend
        setUploadProgress: setUploadProgress, //a function update upload progress
      });
    } catch (err) {
      console.log(err);
    }
  };

  const goParent = useCallback(
    parent => {
      setCheckedToDelete([]);
      navigate(`/files/${parent}`);
    },
    [navigate]
  );

  const setDelete = (id: string) => {
    const newArr = checkedToDelete;
    newArr.push(id);
    setCheckedToDelete(newArr);
    console.log(checkedToDelete);
  };

  const cancelDelete = (id: string) => {
    const newArr = checkedToDelete;
    newArr.splice(newArr.indexOf(id), 1);
    setCheckedToDelete(newArr);
    console.log(checkedToDelete);
  };

  useEffect(() => {
    setConfig({ activeMenuKey: Paths.Files, headerTitle: 'Мои файлы' });
  }, [setConfig]);
  return (
    <div className={b().toString()}>
      <MainHeader>
        <div className={b('main-buttons')}>
          <div className={b('main-buttons-container').toString()}>
            <Button
              disabled={isDisabled}
              onClick={() => goParent(prevDirId)}
              className={b('main-button').toString()}
              icon={<DoubleLeftOutlined style={{ fontSize: 20 }} />}
            ></Button>
            <Button onClick={() => handleAddFolder()} className={b('main-button').toString()} icon={<FolderOutlined style={{ fontSize: 20 }} />}>
              <div className={b('main-button-text').toString()}>Создать папку</div>
            </Button>

            <Upload showUploadList={false} multiple customRequest={handleUploadFiles} className={b('main-button-upload').toString()}>
              <Button disabled={isLoadingUpload} className={b('main-button').toString()} icon={<CloudUploadOutlined style={{ fontSize: 20 }} />}>
                <div className={b('main-button-text').toString()}>Загрузить</div>
              </Button>
            </Upload>

            <Button
              disabled={isLoadingDelete}
              onClick={onDeleteFiles}
              className={b('main-button').toString()}
              icon={<DeleteOutlined style={{ fontSize: 20 }} />}
            >
              <div className={b('main-button-text').toString()}>Отправить в корзину</div>
            </Button>
            <Button
              disabled={isLoadingDeleteCompletely}
              onClick={e => {
                e.stopPropagation;
                setShowDeleteModal(true);
              }}
              className={b('main-button').toString()}
              icon={<DeleteOutlined style={{ fontSize: 20 }} />}
            >
              <div className={b('main-button-text').toString()}>Удалить</div>
            </Button>
          </div>
        </div>
      </MainHeader>
      <Content>
        <div className={b('files-container').toString()}>
          {dataFiles?.map(file => (
            <FileComponent
              myRole={file.myRole}
              permissions={file.permissions}
              setCheckedToDelete={setCheckedToDelete}
              onSetDel={setDelete}
              onCancelDel={cancelDelete}
              id={file.id}
              visible={file.parents && file.parents[0] === folderId && !file.trashed}
              key={file.id}
              trashed={file.trashed}
              type={file.mimeType}
              name={file.name}
              size={file.size}
            />
          ))}
        </div>
      </Content>
      <CreateRecordModal
        formMode={formCreateRecordMode}
        initialValues={initialValues as IFolder}
        isLoading={isLoadingCreate}
        modal={{ visible: showCreateRecordModal, setVisible: setShowCreateRecordModal }}
        onSave={onCreateFolder}
      />
      <DeleteModal
        isLoading={isLoadingDeleteCompletely}
        modal={{
          visible: showDeleteModal,
          setVisible: setShowDeleteModal,
        }}
        onSave={onDeleteCompletely}
      />
    </div>
  );
};

export default FilesList;
