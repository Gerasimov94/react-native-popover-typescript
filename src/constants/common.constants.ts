import {ReactText, ReactNode} from 'react';

export interface IOption {
	title: ReactText;
	id: ReactText;
	icon: ReactNode;
	isStripped?: boolean;
	isDisabled?: boolean;
	onSelect: (item: any) => void;
}