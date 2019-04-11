import React, {Component, ReactText, ReactNode} from 'react';
import {TouchableOpacity, View} from 'react-native';

import {IOption} from './constants/common.constants';

import PopoverItemWrapper from './PopoverItemWrapper';
import Popover from './Popover';

interface IPopoverWrapperProps {
	options: Array<IOption>;
	style?: object;
	children: ReactNode | ReactNode[] | ReactText;
	onHidden: Function;
}

export default class PopoverWrapper extends Component<IPopoverWrapperProps> {

	public static defaultProps = {
		options: [],
	};

	public popover = React.createRef<Popover>();

	private readonly showMenu = () => this.popover.current!.show();

	private readonly hideMenu = () => this.popover.current!.hide();

	public render() {
		const {options, style, children, onHidden} = this.props;
		console.log(this.popover)

		return (
			<View style={style}>
				<Popover
					ref={this.popover}
					button={
						<TouchableOpacity onPress={this.showMenu}>
							{children}
						</TouchableOpacity>
					}
					onHidden={onHidden}
				>
					{options.map(item => (
						<PopoverItemWrapper
							key={item.id}
							item={item}
							hideMenu={this.hideMenu}
							showMenu={this.showMenu}
						/>
					))}
				</Popover>
			</View>
		);
	}
}
