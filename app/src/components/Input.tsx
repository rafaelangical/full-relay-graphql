import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.View`
	width: 386;
	height: 67;
	border-bottom-color: #eee;
	border-bottom-width: 1;
	margin-bottom: 20px;
	padding-horizontal: 10;
	background: #eee;
	justify-content: center;
	line-height: 24;
	border-radius: 5;
	font-size: 22;
`;

const RegisterTextInput = styled.TextInput`
	height: 40;
	width: 100%;
`;

type Props = {
	name?: string;
	placeholder?: string;
	value?: string;
	onChangeText?: (string) => void;
	secureTextEntry?: boolean;
};

const Input = (props: Props) => (
	<InputWrapper>
		<RegisterTextInput {...props} />
	</InputWrapper>
);

export default Input;
