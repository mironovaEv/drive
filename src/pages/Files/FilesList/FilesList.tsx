import { useEffect } from 'react';
import { Button } from 'antd';
import { useLayoutConfig } from '../../../shared/hooks/useLayoutConfig/useLayoutConfig';
import { Paths } from '../../../shared/constants';
import block from 'bem-cn';
import MainHeader from '../../../features/MainHeader/MainHeader';
import './FilesList.scss';
import { FolderOutlined, CloudUploadOutlined } from '@ant-design/icons';

const b = block('files-list');

const FilesList: React.FC = () => {
  const { setConfig } = useLayoutConfig();

  useEffect(() => {
    setConfig({ activeMenuKey: Paths.Files, headerTitle: 'Мои файлы' });
  }, [setConfig]);
  return (
    <div className={b().toString()}>
      <MainHeader>
        <div className={b('main-buttons')}>
          <div className={b('main-buttons-container').toString()}>
            <Button className={b('main-button').toString()} type="primary" icon={<FolderOutlined style={{ fontSize: 17 }} />}>
              <p style={{ margin: 'auto' }}>Создать папку</p>
            </Button>
            <Button className={b('main-button').toString()} type="primary" icon={<CloudUploadOutlined style={{ fontSize: 18 }} />}>
              <p style={{ margin: 'auto' }}>Загрузить</p>
            </Button>
          </div>
        </div>
      </MainHeader>
    </div>
  );
};

export default FilesList;
