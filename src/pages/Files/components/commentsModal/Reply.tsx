import { Avatar, Button, Card, Form, Input, Popover, Spin, Typography } from 'antd';
import { IComment, IEditReply } from '../../api/types';
import block from 'bem-cn';
import moment from 'moment';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState } from 'react';

import './commentsModal.scss';
import eventEmitter from '../../../../shared/helpers/eventEmmiter';
import { useDeleteReplyMutation, useEditReplyMutation } from '../../api/filesApi';
import { FileComponentProps } from '../FileComponent/FileComponent';

const b = block('comments-modal');

const { Text } = Typography;

const getmodifiedTime = (time: Date) => {
  return moment(time).format('DD.MM.YYYY HH:mm');
};

type CommentItemProps = {
  comment: IComment;
  file: FileComponentProps;
  visible: boolean;
  initialValues: string;
  reply: IComment;
};

const CommentItem = ({ comment, reply, file, visible, initialValues }: CommentItemProps) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [form] = Form.useForm();

  const [deleteReply, { isLoading: isLoadingDelete }] = useDeleteReplyMutation();
  const [editReply, { isLoading: isLoadingEdit }] = useEditReplyMutation();

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  useEffect(() => {
    if (visible && openEdit) {
      console.log(initialValues);
      form.setFieldsValue({ content: initialValues });
    }
  }, [form, initialValues, openEdit, visible]);

  const onDeleteReply = useCallback(async () => {
    try {
      const res = await deleteReply({ fileId: file.id, commentId: comment.id, replyId: reply.id });
      if ('error' in res) {
        console.log('error');
        return;
      } else {
        setOpen(false);

        eventEmitter.emit('customMessage', 'success', 'Ответ удален');
      }
    } catch (error) {
      console.log('catcherror', error);
      return;
    }
  }, [comment.id, deleteReply, file.id, reply.id]);

  const onEditReply = useCallback(async () => {
    try {
      const values = (await form.validateFields()) as IEditReply;
      values.fileId = file.id;
      values.commentId = comment.id;
      values.replyId = reply.id;
      const res = await editReply(values);
      if ('error' in res) {
        console.log('error');
        return;
      } else {
        setOpenEdit(false);
        eventEmitter.emit('customMessage', 'success', 'Ответ отредактирован');
      }
    } catch (error) {
      console.log('catcherror', error);
      return;
    }
  }, [comment.id, editReply, file.id, form, reply.id]);

  return (
    <div>
      <Card className={b('reply-card').toString()}>
        <div className={b('comment-container').toString()}>
          <div className={b('user-info').toString()}>
            <div>
              <Avatar className={b('avatar').toString()} shape="square" src={<img src={reply?.author.photoLink} alt="avatar" />} size={40}></Avatar>
            </div>

            <div className={b('info').toString()}>
              <div className={b('info-date').toString()}>
                <div className={b('info-name').toString()}>{reply?.author?.displayName}</div>
                <Text type="secondary" className={b('info-created-date').toString()}>
                  {getmodifiedTime(reply.createdTime)}
                </Text>
                <Text type="secondary" className={b('info-created-date').toString()}>
                  {reply.createdTime !== reply.modifiedTime ? `(изменено ${getmodifiedTime(reply.modifiedTime)})` : ''}
                </Text>
              </div>
              {!openEdit ? (
                <div className={b('content').toString()}>{reply?.content}</div>
              ) : (
                <div>
                  <Form autoComplete="off" form={form} layout="horizontal">
                    <Spin spinning={isLoadingEdit}>
                      <div>
                        <Form.Item name="content" rules={[{ required: true, message: 'Поле не может быть пустым' }]}>
                          <Input className={b('edit-reply-input').toString()} placeholder="Напишите ответ" />
                        </Form.Item>
                      </div>
                      <div>
                        <button onClick={onEditReply} className={b('comment-edit-btn').toString()}>
                          Редактировать
                        </button>
                        <button
                          className={b('comment-edit-btn').toString()}
                          onClick={() => {
                            setOpenEdit(false);
                          }}
                        >
                          Отмена
                        </button>
                      </div>
                    </Spin>
                  </Form>
                </div>
              )}
            </div>
          </div>
          <div className={b('comment-btn-container').toString()}>
            <div className={b('comment-icon-btn-container').toString()}>
              {reply.author.me ? (
                <div className={b('reply-btns').toString()}>
                  <Button
                    onClick={() => {
                      setOpenEdit(!openEdit);
                    }}
                    className={b('comment-icon-btn').toString()}
                    icon={<EditOutlined style={{ fontSize: 18 }} />}
                  />
                  <Popover
                    content={
                      <Spin spinning={isLoadingDelete}>
                        <div>Вы точно хотите удалить ответ?</div>
                        <button onClick={onDeleteReply} className={b('comment-delete-btn').toString()}>
                          Удалить
                        </button>
                        <button
                          className={b('comment-delete-btn').toString()}
                          onClick={() => {
                            setOpen(false);
                          }}
                        >
                          Отмена
                        </button>
                      </Spin>
                    }
                    trigger="click"
                    open={open}
                    onOpenChange={handleOpenChange}
                  >
                    <Button className={b('comment-icon-btn').toString()} icon={<DeleteOutlined style={{ fontSize: 18 }} />} />
                  </Popover>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CommentItem;
