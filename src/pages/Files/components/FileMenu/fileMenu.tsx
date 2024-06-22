import { Content } from 'antd/lib/layout/layout';
import './fileMenu.scss';
import { CommentOutlined, HistoryOutlined, LockOutlined } from '@ant-design/icons';
import ChangesModal from '../changesModal/changesModal';
import { useState } from 'react';

const FileMenu = ({ setOpen, fileId }) => {
  const [showChangesModal, setShowChangesModal] = useState<boolean>(false);
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
            <button className="menu-button">
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
        fileId={fileId}
        modal={{
          visible: showChangesModal,
          setVisible: setShowChangesModal,
        }}
      />
    </>
  );
};

export default FileMenu;
