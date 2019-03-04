import React from 'react';
import styles from './PostList.scss';
import classNames from 'classnames/bind';

import TimeIcon from 'react-icons/lib/io/android-time';
import TitleIcon from 'react-icons/lib/ti/book';
import AuthorIcon from 'react-icons/lib/io/person';
import PostItem from 'components/bulletin/list/PostItem';

const cx = classNames.bind(styles);

const PostList = ({ posts }) => {
  const postList = posts && posts.valueSeq().map(
    (post) => {
      const { _id, title, text, createAt, author, images } = post.toJS();
      return (
        <PostItem
          title={title}
          text={text}
          createAt={createAt}
          key={_id}
          id={_id}
          author={author}
          image={images}
        />
      );
    }
  );

  return(
    <div className={cx('post-list')}>
      <div className={cx('list-top')}>
        <div className={cx('time')}>
          <TimeIcon/>
        </div>
        <div className={cx('title')}>
          <TitleIcon/>
        </div>
        <div className={cx('author')}>
          <AuthorIcon/>
        </div>  
      </div>
      {postList}
    </div>
  );
};


export default PostList;