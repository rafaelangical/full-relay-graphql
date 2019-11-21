import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import UserCreate from './pages/SignIn/UserCreate';
import Login from './pages/Login/Login';
import UserDetail from './pages/UserDetails/UserDetail';
import TaskCreate from './pages/TaskCreate/TaskCreate';
import Dashboard from './pages/Dashboard/Dashboard';
import TaskList from './pages/TaskList/TaskList';
import TaskDetail from './pages/TaskDetail/TaskDetail';

const App = createSwitchNavigator(
	{
		Login: { screen: Login },
		UserCreate: { screen: UserCreate },
		UserDetail: { screen: UserDetail },
		TaskCreate: { screen: TaskCreate },
		TaskDetail: { screen: TaskDetail },
		Dashboard: { screen: Dashboard },
		TaskList: { screen: TaskList }
	},
	{ initialRouteName: 'Login' }
);

const RelayApp = createAppContainer(App);

export default RelayApp;
