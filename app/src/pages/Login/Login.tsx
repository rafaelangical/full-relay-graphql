import React, { useState } from 'react';
import { View, Text, AsyncStorage, Alert, Image } from 'react-native';
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
	justify-content: flex-start;
	background-color: #fff;
`;
const ViewButton = styled.View`
	width: 100%;
	height: 68;
	marginTop: 156;
	justify-content: center;
	align-items: center;
`;
const SignInButton = styled.TouchableHighlight`
	width: 386;
	height: 20;
	justify-content: center;
	align-items: flex-end;
`;
const TextButtonLogin = styled.Text`
	color: #fff;
	fontSize: 24;
	font-weight: bold;
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
			<Image
				style={{ width: 222, height: 261.6, marginTop: 37, marginBottom: 45 }}
				source={require('../../assets/imgs/loginImage.png')}
			/>
			<Input placeholder="email" value={email} onChangeText={(email) => setEmail(email)} />
			<Input placeholder="password" secureTextEntry value={password} onChangeText={(pass) => setPassword(pass)} />
			<SignInButton onPress={() => navigation.navigate('UserCreate')}>
				<Text style={{ fontSize: 17, color: '#BCBCBC' }}>
					No account? <Text style={{ color: '#1EB36B' }}>Signup</Text>
				</Text>
			</SignInButton>
			<ViewButton>
				<Button onPress={() => handleLogin(email, password)}>
					<TextButtonLogin>Login</TextButtonLogin>
				</Button>
			</ViewButton>
		</Wrapper>
	);
}
