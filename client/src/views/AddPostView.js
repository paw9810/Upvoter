import React from "react";
import Header from "../components/Header";
import AddPost from "../components/AddPost";

const AddPostView = () => {
  return (
    <div>
      <Header location="Add post" />
      <AddPost />
    </div>
  );
};

export default AddPostView;
