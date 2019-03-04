import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as marketListActions from 'store/modules/market/marketListModule';

import { 
  ListWrapper,
  PostList
} from 'components/market/list';

class MarketListContainer extends Component {

  getPostList = async () => {
    const { MarketListActions } = this.props;
    
    try {
      await MarketListActions.getList();
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    const { getPostList } = this;
    getPostList();
  }

  render() {
    const { data } = this.props;
    return (
      <ListWrapper>
        <PostList
          posts={data}
        />
      </ListWrapper>
    );
  };
}

export default connect(
  (state) => ({
    next: state.marketListModule.get('next'),
    data: state.marketListModule.get('data'),
    nextData: state.marketListModule.get('nextData')
  }),
  (dispatch) => ({
    MarketListActions: bindActionCreators(marketListActions, dispatch)
  })
)(MarketListContainer);