import React, { Component } from 'react';
import styled from 'styled-components';
import { AsyncStorage, Alert } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import Button from '../../components/Button';
import Input from '../../components/Input';

import UserRegisterWithEmailMutation from './Mutation/UserRegisterWithEmailMutation';
import { UserRegisterWithEmailMutationResponse } from './Mutation/__generated__/UserRegisterWithEmailMutation.graphql';

const Wrapper = styled.View`flex: 1;`;

const ButtonText = styled.Text`
	color: #000;
	font-weight: 700;
	font-size: 24px;
`;
export interface UserRegisterProps {
	navigation: NavigationScreenProp<{}>;
}

type State = {
	name: string;
	email: string;
	password: string;
};

class UserCreate extends Component<unknown, State, UserRegisterProps> {
	static navigationOptions = {
		title: 'UserCreate'
	};

	state = {
		name: '',
		email: '',
		password: ''
	};

	handleRegister = () => {
		const { name, email, password } = this.state;
		const { navigation } = this.props;

		console.warn('create user');
		const input = {
			name,
			email,
			password
		};

		const onCompleted = (response: UserRegisterWithEmailMutationResponse) => {
			console.warn('oncompleted create user');
			console.log('onCompleted');
			if (!response.UserRegisterWithEmail) return;

			const { error, token } = response.UserRegisterWithEmail;

			console.warn(error);
			error && Alert.alert(error);

			token && AsyncStorage.setItem('TOKEN', token) && navigation.navigate('UserList');
			console.warn(token);
		};

		const onError = () => {
			Alert.alert('Verifique os dados e tente novamente');
			console.warn('create user error');
			console.log('onError');
		};

		UserRegisterWithEmailMutation.commit(input, onCompleted, onError);
	};

	goToList = () => {
		console.warn('goto list create user');
		this.props.navigation.navigate('UserList');
	};
	props: { navigation: any };

	render() {
		const { name, email, password } = this.state;
		return (
			<Wrapper>
				<Input
					name="name"
					placeholder="Name"
					value={name}
					onChangeText={(value: any) => this.setState({ name: value })}
				/>
				<Input
					name="email"
					placeholder="Email"
					value={email}
					onChangeText={(value: any) => this.setState({ email: value })}
				/>
				<Input
					name="password"
					placeholder="Password"
					value={password}
					onChangeText={(value: any) => this.setState({ password: value })}
					secureTextEntry
				/>
				<Button onPress={() => this.handleRegister()}>
					<ButtonText>Register</ButtonText>
				</Button>

				<Button onPress={() => this.goToList()}>
					<ButtonText>Lista de usuários</ButtonText>
				</Button>
			</Wrapper>
		);
	}
	setState(arg0: { password: any }): void {
		throw new Error('Method not implemented.');
	}
}

export default UserCreate;
