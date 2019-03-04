import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as baseActions from 'store/modules/base/baseModule';

import { HeaderMobileNav } from 'components/common/Header';

class NavContainer extends Component {
  
  componentWillUnmount() {
    const { BaseActions } = this.props;
    BaseActions.setNavVisibility(null);
  }

  render() {
    const { BaseActions, visible } = this.props;
    
    return (
      <Fragment>
        <HeaderMobileNav visible={visible}>
          
        </HeaderMobileNav>
      </Fragment>
    );
  };
}

export default connect(
  (state) => ({
    visible: state.baseModule.getIn(['nav', 'visible'])
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(NavContainer);