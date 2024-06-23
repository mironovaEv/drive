import { ICreatePermission, IFolder, IPermission } from './api/types';

export const enum FormMode {
  Create = 'Create',
}

export interface IModalProps<T, K> {
  isLoading?: boolean;
  initialValues?: T;
  onSave?: (values: T) => Promise<{ data?: IFolder } | { error: unknown }>;
  formMode?: K;
  modal: { visible: boolean; setVisible: React.Dispatch<React.SetStateAction<boolean>> };
}

export interface IViewModalProps {
  onOpen?: () => Promise<{ data?: IFolder } | { error: unknown }>;
  fileId: string;
  modal: { visible: boolean; setVisible: React.Dispatch<React.SetStateAction<boolean>> };
}

export interface iPermissionModalProps<T> {
  onOpen?: () => Promise<{ data?: IFolder } | { error: unknown }>;
  fileId: string;
  onSave?: (values: T) => Promise<{ data?: ICreatePermission } | { error: unknown }>;
  initialValues?: T;
  modal: { visible: boolean; setVisible: React.Dispatch<React.SetStateAction<boolean>> };
  filePermissions: IPermission[];
}

export const textFormModeModal = {
  [FormMode.Create]: 'Создать папку',
};
