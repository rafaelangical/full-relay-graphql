import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AsyncStorage, Alert } from 'react-native';
import { NavigationScreenProp, NavigationEvents } from 'react-navigation';

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

function UserCreate({ navigation }: UserRegisterProps) {
	useEffect(() => {
		const token = AsyncStorage.getItem('TOKEN', null);
		if (token === null) {
			navigation.navigate('Login');
		}
	}, []);

	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	function handleRegister() {
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
	}

	function goToList() {
		console.warn('goto list create user');
		navigation.navigate('UserList');
	}

	return (
		<Wrapper>
			<Input name="name" placeholder="Name" value={name} onChangeText={(value: any) => setName(value)} />
			<Input name="email" placeholder="Email" value={email} onChangeText={(value: any) => setEmail(value)} />
			<Input
				name="password"
				placeholder="Password"
				value={password}
				onChangeText={(value: any) => setPassword(value)}
				secureTextEntry
			/>
			<Button onPress={() => handleRegister()}>
				<ButtonText>Register</ButtonText>
			</Button>

			<Button onPress={() => goToList()}>
				<ButtonText>Lista de usuários</ButtonText>
			</Button>
		</Wrapper>
	);
}

export default UserCreate;
