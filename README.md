## Install

```bash
npm install --save react-native-popover-typescript

or

yarn add react-native-popover-typescript
```

## Usage example

```tsx
import React from 'react';

import {View, Text, Image} from 'react-native';
import Popover from 'react-native-popover-typescript';

class App extends React.PureComponent {
	options: [{
		title: 'Option 1',
		id: 0,
		icon: <Image
			style={{width: 18, height: 18}}
			source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
		/>,
		isStripped: false,
		onSelect: (value: {title: string}) => console.log(value.title),
	}, {
		title: 'Option 2',
		id: 1,
		icon: null,
		isStripped: false,
		onSelect: (value: {title: string}) => console.log(value.title),
	}],

	onHidden = () => console.log('i\'m hidden now!');

	render() {
		<Popover
			options={this.options}
			onHidden={this.onHidden}
		>
			<YourComponentToWrapping />
		</Popover>
	}
}

export default App;
```

## Popover

### Properties

| name     | description                              |     type | default |
| :------- | :----------------------------------------| -------: | :------ |
| options  | Components which you wrapping (required) |     Node | -       |
| children | Button component (required)              |     Node | -       |
| style    | Popover style                            |    Style | -       |
| onHidden | Callback when popover has become hidden  | Function | -       |

## License

MIT License. © Alexey Gerasimov, 2019.
