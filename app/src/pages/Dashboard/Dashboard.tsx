import React, { useState } from 'react';
import { View, Text, AsyncStorage, Alert } from 'react-native';
import styled from 'styled-components';

import Button from '../../components/Button';

import { NavigationScreenProp } from 'react-navigation';
import Animation from './Animation';
import Loading from '../../components/Loading';

interface Props {
	navigation: NavigationScreenProp<{}>;
}

const Wrapper = styled.View`
	flex: 1;
	align-items: center;
	justify-content: flex-start;
	background-color: #fff;
`;
const TextWelcome = styled.Text`
	font-size: 30;
	color: red;
	position: absolute;
	top: 50%;
	margin-bottom: 50%;
	letter-spacing: 5;
	margin-horizontal: 20;
	flex-wrap: wrap;
`;
const TextButton = styled.Text`
	font-size: 14;
	color: white;
`;
const ViewButton = styled.View`
	width: 100%;
	height: 300;
	align-items: center;
	justify-content: space-around;
`;

export default function Dashboard({ navigation }: Props) {
	const [ loading, setLoading ] = useState(true);
	setTimeout(function() {
		setLoading(false);
	}, 1000);
	return (
		<Wrapper>
			{loading ? (
				<Loading />
			) : (
				<React.Fragment>
					<TextWelcome>Bem vindo</TextWelcome>
					<Animation />
					<ViewButton>
						<Button onPress={() => navigation.navigate('UserList')}>
							<TextButton>Lista de usuários</TextButton>
						</Button>
						<Button onPress={() => navigation.navigate('ProductList')}>
							<TextButton>Lista de produtos</TextButton>
						</Button>
						<Button onPress={() => navigation.navigate('ProductCreate')}>
							<TextButton>Cadastro de produtos</TextButton>
						</Button>
						<Button onPress={() => navigation.navigate('Login')}>
							<TextButton>Logout</TextButton>
						</Button>
					</ViewButton>
				</React.Fragment>
			)}
		</Wrapper>
	);
}
