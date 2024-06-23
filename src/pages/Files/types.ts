import { ICreatePermission, IFile, IFolder } from './api/types';
import { FileComponentProps } from './components/FileComponent/FileComponent';

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
  file: FileComponentProps;
  modal: { visible: boolean; setVisible: React.Dispatch<React.SetStateAction<boolean>> };
}

export interface iPermissionModalProps<T> {
  onOpen?: () => Promise<{ data?: IFolder } | { error: unknown }>;
  file: IFile;
  onSave?: (values: T) => Promise<{ data?: ICreatePermission } | { error: unknown }>;
  initialValues?: T;
  modal: { visible: boolean; setVisible: React.Dispatch<React.SetStateAction<boolean>> };
}

export const textFormModeModal = {
  [FormMode.Create]: 'Создать папку',
};
