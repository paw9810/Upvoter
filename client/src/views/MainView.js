import React from "react";
import Header from "../components/Header";
import Post from "../components/Post.js";

const MainView = () => {
  return (
    <div>
      <Header location="Home" />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default MainView;
