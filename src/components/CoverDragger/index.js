import axios from "axios";
import { useEffect, useState } from "react";
import { CameraOutlined } from "@ant-design/icons";
import { Button } from "antd";

import Dragger from "antd/es/upload/Dragger";

import "./CoverDragger.scss";

const CoverDragger = ({ cover_pic = null, onUploadChange }) => {
  const [coverPhotoUrl, setCoverPhotoUrl] = useState(cover_pic);

  useEffect(() => {
    setCoverPhotoUrl(cover_pic);
  }, [cover_pic]);

  return (
    <header
      className="cover-dragger"
      style={{
        ...(coverPhotoUrl && {
          background: `url(${coverPhotoUrl}) no-repeat center center / cover`,
        }),
      }}
    >
      <div className="overlay" />
      <Dragger
        multiple={false}
        showUploadList={false}
        className="cover-photo-dragger"
        customRequest={(file) => {
          const formData = new FormData();
          formData.append("file", file.file);
          formData.append("upload_preset", "iuj87bk5");
          axios
            .post(
              "https://api.cloudinary.com/v1_1/baygram/image/upload",
              formData
            )
            .then((response) => {
              setCoverPhotoUrl(response.data.secure_url);
              onUploadChange(response.data.secure_url);
              file.onSuccess(response.data.secure_url);
            })
            .catch((error) => {
              console.error(error);
              file.onError(error);
            });
        }}
      >
        {!coverPhotoUrl && <CameraOutlined />}
        <Button type="default" className="cover-btn">
          Add cover photo
        </Button>
      </Dragger>
    </header>
  );
};

export default CoverDragger;
