import cn from "classnames";
import { Button } from "antd";
import { useCallback, useEffect, useRef } from "react";
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
  const sectionName = "profile";
  const isFirstRender = useRef(true);
  const { userID, status: donationStatus } = useParams();
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

  const getProfileInfo = useCallback(async () => {
    loading(sectionName);
    try {
      if (userID) {
        const response = await axiosRequest.get(`/users/${userID}`);

        if (response.status === 200) {
          const SESSION = JSON.parse(localStorage.getItem(LOCAL_STORAGE.TOKEN));
          if (SESSION?.userId === userID && SESSION?.token) {
            setLogStatus(true);
          }
          setUserInfo(response.data);
        }
      }
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      } else {
        console.error("Error fetching profile info:", error);
      }
    } finally {
      finishLoading();
    }
  }, [finishLoading, loading, navigate, setLogStatus, setUserInfo, userID]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      getProfileInfo();
    }
  }, [getProfileInfo]);

  return (
    <div
      className={cn("profile-page", {
        isLoading: SectionIsLoading(sectionName),
      })}
    >
      {SectionIsLoading(sectionName) && <SpinLoader />}
      {!SectionIsLoading(sectionName) && !isProfileEditing && (
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
            <Goal donationMade={donationStatus} />
          </div>
        </>
      )}
      {!SectionIsLoading(sectionName) && isProfileEditing && (
        <ProfileEditPage />
      )}
    </div>
  );
};

export default ProfilePage;
