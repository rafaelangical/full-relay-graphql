import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import styled from 'styled-components';

import Button from '../../components/Button';

import { NavigationScreenProp } from 'react-navigation';
import Animation from './Animation';
import Loading from '../../components/Loading';

interface Props {
	navigation: NavigationScreenProp<{}>;
}

const Wrapper = styled.View`
	flex: 1;
	align-items: center;
	justify-content: flex-start;
	background-color: #fff;
`;
const TextWelcome = styled.Text`
	font-size: 30;
	color: red;
	position: absolute;
	top: 50%;
	letter-spacing: 5;
	margin-horizontal: 20;
`;
const TextButton = styled.Text`
	font-size: 14;
	color: white;
`;
const ViewButton = styled.View`
	width: 100%;
	height: 220;
	align-items: center;
	justify-content: space-around;
	margin-bottom: 23;
`;

export default function Dashboard({ navigation }: Props) {
	const [ loading, setLoading ] = useState(true);
	setTimeout(function() {
		setLoading(false);
	}, 500);
	const logout = async () => {
		try {
			await AsyncStorage.removeItem('TOKEN');
			return navigation.navigate('Login');
		} catch (exception) {
			return false;
		}
	};
	return (
		<Wrapper>
			{loading ? (
				<Loading />
			) : (
				<React.Fragment>
					<TextWelcome>Welcome</TextWelcome>
					<Animation />
					<ViewButton>
						<Button onPress={() => navigation.navigate('TaskList')}>
							<TextButton>List of Tasks</TextButton>
						</Button>
						<Button onPress={() => navigation.navigate('TaskCreate')}>
							<TextButton>Add Task</TextButton>
						</Button>
						<Button onPress={() => logout()}>
							<TextButton>Logout</TextButton>
						</Button>
					</ViewButton>
				</React.Fragment>
			)}
		</Wrapper>
	);
}
