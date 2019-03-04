import React, { Fragment } from 'react';
import styles from './PostInfo.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import moment from 'moment';

const cx = classNames.bind(styles);

const PostInfo = ({ title, author, createAt, logged, loggedUserName, id, onRemove }) => (
  <div className={cx('post-info')}>
    <div className={cx('info')}>
      <h1>{title}</h1>
      <div className={cx('post-editor')}>
        { logged && author === loggedUserName ? 
          <Fragment>
            <Link className={cx('button')} to={`/bulletin/editor/${id}`}>
              수정
            </Link>
            <div className={cx('button')} onClick={onRemove}>
              삭제
            </div>
          </Fragment>
          :
          ''
        }
      </div>
      <div className={cx('names')}>
        <div>{author}</div>
      </div>
      <div className={cx('date')}>{moment(createAt).format('ll')}</div>
    </div>
  </div>
);

export default PostInfo;