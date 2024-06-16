import React, { useCallback } from 'react';
import { Button, Modal, Spin } from 'antd';
import block from 'bem-cn';
import { FormMode, IModalProps } from '../../types';

import './deleteModal.scss';

const b = block('create-record-modal');

type IDeleteModalProps = Omit<IModalProps<FormMode>, 'formMode'>;

const DeleteModal: React.FC<IDeleteModalProps> = ({ modal, isLoading, onSave }) => {
  const { visible, setVisible } = modal;

  const onOk = useCallback(async () => {
    try {
      const res = await onSave();
      if ('error' in res) {
        console.log('error');
        return;
      } else {
        setVisible(false);
      }
    } catch (error) {
      console.log('catcherror', error);
      return;
    }
  }, [onSave, setVisible]);

  return (
    <Modal
      centered
      className={b().toString()}
      footer={[
        <Button
          className={b('cancel-btn').toString()}
          key="back"
          size="large"
          onClick={() => {
            setVisible(false);
          }}
        >
          Закрыть
        </Button>,
        <Button danger key="submit" loading={isLoading} size="large" type="primary" onClick={onOk}>
          Очистить
        </Button>,
      ]}
      open={visible}
      title="Очищение корзины"
      width={720}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <Spin spinning={isLoading}>Вы действительно хотите очистить корзину?</Spin>
    </Modal>
  );
};

export default DeleteModal;
