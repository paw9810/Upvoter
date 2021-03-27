import React from "react";
import Header from "../components/Header";
import Profile from "../components/Profile";
import ProfilePostList from "../components/ProfilePostList";

const ProfileView = () => {
  return (
    <div>
      <Header location="Your profile" />
      <Profile />
      <ProfilePostList />
    </div>
  );
};

export default ProfileView;
