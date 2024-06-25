/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useEffect, useState } from 'react';
import { Button, Layout, Upload, UploadProps, message } from 'antd';
import { useLayoutConfig } from '../../../shared/hooks/useLayoutConfig/useLayoutConfig';
import { Paths } from '../../../shared/constants';
import block from 'bem-cn';
import MainHeader from '../../../features/MainHeader/MainHeader';
import './FilesList.scss';
import { FolderOutlined, CloudUploadOutlined, DoubleLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import FileComponent from '../components/FileComponent/FileComponent';
import {
  useCreateFolderMutation,
  useDeleteCompletelyMutation,
  useDeleteFilesMutation,
  useGetDirQuery,
  useGetFilesQuery,
  useGetRootDirQuery,
  useUploadFileMutation,
} from '../api/filesApi';
import { FormMode } from '../types';
import { IFolder } from '../api/types';
import { useNavigate } from 'react-router-dom';
import CreateRecordModal from '../components/createFolderModal/createFolder';
import { useGetFolderId } from '../../../shared/hooks/useGetFolderId/useGetFolderId';
import eventEmitter from '../../../shared/helpers/eventEmmiter';
import DeleteModal from '../components/deleteCompletelyModal/deleteCompletelyModal';

const b = block('files-list');
const { Content } = Layout;

const FilesList: React.FC = () => {
  const navigate = useNavigate();
  const { setConfig } = useLayoutConfig();
  const { data: dataFiles } = useGetFilesQuery({ trashed: '' });
  const [checkedToDelete, setCheckedToDelete] = useState<string[]>([]);

  const [showCreateRecordModal, setShowCreateRecordModal] = useState(false);
  const [formCreateRecordMode, setFormCreateRecordMode] = useState<FormMode>(FormMode.Create);
  const [initialValues, setInitialValues] = useState<IFolder | object>({});

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [create, { isLoading: isLoadingCreate }] = useCreateFolderMutation();
  const [deleteFiles, { isLoading: isLoadingDelete }] = useDeleteFilesMutation();
  const [deleteCompletely, { isLoading: isLoadingDeleteCompletely }] = useDeleteCompletelyMutation();
  const [uploadFile, { isLoading: isLoadingUpload }] = useUploadFileMutation();
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

  // const props: UploadProps = {
  //   name: 'files',
  //   action: 'http://localhost:8080/api/drive/files/upload?targetFolderId=' + folderId,

  //   onChange(info) {
  //     if (info.file.status !== 'uploading') {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (info.file.status === 'done') {
  //       message.success(`${info.file.name} file uploaded successfully`);
  //     } else if (info.file.status === 'error') {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  // };
  const onUploadFile = useCallback(
    async (values: { targetFolderId: string; files: FormData }) => {
      try {
        const res = await uploadFile(values);
        if ('error' in res) {
          console.log('error');
          return;
        } else {
          eventEmitter.emit('customMessage', 'success', 'Файлы успешно загружены');
        }
      } catch (error) {
        console.log('catcherror', error);
        return;
      }
    },
    [uploadFile]
  );

  const handleUploadFiles = ({ file }) => {
    onUploadFile({ targetFolderId: folderId, files: file });
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
            <Upload multiple customRequest={handleUploadFiles} className={b('main-button-upload').toString()}>
              <Button className={b('main-button').toString()} icon={<CloudUploadOutlined style={{ fontSize: 20 }} />}>
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
              disabled={isLoadingDelete}
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
              permissions={file.permissions}
              setCheckedToDelete={setCheckedToDelete}
              onSetDel={setDelete}
              onCancelDel={cancelDelete}
              id={file.id}
              visible={file.parents[0] === folderId && !file.trashed}
              key={file.id}
              trashed={file.trashed}
              type={file.mimeType}
              name={file.name}
              fileSize={file.size}
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
