import React from "react";
import Header from "../components/Header";
import Post from "../components/Post.js";
import Grid from "@material-ui/core/Grid";
import Pagination from "../components/Pagination";
import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../config";

const MainView = () => {
  const postImagePath = `${API}/media/posts/`;
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    getPosts(page);
  }, [page]);

  const getPosts = async (page) => {
    try {
      const response = await axios.get(`/page/${page}`);
      if (response.data[0].length !== 0) setData(response.data[0]);
      setPageCount(response.data[1]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoaded(true);
    }
  };

  const handlePage = (e) => {
    setPage(e.currentTarget.value);
    window.scrollTo(0, 0);
  };

  if (data)
    return (
      <div>
        <Header location="Home" />
        {loaded &&
          data.map((post, i) => (
            <Post key={i} data={post} imgPath={postImagePath + post.location} />
          ))}

        <Pagination handlePage={handlePage} pages={pageCount} />
      </div>
    );
};

export default MainView;
