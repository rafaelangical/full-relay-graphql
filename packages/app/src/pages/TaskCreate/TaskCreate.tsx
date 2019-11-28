import React, { useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { Alert, Dimensions, Text } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

import Button from '../../components/Button';
import Input from '../../components/Input';

import TaskRegisterMutation from './Mutation/TaskRegisterMutation';
import { TaskRegisterMutationResponse } from './Mutation/__generated__/TaskRegisterMutation.graphql';
import TextArea from '../../components/TextArea';
import { Formik } from 'formik';
import * as yup from 'yup';

const { width, height } = Dimensions.get('window');
const Wrapper = styled.View`
	flex: 1;
	align-items: center;
	background-color: #fff;
`;
const TextButtons = styled.Text`
	color: #fff;
	fontSize: 24;
	font-weight: bold;
`;
const ViewButtons = styled.View`
	width: 100%;
	position: absolute;
	bottom: 23;
	height: ${height * 0.2}
	justify-content: flex-end;
	align-items: center;
`;
const TitleNewTask = styled.Text`
	font-size: 28;
	color: #33334f;
	margin-top: 26;
	font-weight: bold;
	align-self: flex-start;
	padding-horizontal: 20;
`;
const TitleSubTask = styled.Text`
	font-size: 14;
	color: #33334f;
	margin-top: 6;
	margin-bottom: 15;
	font-weight: 500;
	align-self: flex-start;
	padding-horizontal: 20;
`;

export interface TaskRegisterProps {
	navigation: NavigationScreenProp<{}>;
}

function TaskCreate({ navigation }: TaskRegisterProps) {
	function handleRegister(values) {
		const onCompleted = (response: TaskRegisterMutationResponse) => {
			console.warn('oncompleted create product');
			if (!response.TaskRegister) return;

			const { error } = response.TaskRegister;

			console.warn(error);
			error && Alert.alert(error);

			navigation.navigate('TaskList');
		};

		const onError = (err) => {
			Alert.alert(err);
			console.warn('create product error');
			console.log('onError' + err);
		};

		TaskRegisterMutation.commit(values, onCompleted, onError);
	}

	return (
		<Wrapper>
			<TitleNewTask>New task</TitleNewTask>
			<TitleSubTask>What do you want to do? 🤔</TitleSubTask>
			<Formik
				initialValues={{ name: '', description: '' }}
				onSubmit={(values) => handleRegister(values)}
				validationSchema={yup.object().shape({
					name: yup.string().min(4).required(),
					description: yup.string().min(6).required()
				})}
			>
				{({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
					<Fragment>
						{touched.name &&
						errors.name && <Text style={{ fontSize: 14, color: 'red' }}>{errors.name}</Text>}
						<Input
							value={values.name}
							onChangeText={handleChange('name')}
							onBlur={() => setFieldTouched('name')}
							placeholder="name"
						/>
						{touched.description &&
						errors.description && <Text style={{ fontSize: 14, color: 'red' }}>{errors.description}</Text>}
						<TextArea
							value={values.description}
							onChangeText={handleChange('description')}
							placeholder="description"
							onBlur={() => setFieldTouched('description')}
						/>
						<ViewButtons>
							<Button onPress={handleSubmit}>
								<TextButtons>Add</TextButtons>
							</Button>
						</ViewButtons>
					</Fragment>
				)}
			</Formik>
		</Wrapper>
	);
}

export default TaskCreate;
