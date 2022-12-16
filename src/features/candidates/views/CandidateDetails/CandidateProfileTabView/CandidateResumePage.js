import React, { useState,useCallback } from "react";
import { Document, Page, View } from "react-pdf/dist/esm/entry.webpack";
import {
  Col,
  Row,
  Card,
  Button,
  Tag,
  Space,
  Typography,
  PDFViewer,
  Modal,
} from "antd";
import {
  LeftOutlined,
  RightOutlined,
  ExpandAltOutlined,
} from "@ant-design/icons";
import UploadDocs from "../../../../components/utils/UploadDocs";
import { useSelector, useDispatch } from "react-redux";
import { updateCandidate, setRefreshCandList } from "../../../candidateSlice";

const { Text, Title, Paragraph } = Typography;


function CandidateResumePage(props) {
  const { resumeUrl,candId} = props;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = useCallback(() => setModalVisible(true), [setModalVisible]);
  const hideModal = useCallback(() => setModalVisible(false), [
    setModalVisible,
  ]);

  const dispatch = useDispatch();
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () =>
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

  const goToNextPage = () =>
    setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

  const url = resumeUrl;

  function onS3Upload(url) {
    console.log(" onS3Upload image url", url);
    const values = { resume: url };
    const data = [values, candId];
    dispatch(updateCandidate(data));
    hideModal();
    dispatch(setRefreshCandList());
  }

  return (
    <>
      <Row>
        <Col span={24}>
          <div style={{ marginBottom: 10,marginRight:20 }}>
            <Space
              direction="horizontal"
              style={{ width: "100%", justifyContent: "right" }}
            >
              
              <Button onClick={showModal}>Re-Upload</Button>
              

              <Button onClick={goToPrevPage}>
                <LeftOutlined />
              </Button>
              <Text>
                {pageNumber} of {numPages}
              </Text>
              <Button onClick={goToNextPage}>
                <RightOutlined />
              </Button>

              <Button href={url} target="_blank">
                <ExpandAltOutlined style={{ fontSize: 18, paddingTop: 6 }} />
              </Button>
                      
            </Space>
          </div>
          <div style={{marginLeft:"10%"}}>
          <Document file={url} onLoadSuccess={onDocumentLoadSuccess} >
            <Page pageNumber={pageNumber} renderMode={"svg"} width={500} />
          </Document>
          </div>
        </Col>
      </Row>



      <Modal
          title="Re-Upload Resume"
          centered
          open={modalVisible}
          onCancel={() => hideModal()}
          width={400}
          footer={null}
         
        >
          <div  style={{height:"100px"}}>
          <div style={{position:'absolute',right:'150px'}}>
          <UploadDocs  candId={candId} dirName="resume" onS3Upload={onS3Upload}/>
          </div>
          </div>
      </Modal>
    </>
  );
}

export default CandidateResumePage;
