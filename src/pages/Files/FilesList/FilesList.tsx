/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useEffect, useState } from 'react';
import { Button, Layout, Upload, UploadProps, message } from 'antd';
import { useLayoutConfig } from '../../../shared/hooks/useLayoutConfig/useLayoutConfig';
import { Paths } from '../../../shared/constants';
import block from 'bem-cn';
import MainHeader from '../../../features/MainHeader/MainHeader';
import './FilesList.scss';
import { FolderOutlined, CloudUploadOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import FileComponent from '../components/FileComponent/FileComponent';
import { useCreateFolderMutation, useGetDirQuery, useGetFilesQuery, useGetRootDirQuery } from '../api/filesApi';
import { FormMode } from '../types';
import { IFolder } from '../api/types';
import { useNavigate } from 'react-router-dom';
import CreateRecordModal from '../components/createFolderModal/createFolder';
import { useGetFolderId } from '../../../shared/hooks/useGetFolderId/useGetFolderId';
import { useParams } from 'react-router-dom';

const b = block('files-list');
const { Content } = Layout;

const FilesList: React.FC = () => {
  const navigate = useNavigate();
  const { setConfig } = useLayoutConfig();
  const { data: dataFiles } = useGetFilesQuery(undefined);

  const [showCreateRecordModal, setShowCreateRecordModal] = useState(false);
  const [formCreateRecordMode, setFormCreateRecordMode] = useState<FormMode>(FormMode.Create);
  const [initialValues, setInitialValues] = useState<IFolder | object>({});

  const [create, { isLoading: isLoadingCreate }] = useCreateFolderMutation();
  const folderId = useGetFolderId();

  const isDisabled = !useParams().folderId || useParams().folderId === useGetRootDirQuery({}).data?.id ? true : false;

  const parentIds = useGetDirQuery(folderId).data?.parents;
  const parent = parentIds ? parentIds[0] : '';

  const handleAddFolder = useCallback(() => {
    setFormCreateRecordMode(FormMode.Create);
    setInitialValues({});
    setShowCreateRecordModal(true);
  }, []);

  const onCreateFolder = useCallback(
    async (values: IFolder) => {
      const result = await create({
        folderName: values.folderName,
        targetFolderId: folderId!,
      });
      return result;
    },
    [create, folderId]
  );
  const props: UploadProps = {
    name: 'files',
    action: 'http://localhost:8080/api/drive/files/upload?targetFolderId=' + folderId,

    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
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
              onClick={() => navigate(`/files/${parent}`)}
              className={b('main-button').toString()}
              icon={<DoubleLeftOutlined style={{ fontSize: 20 }} />}
            ></Button>
            <Button onClick={handleAddFolder} className={b('main-button').toString()} icon={<FolderOutlined style={{ fontSize: 20 }} />}>
              <div className={b('main-button-text').toString()}>Создать папку</div>
            </Button>
            <Upload multiple {...props} className={b('main-button-upload').toString()}>
              <Button className={b('main-button').toString()} icon={<CloudUploadOutlined style={{ fontSize: 20 }} />}>
                <div className={b('main-button-text').toString()}>Загрузить</div>
              </Button>
            </Upload>
          </div>
        </div>
      </MainHeader>
      <Content>
        <div className={b('files-container').toString()}>
          {dataFiles?.map(file => (
            <FileComponent
              id={file.id}
              visible={file.parents[0] === folderId}
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
    </div>
  );
};

export default FilesList;
