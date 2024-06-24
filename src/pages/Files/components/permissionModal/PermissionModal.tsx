/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useEffect, useState } from 'react';
import { Avatar, Button, Card, Col, Form, Input, Modal, Row, Select, Spin, Tooltip } from 'antd';
import block from 'bem-cn';
import { IPermissionModalProps } from '../../types';

import './PermissionModal.scss';
import { RoleEnum, RoleEnumRus, UserEnum, UserEnumRus } from './types';
import { useRevokePermissionMutation, useUpdatePermissionMutation } from '../../api/filesApi';
import { DeleteOutlined, SendOutlined } from '@ant-design/icons';
import { ICreatePermission } from '../../api/types';
import eventEmitter from '../../../../shared/helpers/eventEmmiter';

const b = block('permission-modal');

const PermissionModal: React.FC<IPermissionModalProps<ICreatePermission>> = ({ initialValues, isLoading, onSave, modal, file }) => {
  const { visible, setVisible } = modal;
  const [form] = Form.useForm();

  const [roleParams, setRoleParams] = useState<{ role: string }>({ role: '' });
  const [newRoleParams, setNewRoleParams] = useState<{ role: string }>({ role: '' });
  const [userTypeParams, setUserTypeParams] = useState<{ type: string }>({ type: '' });

  const [change] = useUpdatePermissionMutation();
  const [revoke] = useRevokePermissionMutation();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(initialValues);
    }
  }, [form, initialValues, visible]);

  useEffect(() => {
    setRoleParams(previousState => ({
      role: previousState.role,
    }));
    setNewRoleParams(previousState => ({
      role: previousState.role,
    }));
    setUserTypeParams(previousState => ({
      type: previousState.type,
    }));
  }, []);

  const onChangeRole = useCallback(
    async (permissionId: string, value: string) => {
      try {
        const result = await change({ fileId: file.id, permissionId: permissionId, role: value });
        if ('error' in result) {
          console.log('error');
          return;
        } else {
          eventEmitter.emit('customMessage', 'success', 'Роль успешно изменена');
        }
      } catch (error) {
        console.log('catcherror', error);
        return;
      }
    },
    [change, file]
  );

  const onDeletePermission = useCallback(
    async (permissionId: string) => {
      try {
        const result = await revoke({ fileId: file.id, permissionId: permissionId });
        if ('error' in result) {
          console.log('error');
          return;
        } else {
          eventEmitter.emit('customMessage', 'success', 'Права пользователя успешно удалены');
        }
      } catch (error) {
        console.log('catcherror', error);
        return;
      }
    },
    [file, revoke]
  );

  const onOk = useCallback(async () => {
    try {
      const values = (await form.validateFields()) as ICreatePermission;
      values.fileId = file.id;

      const res = await onSave(values);
      if ('error' in res) {
        console.log('error');
        return;
      } else {
        eventEmitter.emit('customMessage', 'success', 'Права успешно выданы');
        form.resetFields();
      }
    } catch (error) {
      console.log('catcherror', error);
      return;
    }
  }, [file, form, onSave]);

  return (
    <Modal
      centered
      className={b().toString()}
      open={visible}
      footer={<div></div>}
      title="Права доступа"
      width={720}
      onCancel={() => {
        setVisible(false);
        form.resetFields();
      }}
    >
      <Spin spinning={isLoading}>
        <Form autoComplete="off" form={form} layout="horizontal">
          <div className={b('permission-title').toString()}>Выдать права доступа для файла {file.name}:</div>
          <Row gutter={12}>
            <Col span={8}>
              <Form.Item name="emailAddressOrDomain" rules={[{ required: true, message: 'Пожалуйста, укажите значение' }]}>
                <Input className={b('permission-form-input').toString()} placeholder="Введите email или домен" />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item name="role" rules={[{ required: true, message: 'Пожалуйста, укажите значение' }]}>
                <Select
                  className={b('permission-select').toString()}
                  onChange={(value: string) => {
                    setNewRoleParams({
                      role: value,
                    });
                  }}
                  options={[
                    { value: RoleEnum.writer, label: RoleEnumRus[RoleEnum.writer] },
                    { value: RoleEnum.commenter, label: RoleEnumRus[RoleEnum.commenter] },
                    { value: RoleEnum.reader, label: RoleEnumRus[RoleEnum.reader] },
                  ]}
                  placeholder="Выберите роль"
                />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item name="type" rules={[{ required: true, message: 'Пожалуйста, укажите значение' }]}>
                <Select
                  className={b('permission-select').toString()}
                  onChange={(value: string) => {
                    setUserTypeParams({
                      type: value,
                    });
                  }}
                  options={[
                    { value: UserEnum.user, label: UserEnumRus[UserEnum.user] },
                    { value: UserEnum.group, label: UserEnumRus[UserEnum.group] },
                    { value: UserEnum.domain, label: UserEnumRus[UserEnum.domain] },
                    { value: UserEnum.anyone, label: UserEnumRus[UserEnum.anyone] },
                  ]}
                  placeholder="Выберите тип"
                />
              </Form.Item>
            </Col>
            <Col span={2}>
              <Tooltip placement="right" title="Выдать права доступа">
                <Button className={b('permission-form').toString()} onClick={onOk} icon={<SendOutlined />} />
              </Tooltip>
            </Col>
          </Row>
        </Form>
      </Spin>
      {file.permissions?.map(permission => (
        <Card>
          <div className={b('permission-container').toString()}>
            <div className={b('user-info').toString()}>
              <div>
                <Avatar className={b('avatar').toString()} shape="square" src={<img src={permission.photoLink} alt="avatar" />} size={40}></Avatar>
              </div>

              <div className={b('info').toString()}>
                <div className={b('info-name').toString()}>{permission.displayName}</div>
                <div>{permission.emailAddress}</div>
              </div>
            </div>
            <div className={b('info-role').toString()}>
              {permission.role == 'owner' ? (
                <div>{RoleEnumRus[RoleEnum.owner]}</div>
              ) : (
                <div>
                  <Select
                    style={{ width: 150 }}
                    defaultValue={permission.role}
                    onChange={(value: string) => {
                      onChangeRole(permission.id, value);
                    }}
                    options={[
                      { value: RoleEnum.writer, label: RoleEnumRus[RoleEnum.writer] },
                      { value: RoleEnum.commenter, label: RoleEnumRus[RoleEnum.commenter] },
                      { value: RoleEnum.reader, label: RoleEnumRus[RoleEnum.reader] },
                    ]}
                    placeholder="Выберите роль"
                  />
                  <Button
                    className={b('permission-delete').toString()}
                    icon={<DeleteOutlined />}
                    onClick={e => {
                      e.stopPropagation();
                      onDeletePermission(permission.id);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </Modal>
  );
};

export default PermissionModal;
