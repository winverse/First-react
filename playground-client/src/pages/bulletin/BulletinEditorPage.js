import React from 'react';
import EditorTemplate from 'components/common/EditorTemplate';
import EditorHeaderContainer from 'containers/bulletin/editor/BulletinEditorHeaderContainer';
import EditorBodyContainer from 'containers/bulletin/editor/BulletinEditorBodyContainer';
import Footer from 'components/common/Footer';

const BulletinEditorPage = () => {
  return(
    <EditorTemplate
      header={<EditorHeaderContainer/>}
      editor={<EditorBodyContainer/>}
      footer={<Footer/>}
    />
  );
};

export default BulletinEditorPage;