import React from 'react';
import { SafeAreaView } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Loading() {
	return (
		<SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', position: 'absolute', left: 0, right: 0, bottom: 0, top: 0 }}>
			<LottieView resizeMode="contain" autoSize source={require('./loading.json')} autoPlay loop />
		</SafeAreaView>
	);
}
