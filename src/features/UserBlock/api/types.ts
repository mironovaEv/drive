export interface IUser {
  emailAddress: string;
  displayName: string;
  photoLink: string;
  me?: boolean;
  storageLimit: number;
  storageUsageInDrive: number;
  storageUsageInDriveTrash: number;
}
