import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ButtetinPostContainer from 'containers/bulletin/post/BulletinPostContainer';
import AskRemoveModalContainer from 'containers/base/AskRemoveModalContainer';

const BulletinPostPage = () => {
  return(
    <PageTemplate noShadow='true'>
      <ButtetinPostContainer/>
      <AskRemoveModalContainer/>
    </PageTemplate>
  );
};

export default BulletinPostPage;