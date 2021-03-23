import React from "react";
import Header from "./components/Header";
import Post from "./components/Post.js";

const App = () => {
  return (
    <div className="App">
      <Header location="Home" />
      <Post />
    </div>
  );
};

export default App;
