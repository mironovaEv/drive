import { useEffect } from 'react';
import { Button, Layout, Upload } from 'antd';
import { useLayoutConfig } from '../../../shared/hooks/useLayoutConfig/useLayoutConfig';
import { Paths } from '../../../shared/constants';
import block from 'bem-cn';
import MainHeader from '../../../features/MainHeader/MainHeader';
import './FilesList.scss';
import { FolderOutlined, CloudUploadOutlined } from '@ant-design/icons';
import FileComponent from '../components/FileComponent/FileComponent';

const b = block('files-list');
const { Content } = Layout;

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
            <Upload className={b('main-button').toString()}>
              <Button className={b('main-button').toString()} type="primary" icon={<CloudUploadOutlined style={{ fontSize: 18 }} />}>
                <p style={{ margin: 'auto' }}>Загрузить</p>
              </Button>
            </Upload>
          </div>
        </div>
      </MainHeader>
      <Content>
        <div className={b('files-container').toString()}>
          <FileComponent type={'folder'} />
          <FileComponent type={'img'} />
          <FileComponent type={'audio'} />
          <FileComponent type={'video'} />
          <FileComponent type={''} />
        </div>
      </Content>
    </div>
  );
};

export default FilesList;
