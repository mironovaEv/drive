import './fileMenu.scss';
import { CommentOutlined, HistoryOutlined, LockOutlined } from '@ant-design/icons';

const FileMenu = () => {
  return (
    <div className="menu-container">
      <div>
        <button className="menu-button">
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
  );
};

export default FileMenu;
