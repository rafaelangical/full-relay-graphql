import React, { useState } from 'react';
import { View, Text, AsyncStorage, Alert, Dimensions } from 'react-native';
import styled from 'styled-components';

import Button from '../../components/Button';

import { NavigationScreenProp } from 'react-navigation';
import { graphql, createFragmentContainer, QueryRenderer } from 'react-relay';
import { createQueryRendererModern } from '../../relay';

import { ProductDetail_query } from './__generated__/ProductDetail_query.graphql';
import { ProductDetail_me } from './__generated__/ProductDetail_me.graphql';
import { withNavigation } from 'react-navigation';

interface Props {
	navigation: NavigationScreenProp<{}>;
	query: ProductDetail_query;
	me: ProductDetail_me;
}
const { width, height } = Dimensions.get('window');

const Wrapper = styled.View`
	flex: 1;
	align-items: flex-start;
	justify-content: flex-start;
	width: ${width};
	height: ${height};
	margin: 0 auto;
	background-color: #1eb36b;
`;
const TextScreenDesc = styled.Text`
	color: #33334f;
	letter-spacing: 1;
	font-weight: bold;
	font-size: 24px;
	margin-top: 10;
`;
const TextProductName = styled.Text`
	color: #33334f;
	letter-spacing: 1;
	font-weight: bold;
	font-size: 24px;
	margin-top: 10;
`;
const TextProductDesc = styled.Text`
	color: #33334f;
	letter-spacing: 1;
	font-weight: bold;
	font-size: 24px;
	margin-top: 10;
`;
const TextProductBar = styled.Text`
	color: #33334f;
	letter-spacing: 1;
	font-weight: bold;
	font-size: 24px;
	margin-top: 10;
`;
const TextProductPrice = styled.Text`
	color: #33334f;
	letter-spacing: 1;
	font-weight: bold;
	font-size: 24px;
	margin-top: 10;
`;
const TextProductQtd = styled.Text`
	color: #33334f;
	letter-spacing: 1;
	font-weight: bold;
	font-size: 24px;
	margin-top: 10;
`;
const ProductTextContainer = styled.View`
	width: 100%;
	height: 50%;
	padding-horizontal: 20;
	padding-top: 50;
	justify-content: flex-start;
	align-items: flex-start;
	background-color: #1eb36b;
`;
const ViewButton = styled.View`
	width: ${width};
	height: 210;
	border: 1px solid black;
	justify-content: space-around;
	align-items: center;
`;
const TextButtons = styled.Text`
	color: #fff;
	fontSize: 24;
	font-weight: bold;
`;
const TextSpan = styled.Text`
	color: #fff;
	fontSize: 24;
	font-weight: bold;
`;

function ProductDetail({ navigation, query }: Props) {
	console.warn(navigation.state.params.id);
	const { product, me } = query;
	console.warn(me);
	return (
		<Wrapper>
			<ProductTextContainer>
				<TextProductName>
					Produto: <TextSpan>{product.name}</TextSpan>
				</TextProductName>
				<TextProductDesc>
					Descrição: <TextSpan>{product.description}</TextSpan>
				</TextProductDesc>
				<TextProductBar>
					Barcode: <TextSpan>{product.barcode}</TextSpan>
				</TextProductBar>
				<TextProductPrice>
					Valor: R$ <TextSpan>{product.price}</TextSpan>
				</TextProductPrice>
				<TextProductQtd>
					Qauantidade: <TextSpan>{product.qtd}</TextSpan>
				</TextProductQtd>
			</ProductTextContainer>
			<ViewButton>
				<Button onPress={() => navigation.navigate('ProductList')}>
					<TextButtons>Lista de produtos</TextButtons>
				</Button>
				<Button onPress={() => navigation.navigate('ProductCreate')}>
					<TextButtons>Cadastro de produtos</TextButtons>
				</Button>
				<Button onPress={() => navigation.navigate('Dashboard')}>
					<TextButtons>Dashboard</TextButtons>
				</Button>
			</ViewButton>
		</Wrapper>
	);
}
// ProductDetailFragmentContainer
const ProductDetailFragmentContainer = createFragmentContainer(ProductDetail, {
	query: graphql`
		fragment ProductDetail_query on Query {
			product(id: $id) {
				id
				_id
				name
				description
				barcode
				price
				qtd
			}
		}
	`,
	me: graphql`
		fragment ProductDetail_me on Query {
			me {
				id
				name
			}
		}
	`
});

export default withNavigation(
	createQueryRendererModern(ProductDetailFragmentContainer, ProductDetail, {
		query: graphql`
			query ProductDetailQuery($id: ID!) {
				...ProductDetail_query
				...ProductDetail_me
			}
		`,
		queriesParams: ({ navigation }) => ({ id: navigation.state.params.id })
	})
);
