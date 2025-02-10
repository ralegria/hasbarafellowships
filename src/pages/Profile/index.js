import cn from "classnames";
import { Button } from "antd";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axiosRequest from "../../axiosInterceptor";
import useUI from "../../hooks/useUI";

import ProfileEditPage from "./EditPage/ProfileEditPage";
import SpinLoader from "../../layout/SpinLoader";
import Goal from "../../components/Goal";
import { LOCAL_STORAGE } from "../../consts";

import "./Profile.scss";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { userID } = useParams();
  const {
    isProfileEditing,
    userInfo,
    isLogged,
    setLogStatus,
    loading,
    SectionIsLoading,
    finishLoading,
    setUserInfo,
    editingProfile,
  } = useUI();

  //Getting profile info
  useEffect(() => {
    const getProfileInfo = async () => {
      loading();
      try {
        if (userID) {
          const response = await axiosRequest.get(`/users/${userID}`);

          if (response.status === 200) {
            const SESSION = JSON.parse(
              localStorage.getItem(LOCAL_STORAGE.TOKEN)
            );

            if (SESSION.userId === userID && SESSION.token) {
              setLogStatus(true);
            }

            setUserInfo(response.data);
            finishLoading();
          }
        }
      } catch (error) {
        if (error.status === 401) {
          navigate("/login");
          finishLoading();
        }
      }
    };

    getProfileInfo();
  }, [userID]);

  return (
    <div
      className={cn("profile-page", { isLoading: SectionIsLoading("general") })}
    >
      {SectionIsLoading("general") && <SpinLoader />}
      {!SectionIsLoading("general") && !isProfileEditing && (
        <>
          <header
            className="cover-photo"
            style={{
              ...(userInfo.cover_pic && {
                background: `url(${userInfo.cover_pic}) no-repeat center center / cover`,
              }),
            }}
          />
          <div className="content">
            <div className="profile-info">
              <div className="header">
                <img
                  src={userInfo.profile_pic}
                  className="profile-pic"
                  alt={userInfo.firstnames}
                />
                {isLogged && (
                  <Button
                    type="default"
                    className="edit-btn"
                    onClick={editingProfile}
                  >
                    Edit Info.
                  </Button>
                )}
              </div>
              <div className="title-name">
                <h1>{userInfo.page_title}</h1>
                <h4>
                  {userInfo.firstnames} {userInfo.lastnames}
                </h4>
                <p>{userInfo.page_description}</p>
              </div>
            </div>
            {isLogged && <Goal />}
          </div>
        </>
      )}
      {!SectionIsLoading("general") && isProfileEditing && <ProfileEditPage />}
    </div>
  );
};

export default ProfilePage;
