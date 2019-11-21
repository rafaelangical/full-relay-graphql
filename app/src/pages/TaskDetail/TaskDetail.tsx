import React from 'react';
import { Dimensions, Image } from 'react-native';
import styled from 'styled-components';

import { NavigationScreenProp } from 'react-navigation';
import { graphql, createFragmentContainer, QueryRenderer } from 'react-relay';
import { createQueryRendererModern } from '../../relay';

import { TaskDetail_query } from './__generated__/TaskDetail_query.graphql';
import { withNavigation } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {
	navigation: NavigationScreenProp<{}>;
	query: TaskDetail_query;
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
const TitleProduct = styled.Text`
	font-size: 28;
	color: #fff;
	margin-top: 26;
	font-weight: bold;
	align-self: flex-start;
	padding-horizontal: 20;
`;
const TextTaskDesc = styled.Text`
	color: #fff;
	font-size: 14px;
	margin-top: 47;
	font-weight: 500;
	padding-horizontal: 20;
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
const ButtonReturnTask = styled.TouchableOpacity`
	height: 70;
	width: 70;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #33334f;
	position: absolute;
	bottom: 23;
	right: 95;
	border-radius: 60;
`;

function TaskDetail({ navigation, query }: Props) {
	const { task } = query;
	return (
		<Wrapper>
			<TitleProduct>{task.name}</TitleProduct>
			<ScrollView style={{ flex: 1 }}>
				<TextTaskDesc>{task.description}</TextTaskDesc>
			</ScrollView>
			<ButtonAddNewTask onPress={() => navigation.navigate('TaskCreate')}>
				<Image source={require('../../../src/assets/imgs/add.png')} width={35} height={35} />
			</ButtonAddNewTask>
			<ButtonReturnTask onPress={() => navigation.navigate('Dashboard')}>
				<Image source={require('../../../src/assets/imgs/home.png')} style={{ width: 35, height: 35 }} />
			</ButtonReturnTask>
		</Wrapper>
	);
}
// TaskDetailFragmentContainer
const TaskDetailFragmentContainer = createFragmentContainer(TaskDetail, {
	query: graphql`
		fragment TaskDetail_query on Query {
			task(id: $id) {
				id
				_id
				name
				description
			}
		}
	`
});

export default withNavigation(
	createQueryRendererModern(TaskDetailFragmentContainer, TaskDetail, {
		query: graphql`
			query TaskDetailQuery($id: ID!) {
				...TaskDetail_query
			}
		`,
		queriesParams: ({ navigation }) => ({ id: navigation.state.params.id })
	})
);
