/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Button, Layout, Typography } from 'antd';
import Icon from '@ant-design/icons';
import block from 'bem-cn';

// import MainMenu from '../features/MainMenu/MainMenu';
// import { rootRoutes } from '../Routes';
// import UserBlock from '../features/UserBlock/UserBlock';
import { SiderIcon } from '../shared/img/SiderIcon';
import './MainLayout.scss';
import { Logo } from '../shared/img/Logo';
import MainMenu from '../features/MainMenu/MainMenu';
import { rootRoutes } from '../Routes';

const b = block('app');
const l = block('logo');
const { Content, Sider } = Layout;
const { Title } = Typography;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider
        collapsible
        reverseArrow
        className={b('sider').toString()}
        collapsed={collapsed}
        collapsedWidth={88}
        trigger={null}
        width={320}
        onCollapse={setCollapsed}
      >
        <div>
          <div className={b('logo-container').toString()}>
            <Icon className={b('logo').toString()} component={Logo} />
            {!collapsed ? (
              <Title className={b('logo-text').toString()} level={3}>
                MyDrive
              </Title>
            ) : null}
          </div>
          {/* <UserBlock collapsed={collapsed} /> */}
          <MainMenu routes={rootRoutes} />
        </div>
        <div className={b('container-information').toString()}>
          <div className={l({ collapsed }).toString()}>
            <Icon className={l('icon', { collapsed }).toString()} />
            <Button
              className={l('button').toString()}
              icon={<Icon component={SiderIcon} style={{ fontSize: 40 }} />}
              type="text"
              onClick={() => setCollapsed(!collapsed)}
            />
          </div>
        </div>
      </Sider>
      <Layout className={b({ collapsed }).toString()}>
        <Content className={b('primary-content').toString()}>
          <div className="h100">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
