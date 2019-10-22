import React, { Component } from 'react';
import { Button, Text, View, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';
const { width, height } = Dimensions.get('window');

class BarcodeScan extends Component {
	constructor(props) {
		super(props);
		this.camera = null;
		this.barcodeCodes = [];

		this.state = {
			camera: {
				type: RNCamera.Constants.Type.back,
				flashMode: RNCamera.Constants.FlashMode.auto
			},
			barcode: ''
		};
	}
	componentWillUnmount() {
		this.setState({ barcode: '' });
	}
	async onBarCodeRead(scanResult) {
		if (scanResult.data != null) {
			if (!this.barcodeCodes.includes(scanResult.data)) {
				this.setState({ barcode: scanResult.data });
				console.warn('barcode');
				console.warn(this.state.barcode);
				this.props.navigation.push('SearchProduct', {
					product_barcode: this.state.barcode
				});
			}
		}
		return;
	}

	render() {
		return (
			<View style={styles.container}>
				<RNCamera
					ref={(ref) => {
						this.camera = ref;
					}}
					defaultTouchToFocus
					flashMode={this.state.camera.flashMode}
					mirrorImage={false}
					onBarCodeRead={this.onBarCodeRead.bind(this)}
					onFocusChanged={() => {}}
					onZoomChanged={() => {}}
					permissionDialogTitle={'Permissão para usar a câmera'}
					permissionDialogMessage={'Precisamos de permissão para usar sua câmera'}
					style={styles.preview}
					type={this.state.camera.type}
				/>
				<View style={[ styles.overlay, styles.topOverlay ]}>
					<Text style={styles.scanScreenMessage}>Por favor escanei o código do produto.</Text>
				</View>
				<View style={[ styles.overlay, styles.bottomOverlay ]}>
					<Button
						onPress={() => {
							console.warn('scan clicked');
						}}
						style={styles.enterBarcodeManualButton}
						title="Código de barras aqui"
					/>
				</View>
			</View>
		);
	}
}

const styles = {
	container: {
		flex: 1,
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		width: width,
		marginTop: 0,
		marginBottom: 0,
		height: height
	},
	preview: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	overlay: {
		position: 'absolute',
		padding: 30,
		right: 0,
		left: 0,
		alignItems: 'center'
	},
	topOverlay: {
		top: 0,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	bottomOverlay: {
		bottom: '40%',
		backgroundColor: 'rgba(0,0,0,0.4)',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	enterBarcodeManualButton: {
		padding: 15,
		backgroundColor: 'white',
		borderRadius: 40
	},
	scanScreenMessage: {
		fontSize: 16,
		color: 'white',
		textAlign: 'center',
		alignItems: 'center',
		justifyContent: 'center'
	}
};

export default BarcodeScan;
