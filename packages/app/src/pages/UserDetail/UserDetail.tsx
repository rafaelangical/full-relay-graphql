// import React, { useState } from 'react';
// import { View, Text, AsyncStorage, Alert } from 'react-native';
// import styled from 'styled-components';

// import Button from '../../components/Button';

// import { NavigationScreenProp } from 'react-navigation';
// import { graphql, createFragmentContainer, QueryRenderer } from 'react-relay';
// import { createQueryRendererModern } from '../../relay';

// import { UserDetail_query } from '../../__generated__/UserDetail_query.graphql';
// import { withNavigation } from 'react-navigation';

// interface Props {
// 	navigation: NavigationScreenProp<{}>;
// 	query: UserDetail_query;
// }

// const Wrapper = styled.View`
// 	flex: 1;
// 	align-items: center;
// 	justify-content: flex-end;
// `;
// const TextWelcome = styled.Text`
// 	font-size: 30;
// 	color: red;
// 	position: absolute;
// 	top: 30%;
// 	margin-bottom: 50%;
// `;
// const TextProfile = styled.Text`
// 	font-size: 35;
// 	color: darkblue;
// 	top: 20%;
// 	position: absolute;
// 	margin-bottom: 50%;
// 	letter-spacing: 10;
// `;
// const ViewButton = styled.View`
// 	width: 100%;
// 	height: 50%;
// 	align-self: flex-end;
// `;

// function UserDetail({ navigation, query }: Props) {
// 	const { user } = query;
// 	return (
// 		<Wrapper>
// 			<TextProfile>Perfil</TextProfile>
// 			<TextWelcome>Olá {user.name}</TextWelcome>
// 			<ViewButton>
// 				<Button onPress={() => navigation.navigate('UserList')}>
// 					<Text>Lista de usuários</Text>
// 				</Button>
// 				<Button onPress={() => navigation.navigate('ProductList')}>
// 					<Text>Lista de produtos</Text>
// 				</Button>
// 				<Button onPress={() => navigation.navigate('ProductCreate')}>
// 					<Text>Cadastro de produtos</Text>
// 				</Button>
// 				<Button onPress={() => navigation.navigate('Dashboard')}>
// 					<Text>Dashboard</Text>
// 				</Button>
// 			</ViewButton>
// 		</Wrapper>
// 	);
// }
// // UserDetailFragmentContainer
// const UserDetailFragmentContainer = createFragmentContainer(UserDetail, {
// 	query: graphql`
// 		fragment UserDetail_query on Query {
// 			user(id: $id) {
// 				id
// 				name
// 				email
// 			}
// 		}
// 	`
// });

// export default withNavigation(
// 	createQueryRendererModern(UserDetailFragmentContainer, UserDetail, {
// 		query: graphql`
// 			query UserDetailQuery($id: ID!) {
// 				...UserDetail_query
// 			}
// 		`,
// 		queriesParams: ({ navigation }) => ({ id: navigation.state.params.id })
// 	})
// );
