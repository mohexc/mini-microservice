import React, { FC, useEffect, useState } from "react";
import { Card } from "antd";
import { useCommentsContext } from "../../contextHooks/CommentsContext";
import CreateComment from "../comments/CreateComment";
interface PostType {
  title: string;
  id: string;
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
  const { getCommentsByPostId } = useCommentsContext();

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line
  }, []);

  const fetchComments = async () => {
    const data = await getCommentsByPostId(post.id);
    setComments(data);
  };
  return (
    <Card style={{ borderRadius: "1rem" }}>
      <h6>id : {post.id}</h6>
      <h4>title : {post.title}</h4>
      <CreateComment postId={post.id} refetch={fetchComments} />
      {comments.reverse().map((commnet) => (
        <p key={JSON.stringify(commnet)}>{commnet.content}</p>
      ))}
    </Card>
  );
};

export default PostCard;
