import axios from "axios";
import React, { FC, useContext, useState } from "react";

const Context = React.createContext({});

const PostsContext: FC = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const getPostsAll = async () => {
    const { data } = await axios.get("http://localhost:4000/posts");
    setPosts(data);
  };

  const createPost = async (values: { title: string }) => {
    try {
      const { data } = await axios.post("http://localhost:4000/posts", values);
      await getPostsAll();
      return data;
    } catch (error) {
      return error;
    }
  };

  const contex = { posts, getPostsAll, createPost };
  return <Context.Provider value={contex}>{children}</Context.Provider>;
};

export const usePostsContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("Cannot use usePostsContext outside posts provider");
  }
  return context;
};

export default PostsContext;
