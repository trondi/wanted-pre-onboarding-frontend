import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import Home from '../components/todo/TodoHome';

const PostListPage = () => {
  return (
    <>
      <HeaderContainer />
      <div>
        <Home />
      </div>
    </>
  );
};

export default PostListPage;
