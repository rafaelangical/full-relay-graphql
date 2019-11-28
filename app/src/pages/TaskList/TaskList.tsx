import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Text, FlatList, StyleSheet, Dimensions, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { graphql, RelayPaginationProp, createRefetchContainer } from 'react-relay';
import { createQueryRendererModern } from '../../relay';

import { TaskList_query } from './__generated__/TaskList_query.graphql';

import Loading from '../../components/Loading';
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
	margin-bottom: 10;
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
	// const [ isFetchingTop, setIsFetchingTop ] = useState(false);
	const [ search, setSearch ] = useState('');
	const [ data, setData ] = useState([]);
	const [ empty, setEmpty ] = useState(false);
	const [ loading, setLoading ] = useState(false);
	useEffect(
		() => {
			console.log('TASK_LIST: RE-RENDER');
			setData(tasks.edges);
		},
		// update state
		[ data ]
	);
	const onEndReached = async () => {
		console.log('onreached list ');
		if (!tasks.pageInfo.hasNextPage) return;

		const { endCursor } = tasks.pageInfo;

		const total = tasks.edges.length + 10;
		const refetchVariables = (fragmentVariables) => ({
			...fragmentVariables,
			count: 10,
			cursor: endCursor
		});
		const renderVariables = {
			count: total
		};
		// relay.refetch(refetchVariables, renderVariables);
		relay.refetch(
			refetchVariables,
			renderVariables,
			(error) => {
				error && console.log('onEndReached: ', error);
			},
			{
				force: false
			}
		);
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
	const onChangeInput = async (e) => {
		setSearch(e);
		e !== ''
			? relay.refetch(
					{ search: e },
					null, // 'WFazer'use the refetchVariables as renderVariables
					(err) => {
						err && console.log(err);
						console.log('Refetch done');
					},
					{ force: true } // Assuming we've configured a network layer cache, we want to ensure we fetch the latest data.
				) && setEmpty(false)
			: setEmpty(true);
	};
	const goToProductDetail = (product) => {
		navigation.navigate('TaskDetail', { id: product.id });
	};
	return (
		<Wrapper>
			<ViewTopSearch>
				<Title>Hello, {me.name}</Title>
				<TitleSubTask>Check your tasks 👇</TitleSubTask>
				<TextInput
					placeholder="Search..."
					onChangeText={(text) => {
						onChangeInput(text);
						console.log('onchage text');
					}}
					value={search}
					style={{
						marginBottom: 30,
						borderWidth: 2,
						borderColor: 'rgba(0,0,0,0.1)',
						borderRadius: 6,
						width: 386
					}}
				/>
			</ViewTopSearch>
			{/* {empty === false && tasks && tasks.edges.length === 0 && <Title>Empty</Title>} */}
			{loading && <Loading />}
			<View style={{ flex: 1 }}>
				<FlatList
					style={{ flex: 1 }}
					data={empty ? data : tasks && tasks.edges}
					renderItem={renderItem}
					keyExtractor={(item) => item.node.id}
					onEndReached={onEndReached}
					onEndReachedThreshold={0.5}
					ItemSeparatorComponent={() => <View style={styles.separator} />}
				/>
			</View>
			<ButtonAddNewTask onPress={() => navigation.navigate('TaskCreate')}>
				<Image source={require('../../../src/assets/imgs/add.png')} width={35} height={35} />
			</ButtonAddNewTask>
			<TouchableOpacity onPress={() => onEndReached()}>
				<Text>Ler mais</Text>
			</TouchableOpacity>
		</Wrapper>
	);
}
const TaskListRefetchContainer = createRefetchContainer(
	TaskList,
	{
		query: graphql`
			fragment TaskList_query on Query
				@argumentDefinitions(
					count: { type: "Int", defaultValue: 10 }
					cursor: { type: "String" }
					search: { type: "String", defaultValue: "" }
				) {
				tasks(first: $count, after: $cursor, search: $search)
					@connection(key: "TaskList_tasks", filters: ["search"]) {
					pageInfo {
						hasNextPage
						endCursor
					}
					edges {
						node {
							_id
							id
							name
							description
						}
					}
				}
				me {
					_id
					id
					name
				}
			}
		`
	},
	graphql`
		query TaskListRefetchContainerQuery($count: Int, $cursor: String, $search: String) {
			...TaskList_query @arguments(count: $count, cursor: $cursor, search: $search)
		}
	`
);

export default createQueryRendererModern(TaskListRefetchContainer, TaskList, {
	query: graphql`
		query TaskListQuery($count: Int!, $cursor: String, $search: String) {
			...TaskList_query
		}
	`,
	variables: { cursor: null, count: 10 }
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
