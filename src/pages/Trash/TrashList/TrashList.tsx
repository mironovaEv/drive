import { useCallback, useEffect, useState } from 'react';
import { useLayoutConfig } from '../../../shared/hooks/useLayoutConfig/useLayoutConfig';
import { Paths } from '../../../shared/constants';
import block from 'bem-cn';
import MainHeader from '../../../features/MainHeader/MainHeader';
import './TrashList.scss';
import { Button, Layout } from 'antd';
import { FolderOutlined, UndoOutlined } from '@ant-design/icons';

import FileComponent from '../components/FileComponent/FileComponent';

import DeleteModal from '../components/deleteModal/deleteModal';
import { useEmptyTrashMutation, useGetFilesQuery, useUntrashMutation } from '../../Files/api/filesApi';

const b = block('trash-list');
const { Content } = Layout;

const TrashList: React.FC = () => {
  const { setConfig } = useLayoutConfig();
  const { data: dataFiles } = useGetFilesQuery(undefined);

  const [, setTick] = useState(0);
  const forceUpdate = () => setTick(tick => tick + 1);

  const [emptyTrash, { isLoading: isLoadingDelete }] = useEmptyTrashMutation();
  const [checkedToUntrash, setCheckedToUntrash] = useState<string[]>([]);
  const [untrashFiles, { isLoading: isLoadingUntrash }] = useUntrashMutation();
  console.log(checkedToUntrash);

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  useEffect(() => {
    setConfig({ activeMenuKey: Paths.Trashcan, headerTitle: 'Корзина' });
  }, [setConfig]);

  const onUntrashFiles = useCallback(async () => {
    const result = checkedToUntrash.length > 0 ? await untrashFiles(checkedToUntrash) : null;
    setCheckedToUntrash([]);
    return result;
  }, [checkedToUntrash, untrashFiles]);

  const setUntrash = (id: string) => {
    const newArr = checkedToUntrash;
    newArr.push(id);
    setCheckedToUntrash(newArr);
    console.log(checkedToUntrash);
  };

  const cancelUntrash = (id: string) => {
    const newArr = checkedToUntrash;
    newArr.splice(newArr.indexOf(id), 1);
    setCheckedToUntrash(newArr);
    console.log(checkedToUntrash);
  };

  const onEmptyTrash = useCallback(async () => {
    const result = await emptyTrash(undefined);
    forceUpdate();
    return result;
  }, [emptyTrash]);
  return (
    <div className={b().toString()}>
      <MainHeader>
        <div className={b('main-buttons')}>
          <div className={b('main-buttons-container').toString()}>
            <Button className={b('main-button').toString()} icon={<FolderOutlined style={{ fontSize: 20 }} />}>
              <div
                onClick={e => {
                  e.stopPropagation();
                  setShowDeleteModal(true);
                }}
                className={b('main-button-text').toString()}
              >
                Очистить корзину
              </div>
            </Button>
            <Button disabled={isLoadingUntrash} className={b('main-button').toString()} icon={<UndoOutlined style={{ fontSize: 20 }} />}>
              <div onClick={onUntrashFiles} className={b('main-button-text').toString()}>
                Восстановить
              </div>
            </Button>
          </div>
        </div>
      </MainHeader>
      <Content>
        <div className={b('files-container').toString()}>
          {dataFiles?.map(file => (
            <FileComponent
              setCheckedToUntrash={setCheckedToUntrash}
              onSetUntrash={setUntrash}
              onCancelUntrash={cancelUntrash}
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
      <DeleteModal
        isLoading={isLoadingDelete}
        modal={{
          visible: showDeleteModal,
          setVisible: setShowDeleteModal,
        }}
        onSave={onEmptyTrash}
      />
    </div>
  );
};

export default TrashList;
