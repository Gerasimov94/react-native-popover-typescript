import {Dimensions, Easing} from 'react-native';

const STATES = {
	HIDDEN: 'HIDDEN',
	ANIMATING: 'ANIMATING',
	SHOWN: 'SHOWN',
};

const DIMENSIONS = Dimensions.get('screen');
const ANIMATION_DURATION = 300;
const EASING = Easing.bezier(0.4, 0, 0.2, 1);
const SCREEN_INDENT = 8;

export {STATES, DIMENSIONS, ANIMATION_DURATION, EASING, SCREEN_INDENT};
