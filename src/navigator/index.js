import {
  createSwitchNavigator,
  // createDrawerNavigator,
  createBottomTabNavigator,
  // createStackNavigator,
} from 'react-navigation';
import Loading from '../screens/Loading';
import Auth from '../screens/Auth';
import Dashboard from '../screens/Dashboard';
import { routes, colors } from '../constants';

const App = createBottomTabNavigator({
  [routes.app.dashboard]: Dashboard,
}, {
  initialRouteName: routes.app.dashboard,
  swipeEnabled: false,
  lazy: false,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: colors.green,
    inactiveTintColor: colors.spaceGrey,
    showIcon: true,
    upperCaseLabel: true,
    scrollEnabled: false,
    style: {
      backgroundColor: colors.white,
    },
    indicatorStyle: {
      display: 'none',
    },
    labelStyle: {
      margin: 0,
    },
  },
});

const mainRoutes = {
  loading: Loading,
  auth: Auth,
  // auth: createStackNavigator(authRoutes, {
  //   navigationOptions: {
  //     headerStyle: {
  //       height: 72,
  //       borderBottomWidth: 0,
  //       backgroundColor: colors.white,
  //       shadowColor: colors.appBackground,
  //       shadowOffset: { width: 0, height: 0 },
  //       shadowOpacity: 0,
  //       shadowRadius: 0,
  //       elevation: 0,
  //     },
  //     // headerTitle: <Logo />,
  //     // headerTintColor: colors.darkGreen,
  //   },
  // }),
  app: App,
  // link: Link,
  // personal: PersonalMenu
};

export default createSwitchNavigator(mainRoutes, { initialRouteName: 'loading' });
export { default as NavigationService } from './NavigationService';
