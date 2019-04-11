import React, {ReactNode, ReactText} from 'react';
import {Text, TouchableHighlight, Platform, View} from 'react-native';

import styles from './styles/PopoverItem.styles';

interface IPopoverItemProps {
	children: ReactNode | ReactText | ReactNode[];
	disabled?: boolean;
	disabledTextColor?: string;
	onPress: () => void;
	style?: object;
	textStyle?: object;
	icon?: ReactNode;
	underlayColor?: string;
}

const PopoverItem: React.FC<IPopoverItemProps> = ({
	children,
	disabled,
	disabledTextColor,
	onPress,
	style,
	icon,
	textStyle,
	underlayColor,
	...props
}) => (
	<TouchableHighlight
		{...props}
		disabled={disabled}
		onPress={onPress}
		underlayColor={underlayColor}
	>
		<View style={[styles.container, style]}>
			<View style={styles.iconStyle}>{icon}</View>
			<Text
				ellipsizeMode={Platform.OS === 'ios' ? 'clip' : 'tail'}
				numberOfLines={1}
				style={[
					styles.title,
					disabled && {color: disabledTextColor},
					textStyle,
				]}
			>
				{children}
			</Text>
		</View>
	</TouchableHighlight>
);

PopoverItem.defaultProps = {
	disabled: false,
	disabledTextColor: '#BDBDBD',
	underlayColor: '#E0E0E0',
	style: {},
	textStyle: {},
};

export default PopoverItem;
