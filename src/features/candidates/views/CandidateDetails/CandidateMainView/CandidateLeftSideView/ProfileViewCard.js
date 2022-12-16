
import { UserOutlined} from '@ant-design/icons';
import { Card, Typography, Avatar, Anchor, Drawer } from 'antd';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import CandidateProfile from '../../CandidateProfileTabView/CandidateProfileView';
const { Title } = Typography;

function ProfileViewCard() {
    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },

        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }

            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    const history = useHistory();
    return (
        <>
            <Card style={{ marginBottom: "24px" }} >
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Avatar size={64} icon={<UserOutlined />} />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Anchor affix={false}>
                        <a onClick={showDrawer}>
                            <Title level={5}>
                                Welcome,Manu!  </Title></a>
                    </Anchor>
                </div>
            </Card>
            <Drawer
                width={1000}
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                <CandidateProfile />
            </Drawer>
        </>
    );
};

export default ProfileViewCard;