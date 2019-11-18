import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, FlatList, AsyncStorage, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';
import { NavigationScreenProp } from 'react-navigation';
import { createPaginationContainer, graphql, RelayPaginationProp } from 'react-relay';
import { createQueryRendererModern } from '../../relay';

import { UserList_query } from './__generated__/UserList_query.graphql';
import styled from 'styled-components';

const { width, height } = Dimensions.get('window');
const CardUser = styled.TouchableHighlight`
	width: 386;
	height: 85;
	justify-content: center;
	align-items: center;
	background-color: #1eb36b;
	margin-top: 20;
`;
const TextUserName = styled.Text`
	font-size: 20;
	color: #fff;
`;
const UserTextContainer = styled.View`
	width: ${width};
	height: 100;
	justify-content: center;
	align-items: center;
	background-color: #eee;
`;
const TextUserList = styled.Text`
	font-size: 24;
	color: #33334f;
`;
export interface ProductListProps {
	navigation: NavigationScreenProp<{}>;
}
interface RelayProps {
	query: UserList_query;
	relay: RelayPaginationProp;
}
type Props = RelayProps & ProductListProps;

function UserList({ navigation, query, relay }: Props) {
	const { users } = query;
	const [ isFetchingTop, setIsFetchingTop ] = useState(false);
	const onRefresh = () => {
		const { users } = query;

		if (relay.isLoading()) {
			return;
		}

		setIsFetchingTop(true);

		relay.refetchConnection(users.edges.length, (err) => {
			setIsFetchingTop(false);
		});
	};

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
			<CardUser onPress={() => goToUserDetail(node)} underlayColor="whitesmoke">
				<TextUserName>{node.name}</TextUserName>
			</CardUser>
		);
	};

	const goToUserDetail = (user) => {
		const { navigate } = navigation;
		navigate('UserDetail', { id: user.id });
	};
	return (
		<View style={styles.container}>
			<UserTextContainer>
				<TextUserList>Lista de usuários</TextUserList>
			</UserTextContainer>
			<FlatList
				style={{ flex: 1 }}
				data={users && users.edges}
				renderItem={renderItem}
				keyExtractor={(item) => item.node.id}
				onEndReached={onEndReached}
				onRefresh={onRefresh}
				refreshing={isFetchingTop}
				// ListFooterComponent={renderFooter}
			/>
		</View>
	);
}

const UserListPaginationContainer = createPaginationContainer(
	UserList,
	{
		query: graphql`
			fragment UserList_query on Query {
				users(first: $count, after: $cursor) @connection(key: "UserList_users") {
					pageInfo {
						hasNextPage
						endCursor
					}
					edges {
						node {
							id
							name
						}
					}
				}
			}
		`
	},
	{
		direction: 'forward',
		getConnectionFromProps(props) {
			return props.query && props.query.users;
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
			query UserListPaginationQuery($count: Int!, $cursor: String) {
				...UserList_query
			}
		`
	}
);

export default createQueryRendererModern(UserListPaginationContainer, UserList, {
	query: graphql`
		query UserListQuery($count: Int!, $cursor: String) {
			...UserList_query
		}
	`,
	variables: { cursor: null, count: 1 }
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	separator: {
		height: 1,
		backgroundColor: '#FF4'
	}
});
