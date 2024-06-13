import { useGetRootDirQuery } from '../../../pages/Files/api/filesApi';

export const useGetFolderId = () => {
  console.log();
  const rootDir = useGetRootDirQuery({}).data;

  const currentUrl = window.location.href;
  let folderId = currentUrl.substring(28);
  if (rootDir) {
    if (folderId === '' || folderId == undefined) folderId = rootDir.id;
  }

  return folderId;
};
