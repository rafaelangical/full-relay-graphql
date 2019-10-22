import React, { useState } from 'react';
import styled from 'styled-components';
import { AsyncStorage, Alert, ScrollView } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import Button from '../../components/Button';
import Input from '../../components/Input';

const Wrapper = styled.View`
	flex: 1;
	align-items: center;
	padding-bottom: 10;
`;
const CardProduct = styled.TouchableOpacity`
	height: 100;
	width: 80%;
	margin: 0 auto;
	flex-direction: column;
	margin-bottom: 10;
	justify-content: center;
	align-items: center;
	border: 1px solid red;
`;
const ProductName = styled.Text`
	color: darkblue;
	font-size: 14;
`;
const ProductPrice = styled.Text`
	color: darkred;
	margin-top: 5;
	font-size: 14;
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
export interface ProductListProps {
	navigation: NavigationScreenProp<{}>;
}

function ProductList({ navigation }: ProductListProps) {
	return (
		<Wrapper>
			<Title>Lista de Produtos</Title>
			<ScrollView style={{ flex: 1, marginBottom: 20, width: '100%' }}>
				<CardProduct>
					<ProductName>Produto 01</ProductName>
					<ProductPrice>R$ 5,00</ProductPrice>
				</CardProduct>
				<CardProduct>
					<ProductName>Produto 01</ProductName>
					<ProductPrice>R$ 5,00</ProductPrice>
				</CardProduct>
				<CardProduct>
					<ProductName>Produto 01</ProductName>
					<ProductPrice>R$ 5,00</ProductPrice>
				</CardProduct>
				<CardProduct>
					<ProductName>Produto 01</ProductName>
					<ProductPrice>R$ 5,00</ProductPrice>
				</CardProduct>
				<CardProduct>
					<ProductName>Produto 01</ProductName>
					<ProductPrice>R$ 5,00</ProductPrice>
				</CardProduct>
				<CardProduct>
					<ProductName>Produto 01</ProductName>
					<ProductPrice>R$ 5,00</ProductPrice>
				</CardProduct>
				<CardProduct>
					<ProductName>Produto 01</ProductName>
					<ProductPrice>R$ 5,00</ProductPrice>
				</CardProduct>
				<CardProduct>
					<ProductName>Produto 01</ProductName>
					<ProductPrice>R$ 5,00</ProductPrice>
				</CardProduct>
				<CardProduct>
					<ProductName>Produto 01</ProductName>
					<ProductPrice>R$ 5,00</ProductPrice>
				</CardProduct>
				<CardProduct>
					<ProductName>Produto 01</ProductName>
					<ProductPrice>R$ 5,00</ProductPrice>
				</CardProduct>
			</ScrollView>
			<Button onPress={() => navigation.navigate('ProductCreate')}>
				<ButtonTextAdd>Cadastrar novo produto</ButtonTextAdd>
			</Button>
		</Wrapper>
	);
}

export default ProductList;
