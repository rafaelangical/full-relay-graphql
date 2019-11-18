import React from 'react';
import { SafeAreaView } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Animation() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<LottieView resizeMode="contain" autoSize source={require('./Animationwitch.json')} autoPlay loop />
		</SafeAreaView>
	);
}
