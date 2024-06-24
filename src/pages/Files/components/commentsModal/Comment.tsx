import { Avatar, Button, Card, Popover, Spin, Typography } from 'antd';
import { IComment } from '../../api/types';
import block from 'bem-cn';
import moment from 'moment';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useCallback, useState } from 'react';

import './commentsModal.scss';
import eventEmitter from '../../../../shared/helpers/eventEmmiter';
import { useDeleteCommentMutation } from '../../api/filesApi';
import { FileComponentProps } from '../FileComponent/FileComponent';

const b = block('comments-modal');

const { Text } = Typography;

const getmodifiedTime = (time: Date) => {
  return moment(time).format('DD.MM.YYYY HH:mm');
};

type CommentItemProps = {
  comment: IComment;
  file: FileComponentProps;
};

const CommentItem = ({ comment, file }: CommentItemProps) => {
  const [open, setOpen] = useState(false);
  const [deleteComment, { isLoading: isLoadingDelete }] = useDeleteCommentMutation();

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const onDeleteComment = useCallback(async () => {
    try {
      const res = await deleteComment({ fileId: file.id, commentId: comment.id });
      if ('error' in res) {
        console.log('error');
        return;
      } else {
        setOpen(false);
        eventEmitter.emit('customMessage', 'success', 'Комментарий удален');
      }
    } catch (error) {
      console.log('catcherror', error);
      return;
    }
  }, [comment.id, deleteComment, file.id]);

  return (
    <Card>
      <div className={b('comment-container').toString()}>
        <div className={b('user-info').toString()}>
          <div>
            <Avatar className={b('avatar').toString()} shape="square" src={<img src={comment?.author.photoLink} alt="avatar" />} size={40}></Avatar>
          </div>

          <div className={b('info').toString()}>
            <div className={b('info-date').toString()}>
              <div className={b('info-name').toString()}>{comment?.author?.displayName}</div>
              <Text type="secondary" className={b('info-created-date').toString()}>
                {getmodifiedTime(comment.createdTime)}
              </Text>
              <Text type="secondary" className={b('info-created-date').toString()}>
                {comment.createdTime !== comment.modifiedTime ? `(изменено ${getmodifiedTime(comment.modifiedTime)})` : ''}
              </Text>
            </div>
            <div className={b('content').toString()}>{comment?.content}</div>
          </div>
        </div>
        <div className={b('comment-btn-container').toString()}>
          <div className={b('comment-icon-btn-container').toString()}>
            {comment.author.me ? (
              <div>
                <Button className={b('comment-icon-btn').toString()} icon={<EditOutlined style={{ fontSize: 18 }} />} />
                <Popover
                  content={
                    <Spin spinning={isLoadingDelete}>
                      <div>Вы точно хотите удалить комментарий?</div>
                      <button onClick={onDeleteComment} className={b('comment-delete-btn').toString()}>
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

          <div>
            <button className={b('reply-btn').toString()}>Ответить</button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CommentItem;
