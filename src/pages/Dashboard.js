import React, { Fragment, useState } from "react";
import Header from "../components/Layouts/Header";
import UpdateProfile from "../components/UpdateProfile/UpdateProfile";
import ExpenseForm from "../components/Expenses.js/ExpenseForm";
import Expenses from "../components/Expenses.js/Expenses";

const Dashboard = () => {
  const [showProfile, setProfile] = useState(false);
  const handleShowProfile = () => setProfile(true);
  const handleHideProfile = () => setProfile(false);
  return (
    <div style={{minHeight: '100vh'}}>
      <Header showProfile={showProfile} onShowProfile={handleShowProfile} onHideProfile={handleHideProfile} />
      {showProfile && <UpdateProfile onHideProfile={handleHideProfile}/>}
      <ExpenseForm />
      <Expenses />
    </div>
  );
};

export default Dashboard;
