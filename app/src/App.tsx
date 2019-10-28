import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import UserCreate from './pages/SignIn/UserCreate';
import BarcodeScanner from './BarcodeScanner';
import Login from './pages/Login/Login';
import UserList from './pages/UserList/UserList';
import UserDetail from './pages/UserDetails/UserDetail';
import ProductCreate from './pages/ProductCreate/ProductCreate';
import Dashboard from './pages/Dashboard/Dashboard';
import ProductList from './pages/ProductList/ProductList';

const App = createSwitchNavigator(
	{
		Login: { screen: Login },
		BarcodeScanner: { screen: BarcodeScanner },
		UserCreate: { screen: UserCreate },
		UserList: { screen: UserList },
		UserDetail: { screen: UserDetail },
		ProductCreate: { screen: ProductCreate },
		Dashboard: { screen: Dashboard },
		ProductList: { screen: ProductList }
	},
	{ initialRouteName: 'Login' }
);

const RelayApp = createAppContainer(App);

export default RelayApp;
