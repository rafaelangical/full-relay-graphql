import React, { useState } from 'react';
import styled from 'styled-components';
import { AsyncStorage, Alert } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import Button from '../../components/Button';
import Input from '../../components/Input';

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
	const [ name, setName ] = useState('');
	const [ barcode, setBarcode ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ price, setPrice ] = useState(0);
	const [ qtd, setQtd ] = useState('');
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
			<Input name="qtd" placeholder="Quantidade" value={qtd} onChangeText={(value: any) => setQtd(value)} />
			<Input name="price" placeholder="Preço" value={price} onChangeText={(value: any) => setPrice(value)} />

			<Button>
				<ButtonTextAdd>Cadastrar</ButtonTextAdd>
			</Button>

			<Button>
				<ButtonTextList onPress={() => navigation.navigate('ProductList')}>Lista de Produtos</ButtonTextList>
			</Button>
		</Wrapper>
	);
}

export default ProductCreate;
