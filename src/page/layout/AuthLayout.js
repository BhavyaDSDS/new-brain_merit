import React, { useEffect, useCallback, useState } from "react";
import { Layout } from "antd";
import "./Style.less";
import LoginPage from "../../features/auth/LoginPage";
import AuthRoutingList from "../../router/AuthRoutingList";

const { Content } = Layout;

function AuthLayout() {
  return (
    <Layout>
      <Content>
        <div style={{ background: "#fff", minHeight: 20 }}>
          <LoginPage />
          {/* <AuthRoutingList/> */}
        </div>
      </Content>
    </Layout>
  );
}

export default AuthLayout;
