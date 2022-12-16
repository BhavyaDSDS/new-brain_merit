import React from "react";
import { Empty, Button } from "antd";

function DefaultAddView(props) {
  const { buttonName, onAddViewClick } = props;

  return (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{ height: 60 }}
      description={<></>}
    >
      <Button type="primary" onClick={onAddViewClick}>
        {buttonName}
      </Button>
    </Empty>
  );
}

export default DefaultAddView;
