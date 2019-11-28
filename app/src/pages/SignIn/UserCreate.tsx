import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { Alert, Image, Text } from 'react-native';
import { NavigationScreenProp, NavigationEvents } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import { Formik } from 'formik';
import * as yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';

import UserRegisterWithEmailMutation from './Mutation/UserRegisterWithEmailMutation';
import { UserRegisterWithEmailMutationResponse } from './Mutation/__generated__/UserRegisterWithEmailMutation.graphql';

const Wrapper = styled.View`
	flex: 1;
	align-items: center;
	justify-content: flex-start;
	background-color: #fff;
`;

const LoginButton = styled.TouchableHighlight`
	width: 386;
	height: 20;
	justify-content: center;
	align-items: flex-end;
`;
const ViewButton = styled.View`
	width: 100%;
	height: 68;
	marginTop: 20;
	justify-content: center;
	align-items: center;
`;
const TextButtonSignup = styled.Text`
	color: #fff;
	fontSize: 24;
	font-weight: bold;
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

	function handleRegister(values) {
		const onCompleted = (response: UserRegisterWithEmailMutationResponse) => {
			console.warn('oncompleted create user');
			console.log('onCompleted');
			if (!response.UserRegisterWithEmail) return;

			const { error, token } = response.UserRegisterWithEmail;

			console.warn(error);
			error && Alert.alert(error);

			token && AsyncStorage.setItem('TOKEN', token) && navigation.navigate('Dashboard');
			console.warn(token);
		};

		const onError = () => {
			Alert.alert('Verifique os dados e tente novamente');
			console.warn('create user error');
			console.log('onError');
		};

		UserRegisterWithEmailMutation.commit(values, onCompleted, onError);
	}

	return (
		<Wrapper>
			<Image
				style={{ width: 222, height: 240, marginTop: 37, marginBottom: 45 }}
				source={require('../../assets/imgs/siginImage.png')}
			/>
			<Formik
				initialValues={{ name: '', email: '', password: '' }}
				onSubmit={(values) => handleRegister(values)}
				validationSchema={yup.object().shape({
					email: yup.string().email().required(),
					password: yup.string().min(6).required(),
					name: yup.string().min(6).required()
				})}
			>
				{({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
					<Fragment>
						{touched.name &&
						errors.name && <Text style={{ fontSize: 14, color: 'red' }}>{errors.name}</Text>}
						<Input
							value={values.name}
							onChangeText={handleChange('name')}
							onBlur={() => setFieldTouched('name')}
							placeholder="name"
						/>
						{touched.email &&
						errors.email && <Text style={{ fontSize: 14, color: 'red' }}>{errors.email}</Text>}
						<Input
							value={values.email}
							onChangeText={handleChange('email')}
							onBlur={() => setFieldTouched('email')}
							placeholder="email"
						/>
						{touched.password &&
						errors.password && <Text style={{ fontSize: 14, color: 'red' }}>{errors.password}</Text>}
						<Input
							value={values.password}
							onChangeText={handleChange('password')}
							placeholder="password"
							onBlur={() => setFieldTouched('password')}
							secureTextEntry={true}
						/>
						<LoginButton
							onPress={() => navigation.navigate('Login')}
							style={{ marginBottom: 20, backgroundColor: '#fff' }}
						>
							<Text style={{ fontSize: 17, color: '#BCBCBC' }}>
								Already have an account? <Text style={{ color: '#1EB36B' }}>Login</Text>
							</Text>
						</LoginButton>
						<ViewButton>
							<Button onPress={handleSubmit}>
								<TextButtonSignup>Signup</TextButtonSignup>
							</Button>
						</ViewButton>
					</Fragment>
				)}
			</Formik>
		</Wrapper>
	);
}

export default UserCreate;
