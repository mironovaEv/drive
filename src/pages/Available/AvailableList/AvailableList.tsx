/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useEffect } from 'react';
import { Button, Layout } from 'antd';
import { useLayoutConfig } from '../../../shared/hooks/useLayoutConfig/useLayoutConfig';
import { Paths } from '../../../shared/constants';
import block from 'bem-cn';
import MainHeader from '../../../features/MainHeader/MainHeader';
import './AvaliableList.scss';
import { DoubleLeftOutlined } from '@ant-design/icons';
import FileComponent from '../components/FileComponent/FileComponent';
import { useGetDirQuery, useGetFilesQuery, useGetRootDirQuery } from '../../Files/api/filesApi';
import { useNavigate } from 'react-router-dom';

import { useGetFolderId } from '../../../shared/hooks/useGetFolderId/useGetFolderId';

const b = block('avaliable-list');
const { Content } = Layout;

const AvailableList: React.FC = () => {
  const navigate = useNavigate();
  const { setConfig } = useLayoutConfig();
  const { data: dataFiles, isLoading: isLoadingFiles } = useGetFilesQuery({ trashed: '' });

  const folderId = useGetFolderId();

  const isDisabled = folderId === useGetRootDirQuery({}).data?.id ? true : false;
  const { data: currentDirectory } = useGetDirQuery(folderId, { skip: folderId === undefined });

  const prevDirId = currentDirectory?.parents ? currentDirectory.parents[0] : null;

  const goParent = useCallback(
    parent => {
      navigate(`/available/${parent}`);
    },
    [navigate]
  );

  useEffect(() => {
    setConfig({ activeMenuKey: Paths.Available, headerTitle: 'Доступные мне файлы' });
  }, [setConfig]);
  return (
    <div className={b().toString()}>
      <MainHeader>
        <div className={b('main-buttons')}>
          <div className={b('main-buttons-container').toString()}>
            <Button
              disabled={isDisabled}
              onClick={() => goParent(prevDirId)}
              className={b('main-button').toString()}
              icon={<DoubleLeftOutlined style={{ fontSize: 20 }} />}
            ></Button>
          </div>
        </div>
      </MainHeader>
      <Content>
        <div className={b('files-container').toString()}>
          {dataFiles?.map(file => (
            <FileComponent
              myRole={file.myRole}
              permissions={file.permissions}
              id={file.id}
              visible={file.parents && file.parents[0] === folderId && !file.trashed}
              key={file.id}
              trashed={file.trashed}
              type={file.mimeType}
              name={file.name}
              size={file.size}
            />
          ))}
        </div>
      </Content>
    </div>
  );
};

export default AvailableList;
