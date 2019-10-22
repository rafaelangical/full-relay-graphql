import React, { Component } from 'react';
import { View, Text } from 'react-native';
import BarcodeScan from './components/BarcodeScan';

export default class Me extends Component<any> {
	render() {
		return (
			<View>
				<BarcodeScan />
			</View>
		);
	}
}
