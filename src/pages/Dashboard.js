import React, { useState } from "react";
import Header from "../components/Layouts/Header";
import UpdateProfile from "../components/UpdateProfile/UpdateProfile";

const Dashboard = () => {
  const [showProfile, setProfile] = useState(false);
  const handleShowProfile = () => setProfile(true);
  const handleHideProfile = () => setProfile(false);
  return (
    <>
      <Header showProfile={showProfile} onShowProfile={handleShowProfile} onHideProfile={handleHideProfile} />
      {showProfile && <UpdateProfile onHideProfile={handleHideProfile}/>}
    </>
  );
};

export default Dashboard;
