import { useParams } from 'react-router-dom';
import { useGetRootDirQuery } from '../../../pages/Files/api/filesApi';

export const useGetFolderId = () => {
  const rootDir = useGetRootDirQuery({}).data;

  let { folderId } = useParams();
  if (rootDir) {
    if (folderId === '' || folderId == undefined) folderId = rootDir.id;
  }

  return folderId;
};
