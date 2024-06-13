import { IFolder } from './api/types';

export const enum FormMode {
  Create = 'Create',
}

export interface IModalProps<T, K> {
  isLoading?: boolean;
  initialValues: T;
  onSave: (values: T) => Promise<{ data?: IFolder } | { error: unknown }>;
  formMode: K;
  modal: { visible: boolean; setVisible: React.Dispatch<React.SetStateAction<boolean>> };
}

export const textFormModeModal = {
  [FormMode.Create]: 'Создать папку',
};
