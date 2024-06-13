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
  targetFolderId: string;
}
export interface IRootDir {
  id: string;
  name: string;
  mimeType: string;
}
