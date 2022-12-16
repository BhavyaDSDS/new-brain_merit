import React, { useState, useCallback } from "react";
import { Upload, message, Button } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import S3 from "react-aws-s3";
import { objectLength } from "./JavaScriptUtils";
import {addCandidate} from "../../candidates/candidateSlice"
const { Dragger } = Upload;

function UploadBulkToS3() {
   
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

let count = fileList.length
  const fileLinks = (data) => {
    let info = {
      first_name: "first_name",
      last_name: "last_name",
      email: "email@gmail.com",
      resume: data,
      resume_parsed_status: false
    };
    // dispatch(addCandidate(info));
  };

  const handleUpload = useCallback(() => {
    // setUploading(true);
    const config = {
      bucketName: "brain-merit-storage",
      dirName: "candidate/resume",
      region: "ap-south-1",
      accessKeyId: "AKIAUVKVZUGMUKH6Z5WM",
      secretAccessKey: "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",
    };

    objectLength(fileList) >= 0 &&
      fileList.map((cur, idx) => {
        const ReactS3Client = new S3(config);
        ReactS3Client.uploadFile(cur, cur.name).then((data) => {
          if (data.status === 204) {
            console.log("uploaded suscessfully =" + data.location);
            fileLinks(data.location);
          } else {
            console.log("Fail");
          }
        });
      });

  }, [fileList]);

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file, fList) => {
      setFileList([...fileList, ...fList]);

      console.log("fileList ===", fileList);
      return false;
    },
    fileList,
  };

  return (
    <div>
      <Dragger {...props} multiple>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag resume file to this area to upload
        </p>
        <div style={{ height: "250px" }} />
      </Dragger>
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
      </Button>
    </div>
  );
}

export default UploadBulkToS3;
