import React, { useState } from 'react';
import { View, Text, AsyncStorage, Alert, Dimensions } from 'react-native';
import styled from 'styled-components';

import Button from '../../components/Button';

import { NavigationScreenProp } from 'react-navigation';
import { graphql, createFragmentContainer, QueryRenderer } from 'react-relay';
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
	fontSize: 24;
	font-weight: bold;
`;

function UserDetail({ navigation, query }: Props) {
	const { user } = query;
	return (
		<Wrapper>
			<UserTextContainer>
				<TextProfile>Olá, {user.name}</TextProfile>
			</UserTextContainer>
			<ViewButton>
				<Button onPress={() => navigation.navigate('UserList')}>
					<TextButtons>Lista de usuários</TextButtons>
				</Button>
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
