import React, { FC } from "react";

interface CommentInterface {
  id: string;
  content: string;
}

interface PorpsInterface {
  comments: CommentInterface[];
}

const CommentsList: FC<PorpsInterface> = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });
  return <ul>{renderedComments}</ul>;
};

export default CommentsList;
