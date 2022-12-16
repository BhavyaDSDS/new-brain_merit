import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, Alert,notification } from "antd";
import { update } from "lodash";
import React, { useState } from "react";
import S3 from "react-aws-s3";

function UploadResume(props) {
  const { candId } = props;
  // console.log("props =",props);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(true);
  const [after, setAfter] = useState(false);
  const [url, setUrl] = useState(null);
  const [reUpload,setReUpload] = useState(false)


  const handleUpload = () => {
    setUploading(true);
    // console.log("fileList =",fileList[0]);
    // console.log("uploading =",uploading);
    let file = fileList[0];
    let newFilename = candId + "_" + fileList[0].name;
    const config = {
      bucketName: "brain-merit-storage",
      dirName: "candidate/resume",
      region: "ap-south-1",
      accessKeyId: "AKIAUVKVZUGMUKH6Z5WM",
      secretAccessKey: "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",
    };


    const ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(file, newFilename).then((data) => {
      setAfter(true);
      if (data.status === 204) {
        console.log("uploaded suscessfully =" + data.location);
        setFileList(fileList);
        setUploading(false);
        setSuccess(true);
        setUrl(data.location);
        // message.success("uploaded successfully.",);
        successfullMessage();
      } else {
        console.log("Fail");
        // message.error("upload failed.");
        errorMessage();
        setUploading(true);
        setSuccess(false);
      }
    });
  };

  const prop = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
      setAfter(false);
      setUrl(null);
      setReUpload(true);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  props.onS3Upload(url, fileList.length === 1);
  console.log("url", url);
  console.log("files", fileList.length === 1);

  const successfullMessage = () => {
    notification.success({
      message:"Successfully uploaded",
      placement:'top',
      duration:2
    })
  }

  const errorMessage = () => {
    notification.error({
      message:"Uploaded Failed!",
      placement:'top',
      duration:null
    })
  }


  return (
    <>

      
    <>
      <Upload {...prop}>
        <Button icon={<UploadOutlined />} disabled={fileList.length === 1}>{!reUpload?"Select File":"Re-Upload File"}</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        // disabled={after}
        loading={uploading}
        style={{
          marginTop: 16,
        }}
      >
        {uploading ? "Uploading" : "Start Upload"} 
      </Button>
      </>
      
      
    </>
  );
}

export default UploadResume;
