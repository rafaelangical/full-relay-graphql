//@flow
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.TouchableOpacity`
	justify-content: center;
	align-items: center;
	width: 386;
	height: 67;
	border-radius: 5;
	background-color: rgba(30, 179, 107, 0.85) 100%);
	border-width: 1;
  border-radius: 2;
  border-color: rgba(30, 179, 107, 0.68);
	border-top-width: 0;
  shadow-color: #1eb36b;
  shadow-offset: {width: 0, height: 50};
  shadow-opacity: 0.3;
`;

type Props = {
  onPress?: (string) => void;
  style?: object;
  children?: Node;
};

const Button = (props: Props) => (
  <Wrapper onPress={() => props.onPress()}>{props.children}</Wrapper>
);

export default Button;
