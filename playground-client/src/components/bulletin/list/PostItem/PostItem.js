import React from 'react';
import styles from './PostItem.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import moment from 'moment';

const cx = classNames.bind(styles);

const PostItem = ({ title, text, createAt, author, id, image }) => {
  return(
    <div className={cx('post-item')}>
      <div className={cx('post-itemBox')}>
        <div className={cx('time')}>
          {
            moment().date() === moment(createAt).date() ? 
              moment(createAt).format('HH:mm')
              :
              moment(createAt).format('YY-MM-DD')
          }
        </div>
        <Link className={cx('title')} to={`/bulletin/post/${id}`}>
          <div>{title}</div>
        </Link>
        <div className={cx('author')}>
          <Link to='/'>{author}</Link>
        </div>
      </div>
    </div>
  );
};


export default PostItem;