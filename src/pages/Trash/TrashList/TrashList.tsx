import { useEffect } from 'react';
import { useLayoutConfig } from '../../../shared/hooks/useLayoutConfig/useLayoutConfig';
import { Paths } from '../../../shared/constants';
import block from 'bem-cn';
import MainHeader from '../../../features/MainHeader/MainHeader';
import './TrashList.scss';
import { Button, Layout } from 'antd';
import { FolderOutlined } from '@ant-design/icons';
import { useGetFilesQuery } from '../../Files/api/filesApi';
import FileComponent from '../components/FileComponent/FileComponent';

const b = block('trash-list');
const { Content } = Layout;

const TrashList: React.FC = () => {
  const { setConfig } = useLayoutConfig();
  const { data: dataFiles } = useGetFilesQuery(undefined);

  useEffect(() => {
    setConfig({ activeMenuKey: Paths.Trashcan, headerTitle: 'Корзина' });
  }, [setConfig]);
  return (
    <div className={b().toString()}>
      <MainHeader>
        <div className={b('main-buttons')}>
          <div className={b('main-buttons-container').toString()}>
            <Button className={b('main-button').toString()} icon={<FolderOutlined style={{ fontSize: 20 }} />}>
              <div className={b('main-button-text').toString()}>Очистить корзину</div>
            </Button>
          </div>
        </div>
      </MainHeader>
      <Content>
        <div className={b('files-container').toString()}>
          {dataFiles?.map(file => (
            <FileComponent
              id={file.id}
              visible={file.trashed}
              key={file.id}
              trashed={file.trashed}
              type={file.mimeType}
              name={file.name}
              fileSize={file.size}
            />
          ))}
        </div>
      </Content>
    </div>
  );
};

export default TrashList;
