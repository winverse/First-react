import React from 'react';
import styled from 'styled-components';
import Masonry from 'react-masonry-component';

import { media } from 'styles/styleUtils';
import Post from './Post';

const Wrapper = styled.div`
  width: 70%;
  max-width: 1200px;
  min-height: 70vh;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  margin-top: 1rem;
  margin-bottom: 2rem;
  ${media.phone`
    width: calc(100% - 1rem);
    margin-top: 0rem;
  `}
`;

const PostList = ({ thumbnail, posts, onToggleLike, loginUserName, handleArrayCheck, handleCheckLike, onCommentClick, mansonryRef }) => {
  const postList = posts && posts.map(
    (post) => (
      <Post key={post.get('_id')}
        post={post}
        onToggleLike={onToggleLike}
        loginUserName={loginUserName}
        arrayCheck={handleArrayCheck}
        handleCheckLike={handleCheckLike}
        onCommentClick={onCommentClick}
        thumbnail={thumbnail}
      />
    )
  );

  return (
    <Wrapper>
      <Masonry options={{ gutter: 16 }} ref={mansonryRef}>
        {postList}
      </Masonry>
    </Wrapper>
  );
};

export default PostList;