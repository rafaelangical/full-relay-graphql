import React, { useState } from 'react';
import styled from 'styled-components';
import {
	AsyncStorage,
	Text,
	ScrollView,
	FlatList,
	StyleSheet,
	Dimensions,
	View,
	TouchableOpacity,
	Image
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { createPaginationContainer, graphql, RelayPaginationProp } from 'react-relay';
import { createQueryRendererModern } from '../../relay';
import { Searchbar } from 'react-native-paper';

import { TaskList_query } from './__generated__/TaskList_query.graphql';

import Button from '../../components/Button';
import Input from '../../components/Input';

const { width, height } = Dimensions.get('window');

const Wrapper = styled.View`
	flex: 1;
	align-items: center;
	padding-bottom: 10;
`;
const CardTask = styled.TouchableOpacity`
	height: 85;
	width: 386;
	margin: 0 auto;
	flex-direction: column;
	margin-bottom: 10;
	justify-content: center;
	align-items: flex-start;
	padding-horizontal: 20;
	background-color: #1eb36b;
	border: 1px solid #1eb36b;
	border-radius: 5;
`;
const ButtonAddNewTask = styled.TouchableOpacity`
	height: 70;
	width: 70;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #33334f;
	position: absolute;
	bottom: 23;
	right: 19;
	border-radius: 60;
`;
const ViewTopSearch = styled.View`
	width: ${width};
	height: 150;
	padding-horizontal: 20;
`;
const ProductName = styled.Text`
	color: #fff;
	font-size: 20;
`;
const ProductDescription = styled.Text`
	color: #fff;
	margin-top: 5;
	font-size: 12;
`;
const Title = styled.Text`
	font-size: 28;
	color: #33334f;
	margin-top: 26;
	font-weight: bold;
`;
const TitleSubTask = styled.Text`
	font-size: 14;
	color: #33334f;
	margin-top: 6;
	margin-bottom: 15;
	font-weight: 500;
`;
export interface TaskListProps {
	navigation: NavigationScreenProp<{}>;
}
interface RelayProps {
	query: TaskList_query;
	relay: RelayPaginationProp;
}

type Props = RelayProps & TaskListProps;

function TaskList({ navigation, query, relay }: Props) {
	const { tasks, me } = query;
	// console.warn(me);
	const [ isFetchingTop, setIsFetchingTop ] = useState(false);
	const [ search, setSearch ] = useState('');
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
			<CardTask onPress={() => goToProductDetail(node)}>
				<ProductName>{node.name}</ProductName>
				<ProductDescription>{node.description}</ProductDescription>
			</CardTask>
		);
	};
	const onRefresh = () => {
		const { tasks } = this.props.query;

		if (relay.isLoading()) {
			return;
		}

		setIsFetchingTop(true);

		relay.refetchConnection(tasks.edges.length, (err) => {
			setIsFetchingTop(false);
		});
	};
	const goToProductDetail = (product) => {
		navigation.navigate('TaskDetail', { id: product.id });
	};
	return (
		<Wrapper>
			<ViewTopSearch>
				<Title>Hello, {me.name}</Title>
				<TitleSubTask>Check your tasks 👇</TitleSubTask>
				<Searchbar
					placeholder="Search..."
					onChangeText={(query) => {
						setSearch(query);
					}}
					value={search}
					style={{ marginBottom: 20 }}
					icon={{
						source: { uri: 'https://avatars0.githubusercontent.com/u/17571969?v=3&s=400' },
						direction: 'rtl'
					}}
				/>
			</ViewTopSearch>
			<FlatList
				style={{ flex: 1, width: width }}
				data={tasks && tasks.edges}
				renderItem={renderItem}
				keyExtractor={(item) => item.node.id}
				onEndReached={onEndReached}
				onRefresh={onRefresh}
				refreshing={isFetchingTop}
				ItemSeparatorComponent={() => <View style={styles.separator} />}
				//ListFooterComponent={this.renderFooter}
			/>
			<ButtonAddNewTask onPress={() => navigation.navigate('TaskCreate')}>
				<Image source={require('../../../src/assets/imgs/add.png')} width={35} height={35} />
			</ButtonAddNewTask>
		</Wrapper>
	);
}

const TaskListPaginationContainer = createPaginationContainer(
	TaskList,
	{
		query: graphql`
			fragment TaskList_query on Query {
				tasks(first: $count, after: $cursor, search: $search) @connection(key: "TaskList_tasks") {
					pageInfo {
						hasNextPage
						endCursor
					}
					edges {
						node {
							id
							_id
							name
							description
						}
					}
				}
				me {
					id
					_id
					name
					email
					active
				}
			}
		`
	},
	{
		direction: 'forward',
		getConnectionFromProps(props) {
			return props.query && props.query.tasks;
		},
		getFragmentVariables(prevVars, totalCount) {
			return {
				...prevVars,
				count: totalCount
			};
		},
		getVariables(props, { count, cursor, search }, fragmentVariables) {
			return {
				count,
				cursor,
				search
			};
		},
		variables: { cursor: null },
		query: graphql`
			query TaskListPaginationQuery($count: Int!, $cursor: String, $search: String) {
				...TaskList_query
			}
		`
	}
);

export default createQueryRendererModern(TaskListPaginationContainer, TaskList, {
	query: graphql`
		query TaskListQuery($count: Int!, $cursor: String, $search: String) {
			...TaskList_query
		}
	`,
	variables: { cursor: null, count: 1, search: '' }
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
