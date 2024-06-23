import { Content } from 'antd/lib/layout/layout';
import './fileMenu.scss';
import { CommentOutlined, HistoryOutlined, LockOutlined } from '@ant-design/icons';
import ChangesModal from '../changesModal/changesModal';
import { useCallback, useState } from 'react';
import PermissionModal from '../permissionModal/PermissionModal';
import { ICreatePermission } from '../../api/types';
import { useAddPermissionMutation } from '../../api/filesApi';

const FileMenu = ({ setOpen, file }) => {
  const [showChangesModal, setShowChangesModal] = useState<boolean>(false);
  const [showPermissionModal, setShowPermissionModal] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<ICreatePermission | object>({});
  const [create, { isLoading: isLoadingCreate }] = useAddPermissionMutation();
  console.log(file);

  const onCreatePermission = useCallback(
    async (values: ICreatePermission) => {
      const result = await create(values);
      return result;
    },
    [create]
  );
  return (
    <>
      <Content>
        <div className="menu-container">
          <div>
            <button
              className="menu-button"
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
            <button className="menu-button">
              <CommentOutlined />
              <span className="menu-button-text">Комментарии</span>
            </button>
          </div>
        </div>
      </Content>
      <ChangesModal
        fileId={file.id}
        modal={{
          visible: showChangesModal,
          setVisible: setShowChangesModal,
        }}
      />
      <PermissionModal
        fileId={file.id}
        initialValues={initialValues as ICreatePermission}
        onSave={onCreatePermission}
        filePermissions={file.permissions}
        modal={{
          visible: showPermissionModal,
          setVisible: setShowPermissionModal,
        }}
      />
    </>
  );
};

export default FileMenu;
