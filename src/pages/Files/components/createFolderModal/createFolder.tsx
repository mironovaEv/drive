import React, { useEffect, useCallback } from 'react';
import { Button, Col, Form, Input, Modal, Row, Spin } from 'antd';
import block from 'bem-cn';

import eventEmitter from '../../../../shared/helpers/eventEmmiter';
import './createFolder.scss';
import { IFolder } from '../../api/types';
import { FormMode, IModalProps, textFormModeModal } from '../../types';

const b = block('create-record-modal');

const CreateRecordModal: React.FC<IModalProps<IFolder, FormMode>> = ({ initialValues, onSave, modal, isLoading, formMode }) => {
  const [form] = Form.useForm();
  const { visible, setVisible } = modal;

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(initialValues);
    }
  }, [form, initialValues, visible]);

  const onOk = useCallback(async () => {
    try {
      const values = (await form.validateFields()) as IFolder;

      const res = await onSave(values);
      if ('error' in res) {
        console.log('error');
        return;
      } else {
        if (formMode === FormMode.Create) {
          eventEmitter.emit('customMessage', 'success', 'Папка успешно создана');
        }
        setVisible(false);
        form.resetFields();
      }
    } catch (error) {
      console.log('catcherror', error);
      return;
    }
  }, [form, onSave, setVisible, formMode]);

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
            form.resetFields();
          }}
        >
          Отмена
        </Button>,
        <Button key="submit" loading={isLoading} size="large" type="primary" onClick={onOk}>
          Добавить
        </Button>,
      ]}
      open={visible}
      title={textFormModeModal[formMode]}
      width={720}
      onCancel={() => {
        setVisible(false);
        form.resetFields();
      }}
    >
      <Spin spinning={isLoading}>
        <Form autoComplete="off" form={form} layout="vertical">
          <Form.Item hidden noStyle name="id">
            <Input />
          </Form.Item>
          <Row gutter={8}>
            <Col span={24}>
              <Form.Item label={'Папка'} name="folderName" rules={[{ required: true, message: 'Пожалуйста, введите значение' }]}>
                <Input placeholder="Введите название" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Modal>
  );
};

export default CreateRecordModal;
