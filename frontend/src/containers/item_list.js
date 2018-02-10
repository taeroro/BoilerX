import React, { Component } from 'react';
import { connect } from 'react-redux';

class ItemList extends Component {
  render() {
    return (
      // TODO: format output

    )
  }
}

function mapStateToProps({items}) {
  return {items};
}

export default connect (mapStateToProps)(ItemList);
