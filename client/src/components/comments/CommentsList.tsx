import React, { FC } from "react";

interface CommentInterface {
  id: string;
  content: string;
  status: string;
}

interface PorpsInterface {
  comments: CommentInterface[];
}

const CommentsList: FC<PorpsInterface> = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    // eslint-disable-next-line
    let content;

    if (comment.status === "approved") {
      content = comment.content;
    }
    if (comment.status === "pending") {
      content = "This comment is awaiting moderation";
    }
    if (comment.status === "rejected") {
    }
    return <li key={comment.id}>{comment.content}</li>;
  });
  return <ul>{renderedComments}</ul>;
};

export default CommentsList;
