import { useEffect } from 'react';
import { useLayoutConfig } from '../../../shared/hooks/useLayoutConfig/useLayoutConfig';
import { Paths } from '../../../shared/constants';
import block from 'bem-cn';
import MainHeader from '../../../features/MainHeader/MainHeader';
import './TrashList.scss';

const b = block('trash-list');

const TrashList: React.FC = () => {
  const { setConfig } = useLayoutConfig();

  useEffect(() => {
    setConfig({ activeMenuKey: Paths.Trashcan, headerTitle: 'Корзина' });
  }, [setConfig]);
  return (
    <div className={b().toString()}>
      <MainHeader>
        <div className={b('main-buttons')}>
          <div className={b('main-buttons-container').toString()}></div>
        </div>
      </MainHeader>
    </div>
  );
};

export default TrashList;
