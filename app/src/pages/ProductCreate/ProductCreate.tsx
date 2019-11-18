import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AsyncStorage, Alert, Dimensions } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import Button from '../../components/Button';
import Input from '../../components/Input';

import ProductRegisterMutation from './Mutation/ProductRegisterMutation';
import { ProductRegisterMutationResponse } from './Mutation/__generated__/ProductRegisterMutation.graphql';

const { width, height } = Dimensions.get('window');
const Wrapper = styled.View`
	flex: 1;
	align-items: center;
	background-color: #fff;
`;
const TextProducts = styled.Text`
	color: #33334f;
	letter-spacing: 1;
	font-weight: bold;
	font-size: 28px;
`;
const TextProductsComtainer = styled.View`
	width: ${width};
	height: ${height * 0.1};
	background-color: #eee;
	align-items: center;
	justify-content: center;
	margin-bottom: 20;
`;
const TextButtons = styled.Text`
	color: #fff;
	fontSize: 24;
	font-weight: bold;
`;
const ViewButtons = styled.View`
	width: 100%;
	height: ${height * 0.3}
	justify-content: space-around;
	align-items: center;
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
			if (!response.ProductRegister) return;

			const { error } = response.ProductRegister;

			console.warn(error);
			error && Alert.alert(error);

			navigation.navigate('ProductList');
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
			<TextProductsComtainer>
				<TextProducts>Cadastro de Produtos</TextProducts>
			</TextProductsComtainer>
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
			<ViewButtons>
				<Button onPress={() => handleRegister()}>
					<TextButtons>Cadastrar</TextButtons>
				</Button>
				<Button onPress={() => navigation.navigate('ProductList')}>
					<TextButtons>Lista de Produtos</TextButtons>
				</Button>
				<Button onPress={() => navigation.navigate('Dashboard')}>
					<TextButtons>Dashboard</TextButtons>
				</Button>
			</ViewButtons>
		</Wrapper>
	);
}

export default ProductCreate;
