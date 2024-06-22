import { IUser } from '../../../features/UserBlock/api/types';

type Permission = {
  role: string;
  type: string;
  emailAddressOrDomain: string;
};

export interface IFile {
  id: string;
  name: string;
  mimeType: string;
  createdTime: Date;
  modifiedTime: Date;
  permissions: Permission[];
  trashed: boolean;
  size: number;
  parents: string[];
}

export interface IFolder {
  folderName: string;
  targetFolderId: string | undefined;
}
export interface IRootDir {
  id: string;
  name: string;
  mimeType: string;
  parents: string[];
}

export interface IRevision {
  id: string;
  lastModifyingUser: IUser;
  mimeType: string;
  modifiedTime: Date;
  originalFileName: string;
  size: number;
}
