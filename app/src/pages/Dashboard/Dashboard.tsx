import React, { useState } from 'react';
import { View, Text, AsyncStorage, Alert } from 'react-native';
import styled from 'styled-components';

import Button from '../../components/Button';

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

export default function Dashboard({ navigation }: Props) {
	return (
		<Wrapper>
			<TextWelcome>Bem vindo</TextWelcome>
			<ViewButton>
				<Button onPress={() => navigation.navigate('UserList')}>
					<Text>Lista de usuários</Text>
				</Button>
				<Button onPress={() => navigation.navigate('ProductList')}>
					<Text>Lista de produtos</Text>
				</Button>
				<Button onPress={() => navigation.navigate('ProductCreate')}>
					<Text>Cadastro de produtos</Text>
				</Button>
			</ViewButton>
		</Wrapper>
	);
}
