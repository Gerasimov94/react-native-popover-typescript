import React, {ReactText, ReactNode, PureComponent} from 'react';
import PopoverItem from './PopoverItem';
import PopoverDivider from './PopoverDivider';

interface IPopoverItem {
	item: {
		title: ReactText;
		id: ReactText;
		icon: ReactNode;
		isStripped?: boolean;
		isDisabled?: boolean;
		onSelect: (item: any) => void;
	};
	hideMenu: () => void;
	showMenu: () => void;
}

export default class PopoverItemWrapper extends PureComponent<IPopoverItem> {

	private readonly onSelect = () => {
		const {item, hideMenu} = this.props;

		item.onSelect(item);

		hideMenu();
	}

	public render() {
		const {item: {icon, title, isDisabled, isStripped}} = this.props;

		return (
			<React.Fragment>
				<PopoverItem
					onPress={this.onSelect}
					disabled={isDisabled}
					icon={icon}
				>
					{title}
				</PopoverItem>
				{isStripped ? <PopoverDivider /> : null}
			</React.Fragment>
		);
	}
}
