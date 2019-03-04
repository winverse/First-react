import React from 'react';
import styles from './BulletinHeader.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const BulletinHeader = ({ noShadow }) => {
	return (
		<header className={cx('header', { noShadow })}>
			<div className={cx('header-content')}>
				<div className={cx('brand')}>
					<Link to="/">Loyid</Link>
				</div>
				<div className={cx('right')}>
					<Button noShadow={noShadow} theme="outline" to="/bulletin">
						목록으로
					</Button>
					<Button theme="outline" to="/bulletin/editor">
						글쓰기
					</Button>
				</div>
			</div>
		</header>
	);
};

export default BulletinHeader;
