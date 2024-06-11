import React from 'react';

import { block } from 'bem-cn';
import { Button, Layout } from 'antd';

const b = block('login');

const handleSignIn = () => {
  window.location.href = 'http://localhost:8080/api/drive/sign-in';
};

const Login: React.FC = () => {
  return (
    <Layout>
      <div className={b().toString()}>
        <Button onClick={handleSignIn}>Войти с помощью GoogleDrive</Button>
      </div>
    </Layout>
  );
};

export default Login;
