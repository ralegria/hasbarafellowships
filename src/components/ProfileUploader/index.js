import axios from "axios";
import { CameraOutlined, EditFilled, LoadingOutlined } from "@ant-design/icons";
import { Button, Spin, Upload } from "antd";

import useUI from "../../hooks/useUI";

const ProfileUploader = () => {
  const sectionName = "profile-uploader";
  const { loading, finishLoading, SectionIsLoading, setUserInfo, userInfo } =
    useUI();

  const loaded_photo = userInfo.profile_pic;
  const isLoading = SectionIsLoading(sectionName);

  return (
    <Upload
      className="avatar-uploader"
      listType="picture-card"
      showUploadList={false}
      multiple={false}
      disabled={isLoading}
      customRequest={(file) => {
        const formData = new FormData();
        loading(sectionName);
        formData.append("file", file.file);
        formData.append(
          "upload_preset",
          process.env.REACT_APP_CLOUDINARY_PRESET
        );
        axios
          .post(process.env.REACT_APP_CLOUDINARY_API, formData)
          .then((response) => {
            const newImage = response.data.secure_url;
            setUserInfo({
              editing_profile_pic: userInfo.profile_pic,
              profile_pic: newImage,
            });
            file.onSuccess(newImage);
          })
          .catch((error) => {
            console.error(error);
            file.onError(error);
          })
          .finally(() => {
            finishLoading();
          });
      }}
    >
      {loaded_photo ? (
        <div
          className="photo-edit-container"
          style={{
            background: `url(${loaded_photo}) no-repeat center center / cover`,
          }}
        >
          {!isLoading ? (
            <EditFilled className="edit-icon" />
          ) : (
            <Spin
              size="large"
              className="loading-icon"
              indicator={<LoadingOutlined spin />}
            />
          )}
        </div>
      ) : (
        <Button type="button">
          <CameraOutlined className="camara-icon" />
        </Button>
      )}
    </Upload>
  );
};

export default ProfileUploader;
