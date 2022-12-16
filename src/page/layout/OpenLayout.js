import React, { useEffect, useCallback, useState } from "react";
import { Layout } from "antd";
import "./Style.less";
import OpenRoutingList from "../../router/OpenRoutingList";

const { Content } = Layout;

function OpenLayout() {
  return (
    <Layout>
      <Content>
        <div style={{ background: "#fff", minHeight: 20 }}>
          <OpenRoutingList />
        </div>
      </Content>
    </Layout>
  );
}

export default OpenLayout;
