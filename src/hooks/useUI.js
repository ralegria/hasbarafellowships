import { useDispatch, useSelector } from "react-redux";
import {
  isLoading,
  finishLoading as notLoading,
  setNewFormAlert,
  switchGoalEditMode,
  switchProfileEditMode,
  setDonationAmount,
} from "../redux/slices/UISlice";
import {
  setGoal,
  setUserInfo as storeUser,
  setEmptyGoal as setEmpty,
  setLogStatus as setLog,
} from "../redux/slices/UserSlice";

const errorInitialValue = { type: "success", message: null };

export const useUI = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector((store) => store.user.isLogged);
  const isProfileEditing = useSelector((store) => store.UI.profileEditMode);
  const isGoalEditing = useSelector((store) => store.UI.goalEditMode);
  const userInfo = useSelector((store) => store.user.info);
  const goalInfo = useSelector((store) => store.user.goal);

  //const loading = (section) => dispatch(switchLoading({ section }));
  const setUserInfo = (info) => dispatch(storeUser(info));
  const editingProfile = () => dispatch(switchProfileEditMode());
  const setLogStatus = (isLogged) => dispatch(setLog(isLogged));
  const setNewGoal = (goal) => dispatch(setGoal(goal));
  const setEmptyGoal = () => dispatch(setEmpty());
  const editingGoal = () => dispatch(switchGoalEditMode());
  const setNewAlert = (alert) => dispatch(setNewFormAlert(alert));
  const clearAlerts = () => dispatch(setNewFormAlert(errorInitialValue));
  const setDonation = (amount) => dispatch(setDonationAmount(amount));
  const SectionIsLoading = (section) =>
    useSelector((store) =>
      store.UI.loading.section === section ? store.UI.loading.isLoading : false
    );

  const loading = (section) => dispatch(isLoading({ section }));

  const finishLoading = (callback = () => {}) => {
    setTimeout(() => {
      dispatch(notLoading());
      callback();
    }, 1000);
  };

  return {
    isLogged,
    isProfileEditing,
    isGoalEditing,
    userInfo,
    goalInfo,
    setLogStatus,
    SectionIsLoading,
    loading,
    finishLoading,
    setUserInfo,
    editingProfile,
    editingGoal,
    setNewGoal,
    setEmptyGoal,
    setNewAlert,
    clearAlerts,
    setDonation,
  };
};

export default useUI;
