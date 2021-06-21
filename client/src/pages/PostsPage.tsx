import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import CreatePost from "../components/posts/CreatePost";
import axios from "axios";
import PostCard from "../components/posts/PostCard";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await axios.get("http://localhost:4000/posts");
    setPosts(data);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <Row gutter={[16, 16]} style={{ width: 900 }}>
        <Col span={8}>
          <CreatePost refetch={fetchPosts} />
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ width: 900 }}>
        {posts.map((post) => (
          <Col key={JSON.stringify(post)}>
            <PostCard post={post} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PostsPage;
