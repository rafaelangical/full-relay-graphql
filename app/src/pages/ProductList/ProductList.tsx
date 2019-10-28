import React, { useEffect } from 'react';
import styled from 'styled-components';
import { AsyncStorage, Text, ScrollView, FlatList, StyleSheet, Dimensions, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { createPaginationContainer, graphql, RelayPaginationProp } from 'react-relay';
import { createQueryRendererModern } from '../../relay';

import { ProductList_query } from './__generated__/ProductList_query.graphql';

import Button from '../../components/Button';
import Input from '../../components/Input';

const { width, height } = Dimensions.get('window');

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
	border-top-left-radius: 25;
	border-top-right-radius: 100;
	border-bottom-right-radius: 25;
	border-bottom-left-radius: 100;
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
interface RelayProps {
	query: ProductList_query;
	relay: RelayPaginationProp;
}

type Props = RelayProps & ProductListProps;

function ProductList({ navigation, query, relay }: Props) {
	useEffect(() => {
		const token = AsyncStorage.getItem('TOKEN', null);
		if (token === null) {
			navigation.navigate('Login');
		}
	}, []);

	const { products } = query;

	const onEndReached = () => {
		if (!relay.hasMore() || relay.isLoading()) {
			return;
		}

		// fetch more 2
		relay.loadMore(2, (err) => {
			console.log('loadMore: ', err);
		});
	};

	const renderItem = ({ item }) => {
		const { node } = item;

		return (
			<CardProduct onPress={() => alert(node.id)}>
				<ProductName>{node.name}</ProductName>
			</CardProduct>
		);
	};
	return (
		<Wrapper>
			<Title>Lista de Produtos</Title>
			<FlatList
				style={{ flex: 1, width: width }}
				data={products && products.edges}
				renderItem={renderItem}
				keyExtractor={(item) => item.node.id}
				onEndReached={onEndReached}
				//onRefresh={this.onRefresh}
				//refreshing={this.state.isFetchingTop}
				ItemSeparatorComponent={() => <View style={styles.separator} />}
				//ListFooterComponent={this.renderFooter}
			/>
			<Button onPress={() => navigation.navigate('ProductCreate')}>
				<ButtonTextAdd>Cadastrar novo produto</ButtonTextAdd>
			</Button>
		</Wrapper>
	);
}

const UserListPaginationContainer = createPaginationContainer(
	ProductList,
	{
		query: graphql`
			fragment ProductList_query on Query {
				products(first: $count, after: $cursor) @connection(key: "ProductList_products") {
					pageInfo {
						hasNextPage
						endCursor
					}
					edges {
						node {
							id
							_id
							name
							barcode
							description
							qtd
							price
						}
					}
				}
			}
		`
	},
	{
		direction: 'forward',
		getConnectionFromProps(props) {
			return props.query && props.query.products;
		},
		getFragmentVariables(prevVars, totalCount) {
			return {
				...prevVars,
				count: totalCount
			};
		},
		getVariables(props, { count, cursor }, fragmentVariables) {
			return {
				count,
				cursor
			};
		},
		variables: { cursor: null },
		query: graphql`
			query ProductListPaginationQuery($count: Int!, $cursor: String) {
				...ProductList_query
			}
		`
	}
);

export default createQueryRendererModern(UserListPaginationContainer, ProductList, {
	query: graphql`
		query ProductListQuery($count: Int!, $cursor: String) {
			...ProductList_query
		}
	`,
	variables: { cursor: null, count: 1 }
});

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	separator: {
		height: 10
	},
	productContainer: {
		flex: 1
	}
});
