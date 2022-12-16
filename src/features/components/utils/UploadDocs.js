import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import React, { useState } from "react";
import S3 from "react-aws-s3";

function UploadDocs(props) {
  const { candId, dirName,reUpload } = props;
  // console.log("props =",props);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    // console.log("fileList =",fileList[0]);
    // console.log("uploading =",uploading);
    let file = fileList[0];
    let newFilename = candId + "_" + fileList[0].name;
    const config = {
      bucketName: "brain-merit-storage",
      dirName: "candidate/" + dirName,
      region: "ap-south-1",
      accessKeyId: "AKIAUVKVZUGMUKH6Z5WM",
      secretAccessKey: "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",
    };


    const ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(file, newFilename).then((data) => {
      if (data.status === 204) {
        console.log("uploaded suscessfully =" + data.location);
        setFileList([]);
        setUploading(false);
        props.onS3Upload(data.location);
        message.success("uploaded successfully.");
      } else {
        console.log("Fail");
        message.error("upload failed.");
        setUploading(true);
      }
    });
  };

  const prop = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  

  return (
    <>

      
    {!reUpload &&<>
      <Upload {...prop}>
        <Button icon={<UploadOutlined />} disabled={fileList.length === 1}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{
          marginTop: 16,
        }}
      >
        {uploading ? "Uploading" : "Start Upload"}
      </Button></>}


      {reUpload && <>
       <Upload {...prop}>
        <Button icon={<UploadOutlined />} >Click to Re-Upload</Button>
      </Upload></>
      }
      
    </>
  );
}

export default UploadDocs;
