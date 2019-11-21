import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Alert } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

import Button from '../../components/Button';
import Input from '../../components/Input';

import ProductRegisterMutation from './Mutation/ProductRegisterMutation';
import { ProductRegisterMutationResponse } from './Mutation/__generated__/ProductRegisterMutation.graphql';

const Wrapper = styled.View`
	flex: 1;
	align-items: center;
`;

const ButtonTextList = styled.Text`
	color: darkred;
	font-weight: 500;
	font-size: 16;
`;
const ButtonTextAdd = styled.Text`
	color: darkblue;
	font-weight: 500;
	font-size: 16;
`;
const Title = styled.Text`
	font-size: 25;
	color: darkblue;
	margin-top: 30;
	margin-bottom: 30;
`;
export interface ProductRegisterProps {
	navigation: NavigationScreenProp<{}>;
}

function ProductCreate({ navigation }: ProductRegisterProps) {
	useEffect(() => {
		const token = AsyncStorage.getItem('TOKEN', null);
		if (token === null) {
			navigation.navigate('Login');
		}
	}, []);
	const [ name, setName ] = useState('');
	const [ barcode, setBarcode ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ price, setPrice ] = useState(0);
	const [ qtd, setQtd ] = useState('');

	function handleRegister() {
		console.warn('create user');
		const input = {
			name,
			description,
			barcode,
			price,
			qtd
		};

		const onCompleted = (response: ProductRegisterMutationResponse) => {
			console.warn('oncompleted create product');
			console.log('onCompleted');
			if (!response.ProductRegister) return;

			const { error } = response.ProductRegister;

			console.warn(error);
			error && Alert.alert(error);

			navigation.navigate('ProductList');
			//console.warn(token);
		};

		const onError = (err) => {
			Alert.alert(err);
			console.warn('create product error');
			console.log('onError' + err);
		};

		ProductRegisterMutation.commit(input, onCompleted, onError);
	}

	return (
		<Wrapper>
			<Title>Cadastro de Produtos</Title>
			<Input
				name="name"
				placeholder="Nome do produto"
				value={name}
				onChangeText={(value: any) => setName(value)}
			/>
			<Input
				name="barcode"
				placeholder="Código de barras"
				value={barcode}
				onChangeText={(value: any) => setBarcode(value)}
			/>
			<Input
				name="description"
				placeholder="Descricao"
				value={description}
				onChangeText={(value: any) => setDescription(value)}
			/>
			<Input
				name="qtd"
				placeholder="Quantidade"
				value={qtd}
				onChangeText={(value: any) => setQtd(Number(value))}
			/>
			<Input
				name="price"
				placeholder="Preço"
				value={price}
				onChangeText={(value: any) => setPrice(Number(value))}
			/>

			<Button onPress={() => handleRegister()}>
				<ButtonTextAdd>Cadastrar</ButtonTextAdd>
			</Button>

			<Button>
				<ButtonTextList onPress={() => navigation.navigate('ProductList')}>Lista de Produtos</ButtonTextList>
			</Button>
		</Wrapper>
	);
}

export default ProductCreate;
