import { useCallback, useEffect, useState } from 'react';
import { Button, Layout, Upload } from 'antd';
import { useLayoutConfig } from '../../../shared/hooks/useLayoutConfig/useLayoutConfig';
import { Paths } from '../../../shared/constants';
import block from 'bem-cn';
import MainHeader from '../../../features/MainHeader/MainHeader';
import './FilesList.scss';
import { FolderOutlined, CloudUploadOutlined } from '@ant-design/icons';
import FileComponent from '../components/FileComponent/FileComponent';
import { useCreateFolderMutation, useGetFilesQuery } from '../api/filesApi';
import { FormMode } from '../types';
import { IFolder } from '../api/types';
import CreateRecordModal from '../components/createFolderModal/createFolder';
import { useGetFolderId } from '../../../shared/hooks/useGetFolderId/useGetFolderId';

const b = block('files-list');
const { Content } = Layout;

const FilesList: React.FC = () => {
  const { setConfig } = useLayoutConfig();
  const { data: dataFiles } = useGetFilesQuery(undefined);

  const [showCreateRecordModal, setShowCreateRecordModal] = useState(false);
  const [formCreateRecordMode, setFormCreateRecordMode] = useState<FormMode>(FormMode.Create);
  const [initialValues, setInitialValues] = useState<IFolder | object>({});

  const [create, { isLoading: isLoadingCreate }] = useCreateFolderMutation();

  const folderId = useGetFolderId();
  console.log(folderId);

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
    [create]
  );

  useEffect(() => {
    setConfig({ activeMenuKey: Paths.Files, headerTitle: 'Мои файлы' });
  }, [setConfig]);
  return (
    <div className={b().toString()}>
      <MainHeader>
        <div className={b('main-buttons')}>
          <div className={b('main-buttons-container').toString()}>
            <Button onClick={handleAddFolder} className={b('main-button').toString()} icon={<FolderOutlined style={{ fontSize: 17 }} />}>
              <div className={b('main-button-text').toString()}>Создать папку</div>
            </Button>
            <Upload className={b('main-button-upload').toString()}>
              <Button className={b('main-button').toString()} icon={<CloudUploadOutlined style={{ fontSize: 18 }} />}>
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
