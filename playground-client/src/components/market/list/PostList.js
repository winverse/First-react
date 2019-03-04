import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import Masonry from 'react-masonry-component';

import { media } from 'styles/styleUtils';
import Post from './Post';

const Wrapper = styled.div`
  width: 70%;
  max-width: 1200px;
  min-height: 80vh;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  margin-top: 1rem;
  ${media.phone`
    width: calc(100% - 1rem);
    margin-top: 0rem;
  `}
`;

const PostList = ({ children, posts }) => {
  const postList = posts && posts.map(
    (post) => (
      <Post 
        key={post._id}
        post={post}
      />
    )
  );

  return(
    <Wrapper>
      <Masonry options={{ gutter: 16 }}>
        {postList}
      </Masonry>
    </Wrapper>
  );
};

export default PostList;