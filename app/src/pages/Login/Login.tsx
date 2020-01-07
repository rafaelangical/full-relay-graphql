import React, { Fragment } from 'react';
import { Text, Alert, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as yup from 'yup';

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
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: flex-start;
	background-color: #fff;
`;
const ViewButton = styled.View`
	width: 100%;
	height: 68;
	flex: 1;
	margin-top: 156;
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
	font-size: 24;
	font-weight: bold;
`;
export default function Login({ navigation }: Props) {
	const handleLogin = (values) => {
		const onCompleted = (response: UserLoginWithEmailMutationResponse) => {
			if (!response.UserLoginWithEmail) {
				return;
			}

			const { error, token } = response.UserLoginWithEmail;

			error && Alert.alert(error);

			token && AsyncStorage.setItem('TOKEN', token) && navigation.navigate('Dashboard');
		};

		const onError = () => {
			Alert.alert('Verifique os dados e tente novamente');
			console.log('onError');
		};

		UserLoginWithEmailMutation.commit(values, onCompleted, onError);
	};

	return (
		<ScrollView
			style={{ flex: 1, backgroundColor: '#Fff' }}
			contentContainerStyle={{
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'flex-start'
			}}
		>
			<KeyboardAvoidingView
				style={{
					flex: 1,
					height: '100%',
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-start'
				}}
				keyboardVerticalOffset={0}
				behavior={'position'}
			>
				<Wrapper>
					<Image
						style={{ width: 222, height: 261.6, marginTop: 37, marginBottom: 45 }}
						source={require('../../assets/imgs/loginImage.png')}
					/>
					<Formik
						initialValues={{ email: '', password: '' }}
						onSubmit={(values) => handleLogin(values)}
						validationSchema={yup.object().shape({
							email: yup.string().email().required(),
							password: yup.string().min(6).required()
						})}
					>
						{({ values, handleChange, errors, setFieldTouched, touched, handleSubmit }) => (
							<Fragment>
								{touched.email &&
								errors.email && (
									<Text style={{ fontSize: 14, color: 'red', marginTop: -15 }}>{errors.email}</Text>
								)}
								<Input
									value={values.email}
									onChangeText={handleChange('email')}
									onBlur={() => setFieldTouched('email')}
									placeholder="email"
								/>
								{touched.password &&
								errors.password && (
									<Text style={{ fontSize: 14, color: 'red', marginTop: -15 }}>
										{errors.password}
									</Text>
								)}
								<Input
									value={values.password}
									onChangeText={handleChange('password')}
									placeholder="password"
									onBlur={() => setFieldTouched('password')}
									secureTextEntry={true}
								/>
								<SignInButton onPress={() => navigation.navigate('UserCreate')}>
									<Text style={{ fontSize: 17, color: '#BCBCBC' }}>
										No account? <Text style={{ color: '#1EB36B' }}>Signup</Text>
									</Text>
								</SignInButton>
								<ViewButton>
									<Button onPress={handleSubmit}>
										<TextButtonLogin>Login</TextButtonLogin>
									</Button>
								</ViewButton>
							</Fragment>
						)}
					</Formik>
				</Wrapper>
			</KeyboardAvoidingView>
		</ScrollView>
	);
}
