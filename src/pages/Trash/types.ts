export interface IModalProps<K> {
  isLoading?: boolean;
  onSave: () => Promise<{ data?: unknown } | { error: unknown }>;
  formMode: K;
  modal: { visible: boolean; setVisible: React.Dispatch<React.SetStateAction<boolean>> };
}
export const enum FormMode {
  Create = 'Create',
}
