import { BrowserRouter, Routes, Route } from "react-router";

import HomePage from "../pages/Home";
import ProfilePage from "../pages/Profile";

const Router = () => {
  return (
    <BrowserRouter basename="/students-fundraising-program">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<HomePage />} />
        <Route path="/login" element={<HomePage login={true} />} />
        <Route path="/:userID" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
