import { Content } from 'antd/lib/layout/layout';
import './fileMenu.scss';
import { CommentOutlined, HistoryOutlined, LockOutlined } from '@ant-design/icons';
import ChangesModal from '../changesModal/changesModal';
import { useCallback, useState } from 'react';
import PermissionModal from '../permissionModal/PermissionModal';
import { ICreateComment, ICreatePermission, IFile } from '../../api/types';
import { useAddPermissionMutation, useCreateCommentMutation } from '../../api/filesApi';
import CommentsModal from '../commentsModal/commentsModal';

const FileMenu = ({ setOpen, file }) => {
  const [showChangesModal, setShowChangesModal] = useState<boolean>(false);
  const [showPermissionModal, setShowPermissionModal] = useState<boolean>(false);
  const [showCommentsModal, setShowCommentsModal] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<ICreatePermission | object>({});
  const [createPermission, { isLoading: isLoadingCreate }] = useAddPermissionMutation();
  const [createComment, { isLoading: isLoadingCreateComment }] = useCreateCommentMutation();
  console.log(file);

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

  return (
    <>
      <Content>
        <div className="menu-container">
          <div>
            <button
              className={`menu-button ${file.type?.includes('folder') ? 'noVis' : ''}`}
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
              className="menu-button"
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
        </div>
      </Content>
      <ChangesModal
        file={file}
        modal={{
          visible: showChangesModal,
          setVisible: setShowChangesModal,
        }}
      />
      <PermissionModal
        file={file}
        initialValues={initialValues as ICreatePermission}
        onSave={onCreatePermission}
        modal={{
          visible: showPermissionModal,
          setVisible: setShowPermissionModal,
        }}
      />
      <CommentsModal
        file={file}
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
