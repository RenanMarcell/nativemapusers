import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Creators as UsersActions } from '../../store/ducks/users';
import Map from '../../components/Map';

const MapContainer = ({ addUserRequest, users}) => (
  <Map
    addUser={addUserRequest}
    users={users}
  />
);

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => bindActionCreators(UsersActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
