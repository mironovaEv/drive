/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Avatar, Button, Popover, Tooltip, Typography } from 'antd';
import block from 'bem-cn';
import { LogoutOutlined } from '@ant-design/icons';

import './UserBlock.scss';
import { useGetUserQuery } from './api/userBlockApi';
import { useFormatBytes } from '../../shared/hooks/useFormatBytes/useFormatBytes';

const { Text } = Typography;
const b = block('user-block');

interface IProps {
  collapsed: boolean;
}
const handleSignIn = () => {
  window.location.href = 'http://localhost:8080/api/drive/sign-in';
};

const UserBlock: React.FC<IProps> = ({ collapsed }) => {
  const { data } = useGetUserQuery(undefined);

  const storage = data ? data.storageUsageInDrive + data.storageUsageInDriveTrash : 0;
  const formatStorage = data ? useFormatBytes(storage) : 0;
  const formatStorageLimit = data ? useFormatBytes(data.storageLimit) : 0;
  const formatUsageInDriveTrash = data ? useFormatBytes(data.storageUsageInDriveTrash) : 0;
  const userInfo = (
    <div className={b('outer').toString()}>
      <div>
        <p className={b('info-tags').toString()}>Email</p>
        <p>{data?.emailAddress}</p>
      </div>
      <div>
        <p className={b('info-tags').toString()}>Занято места</p>
        <p>
          {formatStorage}/{formatStorageLimit}
        </p>
      </div>
      <div>
        <p className={b('info-tags').toString()}>Вес корзины</p>
        <p>{formatUsageInDriveTrash}</p>
      </div>
    </div>
  );
  const title = (
    <div>
      <p className={b('info-name').toString()}>{data?.displayName}</p>
    </div>
  );

  return (
    <div className={b()}>
      <div className={b('user').toString()}>
        <div>
          {collapsed ? (
            <div>
              <Tooltip placement="right" title={collapsed ? data?.displayName : ''}>
                <Avatar shape="square" src={<img src={data?.photoLink} alt="avatar" />} size={40}></Avatar>
              </Tooltip>

              <div className={b('info', { collapsed }).toString()}>
                <Text className={b('info-name').toString()}>{data?.displayName}</Text>
              </div>
            </div>
          ) : (
            <Popover placement="rightTop" title={title} content={userInfo}>
              <Tooltip placement="right" title={collapsed ? data?.displayName : ''}>
                <Avatar shape="square" src={<img src={data?.photoLink} alt="avatar" />} size={40}></Avatar>
              </Tooltip>

              <div className={b('info', { collapsed }).toString()}>
                <Text className={b('info-name').toString()}>{data?.displayName}</Text>
              </div>
            </Popover>
          )}
        </div>
        <div>
          <Tooltip placement="right" title={'Сменить аккаунт'}>
            <Button
              className={b('button', { collapsed }).toString()}
              icon={<LogoutOutlined className={b('logout').toString()} />}
              type="text"
              onClick={handleSignIn}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default UserBlock;
