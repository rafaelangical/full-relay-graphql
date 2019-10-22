import React, { useState } from 'react';
import { View, Text, AsyncStorage, Alert } from 'react-native';
import styled from 'styled-components';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { UserLoginWithEmailMutationResponse } from './Mutation/__generated__/UserLoginWithEmailMutation.graphql';
import UserLoginWithEmailMutation from './Mutation/UserLoginWithEmailMutation';

import { NavigationScreenProp } from 'react-navigation';

interface Props {
	navigation: NavigationScreenProp<{}>;
}

const Wrapper = styled.View`
	flex: 1;
	align-items: center;
	justify-content: flex-end;
`;
const TextWelcome = styled.Text`
	font-size: 30;
	color: red;
	position: absolute;
	top: 30%;
	margin-bottom: 50%;
`;
const ViewButton = styled.View`
	width: 100%;
	height: 150;
	align-self: flex-end;
`;

export default function Login({ navigation }: Props) {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const handleLogin = (email, password) => {
		const input = {
			email,
			password
		};

		const onCompleted = (response: UserLoginWithEmailMutationResponse) => {
			if (!response.UserLoginWithEmail) return;

			const { error, token } = response.UserLoginWithEmail;

			error && Alert.alert(error);

			token && AsyncStorage.setItem('TOKEN', token) && navigation.navigate('Dashboard');
			console.warn(token);
		};

		const onError = () => {
			Alert.alert('Verifique os dados e tente novamente');
			console.warn('login error');
			console.log('onError');
		};

		UserLoginWithEmailMutation.commit(input, onCompleted, onError);
	};

	return (
		<Wrapper>
			<TextWelcome>Bem vindo</TextWelcome>
			<Input placeholder="email" value={email} onChangeText={(email) => setEmail(email)} />
			<Input placeholder="password" secureTextEntry value={password} onChangeText={(pass) => setPassword(pass)} />
			<ViewButton>
				<Button onPress={() => handleLogin(email, password)}>
					<Text>Login</Text>
				</Button>
				<Button onPress={() => navigation.navigate('UserCreate')}>
					<Text>SignIn</Text>
				</Button>
			</ViewButton>
		</Wrapper>
	);
}
