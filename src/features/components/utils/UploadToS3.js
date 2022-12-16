import React, { useRef } from "react";
import S3 from "react-aws-s3";
import { UploadOutlined } from "@ant-design/icons";

function UploadToS3(props){

  const {
    candId,
    dirName
        } = props;
   const fileInput = useRef();

    const handleClick = event => {
        event.preventDefault();
        let file = fileInput.current.files[0];
        let newFileName = candId + "_" + fileInput.current.files[0].name;
        const config = {
          bucketName: "brain-merit-storage",
          dirName: "candidate/" + dirName,
          region: "ap-south-1",
          accessKeyId: "AKIAUVKVZUGMUKH6Z5WM",
          secretAccessKey: "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"
        };
        const ReactS3Client = new S3(config);
        ReactS3Client.uploadFile(file, newFileName).then(data => {
          if(data.status ===204) {
            console.log("Success" + data.location);
            props.onS3Upload(data.location);
          }else{
            console.log("Fail");
          }
        });
      };
      
       return (
        <>
          <input type='file' ref={fileInput}/>
          <button id="upload_file" icon={<UploadOutlined />} onClick={handleClick}>upload</button>
        </>
      );  
}
export default UploadToS3;