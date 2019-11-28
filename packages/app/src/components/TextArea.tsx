import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.View`
	width: 386;
	height: 231;
	border: 1px solid #eee;
	padding-horizontal: 10;
	background: #eee;
	justify-content: center;
	line-height: 24;
	border-radius: 5;
	font-size: 22;
`;

const TextInput = styled.TextInput`
	height: 100%;
	width: 100%;
`;

type Props = {
	name?: string;
	placeholder?: string;
	value?: string;
	onChangeText?: (string) => void;
	secureTextEntry?: boolean;
	textAlignVertical?: string;
	onBlur?: (string) => void;
};

const TextArea = (props: Props) => (
	<InputWrapper>
		<TextInput {...props} />
	</InputWrapper>
);

export default TextArea;
