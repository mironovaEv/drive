import { useEffect } from 'react';
import { Button } from 'antd';
import { useLayoutConfig } from '../../../shared/hooks/useLayoutConfig/useLayoutConfig';
import { Paths } from '../../../shared/constants';
import block from 'bem-cn';
import MainHeader from '../../../features/MainHeader/MainHeader';
import './FilesList.scss';

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
            <Button type="primary">Создать папку</Button>
            <Button type="primary">Загрузить</Button>
          </div>
        </div>
      </MainHeader>
    </div>
  );
};

export default FilesList;
