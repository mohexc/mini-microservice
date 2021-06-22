import React, { FC, useEffect, useState } from "react";
import { Card } from "antd";
import { useCommentsContext } from "../../contextHooks/CommentsContext";
import CreateComment from "../comments/CreateComment";
import CommentsList from "../comments/CommentsList";
interface PostType {
  title: string;
  id: string;
  comments: CommentInterface[];
}

interface PostCardPorps {
  post: PostType;
}

interface CommentInterface {
  id: string;
  content: string;
}

const PostCard: FC<PostCardPorps> = ({ post }) => {
  const [comments, setComments] = useState<CommentInterface[]>([]);
  // const { getCommentsByPostId } = useCommentsContext();

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line
  }, [post]);

  const fetchComments = async () => {
    // const data = await getCommentsByPostId(post.id);
    setComments(post.comments);
  };
  return (
    <Card style={{ borderRadius: "1rem" }}>
      <h6>id : {post.id}</h6>
      <h4>title : {post.title}</h4>
      <CreateComment postId={post.id} refetch={fetchComments} />
      <CommentsList comments={post.comments} />
    </Card>
  );
};

export default PostCard;
