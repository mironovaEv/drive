import { Content } from 'antd/lib/layout/layout';
import './fileMenu.scss';
import { CommentOutlined, HistoryOutlined, LockOutlined, UploadOutlined } from '@ant-design/icons';
import ChangesModal from '../changesModal/changesModal';
import { useCallback, useState } from 'react';
import PermissionModal from '../permissionModal/PermissionModal';
import { ICreateComment, ICreatePermission } from '../../api/types';
import { useAddPermissionMutation, useCreateCommentMutation, useUpdateFileMutation } from '../../api/filesApi';
import CommentsModal from '../commentsModal/commentsModal';
import { Spin, Upload } from 'antd';
import { FileComponentProps } from '../FileComponent/FileComponent';
import eventEmitter from '../../../../shared/helpers/eventEmmiter';

type FileMenuProps = {
  setOpen: () => void;
  fileItem: FileComponentProps;
};

const FileMenu = ({ setOpen, fileItem }: FileMenuProps) => {
  const [showChangesModal, setShowChangesModal] = useState<boolean>(false);
  const [showPermissionModal, setShowPermissionModal] = useState<boolean>(false);
  const [showCommentsModal, setShowCommentsModal] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<ICreatePermission | object>({});
  const [createPermission, { isLoading: isLoadingCreate }] = useAddPermissionMutation();
  const [createComment, { isLoading: isLoadingCreateComment }] = useCreateCommentMutation();
  const [updateFile, { isLoading: isLoadingUpdate }] = useUpdateFileMutation();

  const onCreatePermission = useCallback(
    async (values: ICreatePermission) => {
      const result = await createPermission(values);
      return result;
    },
    [createPermission]
  );
  const onCreateComment = useCallback(
    async (values: ICreateComment) => {
      const result = await createComment(values);
      return result;
    },
    [createComment]
  );

  const onUpdateFile = useCallback(
    async (values: { fileId: string; file: FormData }) => {
      try {
        const res = await updateFile(values);
        if ('error' in res) {
          console.log('error');
          return;
        } else {
          setOpen(false);
          eventEmitter.emit('customMessage', 'success', 'Файл успешно обновлен');
        }
      } catch (error) {
        console.log('catcherror', error);
        return;
      }
    },
    [updateFile]
  );

  const handleUpdateFile = ({ file }) => {
    onUpdateFile({ fileId: fileItem.id, file: file });
  };

  return (
    <>
      <Spin spinning={isLoadingUpdate}>
        <Content>
          <div className="menu-container">
            <div>
              <button
                className={`menu-button ${fileItem.type?.includes('folder') ? 'noVis' : ''}`}
                onClick={e => {
                  e.stopPropagation();
                  setOpen(false);
                  setShowChangesModal(true);
                }}
              >
                <HistoryOutlined />
                <span className="menu-button-text">История изменений</span>
              </button>
            </div>
            <div>
              <button
                className="menu-button"
                onClick={e => {
                  e.stopPropagation();
                  setInitialValues({});
                  setOpen(false);
                  setShowPermissionModal(true);
                }}
              >
                <LockOutlined />
                <span className="menu-button-text">Права доступа</span>
              </button>
            </div>
            <div>
              <button
                className={`menu-button ${fileItem.type?.includes('folder') ? 'noVis' : ''}`}
                onClick={e => {
                  e.stopPropagation();
                  setOpen(false);
                  setShowCommentsModal(true);
                }}
              >
                <CommentOutlined />
                <span className="menu-button-text">Комментарии</span>
              </button>
            </div>
            <div>
              <Upload showUploadList={false} customRequest={handleUpdateFile}>
                <button className={`menu-button ${fileItem.type?.includes('folder') ? 'noVis' : ''}`}>
                  <UploadOutlined />
                  <span className="menu-button-text">Заменить</span>
                </button>
              </Upload>
            </div>
          </div>
        </Content>
      </Spin>
      <ChangesModal
        file={fileItem}
        modal={{
          visible: showChangesModal,
          setVisible: setShowChangesModal,
        }}
      />
      <PermissionModal
        file={fileItem}
        isLoading={isLoadingCreate}
        initialValues={initialValues as ICreatePermission}
        onSave={onCreatePermission}
        modal={{
          visible: showPermissionModal,
          setVisible: setShowPermissionModal,
        }}
      />
      <CommentsModal
        file={fileItem}
        isLoadingCreate={isLoadingCreateComment}
        initialValues={initialValues as ICreateComment}
        onSave={onCreateComment}
        modal={{
          visible: showCommentsModal,
          setVisible: setShowCommentsModal,
        }}
      />
    </>
  );
};

export default FileMenu;
