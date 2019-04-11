import React, {ReactNode, ReactText, Component} from 'react';
import {
	Animated,
	Modal,
	Platform,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
	LayoutChangeEvent,
} from 'react-native';

import {STATES, DIMENSIONS, ANIMATION_DURATION, EASING, SCREEN_INDENT} from './constants/Popover.constants';

import styles from './styles/Popover.styles';

interface IPopoverState {
	menuState: string;
	top: number;
	left: number;
	menuWidth: number;
	menuHeight: number;
	buttonWidth: number;
	buttonHeight: number;
	menuSizeAnimation: Animated.ValueXY;
	opacityAnimation: Animated.Value;
}

interface IPopoverProps {
	children: ReactNode | ReactNode[] | ReactText,
	button: ReactNode | ReactNode[] | ReactText,
	style: object;
	onHidden: Function;
}

class Popover extends Component<any, IPopoverState> {
	public container = React.createRef<View>();

	public state = {
		menuState: STATES.HIDDEN,
		top: 0,
		left: 0,
		menuWidth: 0,
		menuHeight: 0,
		buttonWidth: 0,
		buttonHeight: 0,
		menuSizeAnimation: new Animated.ValueXY({x: 0, y: 0}),
		opacityAnimation: new Animated.Value(0),
	};

	private readonly parallelAnimation = (width: number, height: number) => Animated.parallel([
		Animated.timing(this.state.menuSizeAnimation, {
			toValue: {x: width, y: height},
			duration: ANIMATION_DURATION,
			easing: EASING,
		}),
		Animated.timing(this.state.opacityAnimation, {
			toValue: 1,
			duration: ANIMATION_DURATION,
			easing: EASING,
		}),
	]).start()

	private readonly onMenuLayout = (event: LayoutChangeEvent) => {
		if (this.state.menuState === STATES.ANIMATING) {
			return;
		}

		const {width, height} = event.nativeEvent.layout;

		this.setState({
			menuState: STATES.ANIMATING,
			menuWidth: width,
			menuHeight: height,
		}, () => this.parallelAnimation(width, height));
 	}

	private readonly onButtonLayout = (event: LayoutChangeEvent) => {
		const {width, height} = event.nativeEvent.layout;

		this.setState({buttonWidth: width, buttonHeight: height});
	}

	private readonly onDismiss = () => {
		const {onHidden} = this.props;

		if (onHidden) onHidden();
	}

	private readonly calculateMaxPosition = (pos: number) => Math.max(SCREEN_INDENT, pos);

	public show = () => {
		this.container.current!.measureInWindow((x: number, y: number) => {
			const top = this.calculateMaxPosition(y);
			const left = this.calculateMaxPosition(x);

			this.setState({menuState: STATES.SHOWN, top, left});
		});
	}

	public hide = () => {
		Animated.timing(this.state.opacityAnimation, {
			toValue: 0,
			duration: ANIMATION_DURATION,
			easing: EASING,
		}).start(() => {
		// Reset state
		this.setState(
			{
				menuState: STATES.HIDDEN,
				menuSizeAnimation: new Animated.ValueXY({ x: 0, y: 0}),
				opacityAnimation: new Animated.Value(0),
			},
			() => {
				if (Platform.OS !== 'ios' && this.props.onHidden) {
					this.props.onHidden();
				}
			},
		);
		});
	}

	public render() {
		const {
			menuSizeAnimation,
			menuWidth,
			menuHeight,
			buttonWidth,
			buttonHeight,
			opacityAnimation,
		} = this.state;

		const menuSize = {
			width: menuSizeAnimation.x,
			height: menuSizeAnimation.y,
		};

		let {left, top} = this.state;

		const transforms = [];

		if (left > DIMENSIONS.width - menuWidth - SCREEN_INDENT) {
			transforms.push({
				translateX: Animated.multiply(menuSizeAnimation.x, -1),
			});

			left = Math.min(DIMENSIONS.width - SCREEN_INDENT, left + buttonWidth);
		}

		if (top > DIMENSIONS.height - menuHeight - SCREEN_INDENT) {
			transforms.push({
				translateY: Animated.multiply(menuSizeAnimation.y, -1),
			});

			top = Math.min(DIMENSIONS.height - SCREEN_INDENT, top + buttonHeight);
		}

		const shadowMenuContainerStyle = {
			opacity: opacityAnimation,
			transform: transforms,
			left,
			top,
		};

		const {menuState} = this.state;
		const animationStarted = menuState === STATES.ANIMATING;
		const modalVisible = menuState === STATES.SHOWN || animationStarted;

		const {testID, button, style, children} = this.props;

		return (
			<View ref={this.container} collapsable={false} testID={testID}>
				<View onLayout={this.onButtonLayout}>{button}</View>
				<Modal
					visible={modalVisible}
					onRequestClose={this.hide}
					supportedOrientations={[
						'portrait',
						'portrait-upside-down',
						'landscape',
						'landscape-left',
						'landscape-right',
					]}
					transparent
					onDismiss={this.onDismiss}
				>
					<TouchableWithoutFeedback onPress={this.hide}>
						<View style={StyleSheet.absoluteFill}>
							<Animated.View
								onLayout={this.onMenuLayout}
								style={[
									styles.shadowMenuContainer,
									shadowMenuContainerStyle,
									style,
								]}
							>
								<Animated.View style={[styles.menuContainer, animationStarted && menuSize]} >
									{children}
								</Animated.View>
							</Animated.View>
						</View>
					</TouchableWithoutFeedback>
				</Modal>
			</View>
		);
	}
}

export default Popover;
