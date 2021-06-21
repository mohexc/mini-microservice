import React from "react";
import "./App.less";
import PostsPage from "./pages/PostsPage";
import PostProvider from "./contextHooks/PostsContext";
import CommentsProvider from "./contextHooks/CommentsContext";

const App = () => {
  return (
    <React.Fragment>
      <PostProvider>
        <CommentsProvider>
          <PostsPage />
        </CommentsProvider>
      </PostProvider>
    </React.Fragment>
  );
};

export default App;
