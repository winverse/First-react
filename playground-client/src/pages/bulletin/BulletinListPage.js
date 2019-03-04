import React from 'react';
import BulletinListContainer from 'containers/bulletin/list/BulletinListContainer';

const BulletinListPage = ({ match }) => {
  const { page = 1 } = match.params;

  return( 
    <BulletinListContainer
      page={parseInt(page, 10)}
    />
  );
};

export default BulletinListPage;