import {Platform, StyleSheet} from 'react-native';

export default StyleSheet.create({
	shadowMenuContainer: {
		position: 'absolute',
		backgroundColor: 'white',
		borderRadius: 4,
		opacity: 0,

		...Platform.select({
			ios: {
				shadowColor: 'black',
				shadowOffset: {
					width: 0,
					height: 2,
				},
				shadowOpacity: 0.14,
				shadowRadius: 2,
			},
			android: {
				elevation: 8,
			},
		}),
	},
	menuContainer: {
		overflow: 'hidden',
	},
});
