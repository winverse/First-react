import React from 'react';
import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';

import Header from 'components/common/BulletinHeader';
import Footer from 'components/common/Footer';

const cx = classNames.bind(styles);

const PageTemplate = ({ children, noShadow }) => {
  return(
    <div className={cx('page-template')}>
      <Header noShadow={noShadow} />
      <main>
        {children}
      </main>
      <Footer/>
    </div>
  );
};


export default PageTemplate;