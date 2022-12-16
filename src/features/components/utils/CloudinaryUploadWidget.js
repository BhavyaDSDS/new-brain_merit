import React, { useEffect, useState } from "react";
import { Image } from "antd";

function CloudinaryUploadWidget(props) {
  const { photo, onWidgetUpload, name } = props;
  const [url, setUrl] = useState(photo);
  const [showImage, setShowImage] = useState(false);  
  
  useEffect(() => {
    console.log("props.photo: " + url);
    console.log("props.showImage: " + showImage);
    setUrl(url);
    if(url != null)
    {
      setShowImage(true);
    }
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "vithamas-technologies-pvt-ltd",
        uploadPreset: "ymwr1utf",
        multiple: true,
        folder: "newbees_images",
        maxImageFileSize: 2000000,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          console.log("image url", result.info.url);
          setUrl(result.info.url);
          setShowImage(true);
          onWidgetUpload(result.info.url);
        }
      }
    );
    document.getElementById("upload_widget").addEventListener(
      "click",
      function (e) {
        myWidget.open();
        e.preventDefault();
      },
      false
    );
  },[url]);
  
  return (
    <>
      <div style = {{display:"flex",flexDirection:"column", gap:10}}>
      
      {showImage && (
      <div >
      <Image width={150} height={180} src={url} />
      </div>
        )}
      
      <div >
        <button id="upload_widget" className="cloudinary-button" style={{height:50 }}>
          {/* Upload Profile Image */}{name}
        </button>
      </div>
      </div>
    </>
  );
}
export default CloudinaryUploadWidget;
