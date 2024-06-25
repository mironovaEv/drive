import { IComment, ICreateComment, ICreatePermission, IFolder } from './api/types';
import { FileComponentProps } from './components/FileComponent/FileComponent';

export const enum FormMode {
  Create = 'Create',
}

export interface IModalProps<T, K> {
  isLoading?: boolean;
  initialValues?: T;
  onSave: (values: T) => Promise<{ data?: IFolder } | { error: unknown }>;
  formMode?: K;
  modal: { visible: boolean; setVisible: React.Dispatch<React.SetStateAction<boolean>> };
}

export interface IViewModalProps {
  onOpen?: () => Promise<{ data?: IFolder } | { error: unknown }>;
  file: FileComponentProps;
  modal: { visible: boolean; setVisible: React.Dispatch<React.SetStateAction<boolean>> };
}

export interface IPermissionModalProps<T> {
  isLoading?: boolean;
  onOpen?: () => Promise<{ data?: IFolder } | { error: unknown }>;
  file: FileComponentProps;
  onSave: (values: T) => Promise<{ data?: ICreatePermission } | { error: unknown }>;
  initialValues?: T;
  modal: { visible: boolean; setVisible: React.Dispatch<React.SetStateAction<boolean>> };
}

export interface ICommentsModalProps<T> {
  modal: { visible: boolean; setVisible: React.Dispatch<React.SetStateAction<boolean>> };
  onOpen?: () => Promise<{ data?: IComment } | { error: unknown }>;
  file: FileComponentProps;
  onSave: (values: T) => Promise<{ data?: ICreateComment } | { error: unknown }>;
  initialValues?: T;
  isLoadingCreate?: boolean;
}

export interface IDeleteModalProps {
  modal: { visible: boolean; setVisible: React.Dispatch<React.SetStateAction<boolean>> };
  onSave: () => Promise<{ data?: undefined } | { error: unknown }>;
  isLoading?: boolean;
}

export const textFormModeModal = {
  [FormMode.Create]: 'Создать папку',
};
