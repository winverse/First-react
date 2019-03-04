import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import * as baseActions from 'store/modules/base/baseModule';
import * as bulletinPostActions from 'store/modules/bulletin/bulletinPostModule';
import * as marketPostActions from 'store/modules/market/marketPostModule';

import AskRemoveModal from 'components/modal/AskRemoveModal';

class AskRemoveModalContainer extends Component {

  handleCancel = () => {
    const { BaseActions } = this.props;
    BaseActions.hideModal('remove');
  }

  handleConfirm = async () => {
    const { BulletinPostActions, match, history, BaseActions, page, MarketPostActions } = this.props;
    const { id } = match.params;
    try {
      if(page === 'market') {
        await MarketPostActions.removePost(id);
        history.push('/market');
        BaseActions.hideModal('remove');
      } else {
        await BulletinPostActions.removePost(id);
        BaseActions.hideModal('remove');
        history.push('/bulletin');
      }
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    const { visible } = this.props;
    const { handleConfirm, handleCancel } = this;
    return (
      <AskRemoveModal
        visible={visible}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    );
  };
}

export default connect(
  (state) => ({
    visible: state.baseModule.getIn(['modal', 'remove'])
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    BulletinPostActions: bindActionCreators(bulletinPostActions, dispatch),
    MarketPostActions: bindActionCreators(marketPostActions, dispatch)
  })
)(withRouter(AskRemoveModalContainer));