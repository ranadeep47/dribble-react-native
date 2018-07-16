import HomeScreen from '../screens/Home';
import ShotScreen from '../screens/Shot';

import { createStackNavigator } from 'react-navigation'

import { createFluidNavigator } from 'react-navigation-fluid-transitions';

// const RootStack = createStackNavigator(
//   {
//     Home: HomeScreen,
//     Shot: ShotScreen
//   },
//   {
//     initialRouteName: 'Home',
//   }
// );

const RootStack = createFluidNavigator(
  {
    Home: {screen: HomeScreen},
    Shot: {screen: ShotScreen}
  },
  {
    initialRouteName: 'Home',
    navigationOptions: { gesturesEnabled: true },
  }
);



export default RootStack
