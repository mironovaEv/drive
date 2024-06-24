import { IUser } from '../../../features/UserBlock/api/types';
import { RoleEnum, UserEnum } from '../components/permissionModal/types';

export interface IPermission {
  id: string;
  role: RoleEnum;
  type: UserEnum;
  displayName: string;
  emailAddress: string;
  photoLink: string;
}

export interface IFile {
  id: string;
  name: string;
  mimeType: string;
  createdTime: Date;
  modifiedTime: Date;
  permissions: IPermission[];
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

export interface IEditPermission {
  fileId: string;
  permissionId: string;
  role: string;
}

export interface ICreatePermission {
  fileId: string;
  role: RoleEnum;
  emailAddressOrDomain: string;
  type: UserEnum;
}

export interface ICreateComment {
  fileId: string;
  content: string;
}
export interface ICreaateReply extends ICreateComment {
  commentId: string;
}

export interface IComment {
  id: string;
  content: string;
  replies: IComment[];
  author: IUser;
  createdTime: Date;
  modifiedTime: Date;
}

export interface IEditReply extends ICreaateReply {
  replyId: string;
}

export interface IEditComment extends ICreaateReply {}
