import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppNavigator, { NavigationService } from './navigator';
import { authSelectors, authActions } from './redux';

const mapStateToProps = state => ({
  accessToken: authSelectors.getAccessToken(state),
  refreshToken: authSelectors.getRefreshToken(state),
});

const mapDispatchToProps = {
  checkAccessToken: authActions.checkAccessToken,
};

class App extends Component {
  static propTypes = {
    accessToken: PropTypes.string,
    refreshToken: PropTypes.string,
    checkAccessToken: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { accessToken, refreshToken, checkAccessToken } = this.props;
    if (!accessToken || !refreshToken) {
      checkAccessToken();
    }
  }

  render() {
    return (
      <AppNavigator ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef)} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
