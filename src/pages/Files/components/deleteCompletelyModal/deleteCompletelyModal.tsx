import React, { useCallback } from 'react';
import { Button, Modal, Spin } from 'antd';
import block from 'bem-cn';

import './deleteCompletelyModal.scss';
import { IDeleteModalProps } from '../../types';

const b = block('delete-modal');

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
          Удалить
        </Button>,
      ]}
      title="Удаление файлов"
      open={visible}
      width={720}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <Spin spinning={isLoading}>
        <span className={b('text').toString()}>Вы действительно хотите удалить файлы безвозвратно?</span>
      </Spin>
    </Modal>
  );
};

export default DeleteModal;
