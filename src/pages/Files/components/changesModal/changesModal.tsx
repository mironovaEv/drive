/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Avatar, Card, Descriptions, Modal, Tooltip } from 'antd';
import block from 'bem-cn';
import { IViewModalProps } from '../../types';

import './changesModal.scss';
import { useGetChangesQuery } from '../../api/filesApi';
import moment from 'moment';
import { useFormatBytes } from '../../../../shared/hooks/useFormatBytes/useFormatBytes';

const b = block('changes-modal');

const getmodifiedTime = (modifiedTime: Date) => {
  return moment(modifiedTime).format('DD.MM.YYYY HH:mm');
};

const getSize = (size: number) => {
  const formatSize = useFormatBytes(size);
  return formatSize;
};

const ChangesModal: React.FC<IViewModalProps> = ({ modal, file }) => {
  const { visible, setVisible } = modal;

  const { data: dataChanges } = useGetChangesQuery(file.id, { skip: file.type.includes('folder') || (file.myRole != 'writer' && file.myRole != 'owner') });
  return (
    <Modal
      centered
      className={b().toString()}
      open={visible}
      footer={<div></div>}
      title="История изменений"
      width={720}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <div style={{ overflowY: 'scroll', height: '500px' }}>
        {dataChanges?.map(change => (
          <Card>
            <div className={b('change-container').toString()}>
              <div className={b('user-info').toString()}>
                <div>
                  <Tooltip placement="right" title={change.lastModifyingUser.emailAddress}>
                    <Avatar
                      className={b('avatar').toString()}
                      shape="square"
                      src={<img src={change.lastModifyingUser.photoLink} alt="avatar" />}
                      size={40}
                    ></Avatar>
                  </Tooltip>
                </div>

                <div className={b('info').toString()}>
                  <div className={b('info-name').toString()}>{change.lastModifyingUser.displayName}</div>
                  <div>Изменено: {getmodifiedTime(change.modifiedTime)}</div>
                </div>
              </div>
              <div className={b('info-text').toString()}>
                <Descriptions>
                  <Descriptions.Item label="Имя файла">{change.originalFileName}</Descriptions.Item>
                  <Descriptions.Item label="Размер файла">{change.size ? getSize(change.size) : '0'}</Descriptions.Item>
                </Descriptions>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Modal>
  );
};

export default ChangesModal;
