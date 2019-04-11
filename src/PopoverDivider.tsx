import React from 'react';
import {View} from 'react-native';

import styles from './styles/PopoverDivider.styles';

interface IPopoverDivider {
	color?: string;
}

const PopoverDivider: React.FC<IPopoverDivider> = ({color}) => (
	<View style={[styles.divider, {borderBottomColor: color}]} />
);

PopoverDivider.defaultProps = {
	color: 'rgba(0,0,0,0.12)',
};

export default PopoverDivider;
