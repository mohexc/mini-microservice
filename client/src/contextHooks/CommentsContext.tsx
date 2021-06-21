import axios from "axios";
import React, { FC, useContext } from "react";

interface commentInterface {
  id: string;
  content: string;
}

interface ContextInterface {
  getCommentsByPostId: (postId: string) => Promise<any>;
  createComment: (postId: string, values: { content: string }) => Promise<any>;
}

export const Context = React.createContext<ContextInterface | null>(null);

const CommentsProvider: FC = ({ children }) => {
  const getCommentsByPostId = async (postId: string) => {
    const { data } = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
    return data;
  };

  const createComment = async (postId: string, values: { content: string }) => {
    const { data } = await axios.post(`http://localhost:4001/posts/${postId}/comments`, values);
    return data;
  };

  const context = {
    getCommentsByPostId,
    createComment,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const useCommentsContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("Cannot use useCommentContext outside posts provider");
  }
  return context;
};

export default CommentsProvider;
