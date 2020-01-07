import React from 'react';
import { Dimensions, Image } from 'react-native';
import styled from 'styled-components';

import Button from '../../components/Button';

import { NavigationScreenProp } from 'react-navigation';
import { graphql, createFragmentContainer } from 'react-relay';
import { createQueryRendererModern } from '../../relay';

import { UserDetail_query } from './__generated__/UserDetail_query.graphql';
import { withNavigation } from 'react-navigation';

interface Props {
	navigation: NavigationScreenProp<{}>;
	query: UserDetail_query;
}
const { width, height } = Dimensions.get('window');

const Wrapper = styled.View`
	flex: 1;
	align-items: center;
	justify-content: flex-start;
`;
const TextProfile = styled.Text`
	color: #33334f;
	letter-spacing: 1;
	font-weight: bold;
	font-size: 28px;
`;
const UserTextContainer = styled.View`
	width: ${width};
	height: ${height * 0.2};
	justify-content: center;
	align-items: center;
	background-color: #eee;
`;
const ViewButton = styled.View`
	width: ${width};
	height: ${height * 0.4};
	justify-content: space-between;
	align-items: center;
`;
const TextButtons = styled.Text`
	color: #fff;
	font-size: 24;
	font-weight: bold;
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

function UserDetail({ navigation, query }: Props) {
	const { user } = query;
	return (
		<Wrapper>
			<UserTextContainer>
				<TextProfile>Olá, {user.name}</TextProfile>
				<TextProfile>{user.email}</TextProfile>
			</UserTextContainer>
			<ViewButton>
				<Button onPress={() => navigation.navigate('TaskList')}>
					<TextButtons>List of Products</TextButtons>
				</Button>
				<Button onPress={() => navigation.navigate('TaskCreate')}>
					<TextButtons>Add products</TextButtons>
				</Button>
				<Button onPress={() => navigation.navigate('Dashboard')}>
					<TextButtons>Main</TextButtons>
				</Button>
			</ViewButton>
			<ButtonAddNewTask onPress={() => navigation.navigate('TaskCreate')}>
				<Image source={require('../../../src/assets/imgs/add.png')} width={35} height={35} />
			</ButtonAddNewTask>
		</Wrapper>
	);
}
// UserDetailFragmentContainer
const UserDetailFragmentContainer = createFragmentContainer(UserDetail, {
	query: graphql`
		fragment UserDetail_query on Query {
			user(id: $id) {
				_id
				id
				name
				email
			}
		}
	`
});

export default withNavigation(
	createQueryRendererModern(UserDetailFragmentContainer, UserDetail, {
		query: graphql`
			query UserDetailQuery($id: ID!) {
				...UserDetail_query
			}
		`,
		queriesParams: ({ navigation }) => ({ id: navigation.state.params.id })
	})
);
