/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useEffect } from 'react';
import { Button, Col, Form, Input, Modal, Row, Spin, Tooltip } from 'antd';
import block from 'bem-cn';

import './commentsModal.scss';

import { ICommentsModalProps } from '../../types';
import CommentItem from './Comment';
import { useGetCommentsQuery } from '../../api/filesApi';
import { SendOutlined } from '@ant-design/icons';
import { ICreateComment } from '../../api/types';
import eventEmitter from '../../../../shared/helpers/eventEmmiter';

const b = block('comments-modal');

const CommentsModal: React.FC<ICommentsModalProps<ICreateComment>> = ({ initialValues, onSave, isLoadingCreate, modal, file }) => {
  const { visible, setVisible } = modal;
  const [form] = Form.useForm();
  const { data: comments } = useGetCommentsQuery(file.id);

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(initialValues);
    }
  }, [form, initialValues, visible]);

  const onOk = useCallback(async () => {
    try {
      const values = (await form.validateFields()) as ICreateComment;
      if (values.content == null || values.content == '') {
        return;
      }
      values.fileId = file.id;

      const res = await onSave(values);
      if ('error' in res) {
        console.log('error');
        return;
      } else {
        eventEmitter.emit('customMessage', 'success', 'Комментарий отправлен');
        form.resetFields();
      }
    } catch (error) {
      console.log('catcherror', error);
      return;
    }
  }, [file.id, form, onSave]);

  return (
    <Modal
      centered
      className={b().toString()}
      open={visible}
      footer={<div></div>}
      title={`Комментарии к файлу ${file.name}`}
      width={720}
      onCancel={() => {
        setVisible(false);
        form.resetFields();
      }}
    >
      <Form autoComplete="off" form={form} layout="horizontal">
        <Row gutter={12}>
          <Col span={22}>
            <Spin spinning={isLoadingCreate}>
              <Form.Item name="content">
                <Input className={b('comment-input').toString()} placeholder="Напишите комментарий" />
              </Form.Item>
            </Spin>
          </Col>

          <Col span={1}>
            <Tooltip placement="right" title="Отправить комментарий">
              <Button className={b('send-btn').toString()} onClick={onOk} icon={<SendOutlined />} />
            </Tooltip>
          </Col>
        </Row>
      </Form>
      {comments?.map(comment => (
        <CommentItem comment={comment} file={file} />
      ))}
    </Modal>
  );
};

export default CommentsModal;
