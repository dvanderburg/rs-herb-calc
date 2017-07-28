## Project Structure and Framework

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent guide on how to perform common tasks such as project setup and build processes [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

RS Herb Calc uses React alongside React-Redux for application state management. The main logic powering the calculator is in the reducers. The reducers are where user input turns into calculator output. Read the section titled Redux and Application State for more information.


## Folder Structure
The basic folder structure is created by [Create React App](https://github.com/facebookincubator/create-react-app).

```
rs-herb-calc/
	README.md
	documents/
	node_modules/
	package.json
	public/
		index.html
		favicon.ico
	src/
		assets/
		components/
		containers/
		index.css
		index.js
		redux/
			actions/
			data/
			reducers/
		reset.css
```

### `src`
The src directory contains all application code and resources outside of the page template. The src directory is the only directory managed by Webpack, and as such, **all JS and CSS are inside src**, otherwise Webpack will not see them.

### `containers` and `components`
The project uses the React-Redux "containers" pattern where components aware of Redux are referred to as containers. Due to the relative simplicity of RS Herb Calc, folders are named after what is stored inside of them rather than a namespace pattern. The containers directory holds all components connected to Redux, while the components folder holds all "dumb" components that are not aware of Redux.

Subfolders within containers and components are named after their components or named to group together tightly coupled components.

### `index.js`
This is the JavaScript entry point.

### `index.css`
This stylesheet contains high-level styles used throughout components to create a consistent application style. For example: Default style of anchor tags, default font size and style, generic "helper" classes used to clear floats, etc.

### `redux`
Contains everything about the application state and data. The Redux reducers, actions, as well as static application data. More information in the Redux portion of the documentation.


## Redux and Application State
The `redux` folder stores both Redux actions and reducers, as well as static application data such as the name of items.

### `data`
The data folder contains an `items.js` file that exports unique identifiers for all items used in the application, constants representing type of items such as potion, herb, secondary, as well as an array of objects representing each item.

### `actions`
The actions folder contains a `types.js` file which defines each type of action that can be dispatched to redux. The folder also contains each individual action. For more information about redux actions see the [Redux Documentation](https://github.com/reactjs/redux).

### `reducers`
As expected, reducers are where most of the logic resides to mutate application state. The application state has a main slice referred to as the calculator, which holds the input and output of the calculator. This slice is further broken down into the inventory, output, and requirements.

[__Calculator__] Main slice of state concerned with all user input and the calculator output. This slice should not be concerned with things such as loading states, etc. It is only concerned with the input of the user and the output of the calculator.

The calculator slice is further broken down into three slices:
* Inventory = User input
* Output = Potions created from input
* Requirements = Items missing from inventory required to create output

Each time the inventory is changed by dispatching an `INVENTORY_ITEM_QUANTITY_CHANGE` action the calculator reducer will update the inventory of items, calculate the potion output, and determine which items are required to achieve the output. These distinct operations are split into seperate reducer files used by the calculator reducer for readability.

The output and requirement calculations can be a little overwhelming at first glance. To familiarize yourself with start with the `calculatorReducer` function defined in `src/redux/reducers/calculator/calculator.js`. This is where a Redux action will mutate the input and output of the calculator.


## Adding a New Potion
The following describes the steps required to have the calculator support a new type of potion. Much of the logic that prioritizes certain potions over others is defined in the reducers. Adding a new potion will involve adding logic to determine how it should be prioritized.

1. Add items to items.js
 
   Open `src/redux/data/items.js` and export a new item type constant for the potion as well as any herbs or secondaries not already defined. Then, add the necessary objects to the `ITEMS` array to define the name, types, and image. The image should be added to `src/assets`. Thumbnail images are 60x60 pngs.
   
   
2. Update the output reducer

   Open `src/redux/reducers/calculator/output.js` and go to the `getOutput` function, which is the reducer for the calculator's output. This pure function receives an object representing the user's inventory and returns an array of objects representing the output of the calculator.
   
   To format the output a helper function called `addItemResult` is used.
   
   Calculate how many of the potions should be output based on the user's inventory and then add that many to the output array and provide a reason, using the `addItemResult` function to ensure consistent object structure. This should be relatively straightforward unless the potion you're adding uses the same herb as another potion. If that's the case, you'll need to refactor the `getOutput` function and write logic to determine how to prioritize or split up herb usage.
   

3. Update the requirements reducer

   Open `src/redux/reducers/calculator/requirements.js` and go to the `getRequirements` function, which is the reducer for the calculator's list of items required to generate the potion output. This pure function takes the user's inventory and the desired output and returns an array of objects representing the items required to fulfill the output.
   
   To format the output a helper function called `addItemResult` is used.
   
   Compare the output to the inventory and determine how many additional secondaries are needed to create the desired output and provide a reason, using the `addItemResult` function. This should be relatively straightforward even if the potion your adding uses the same secondary as another potion. The `addItemResult` is useful for providing multiple reasons for needing the same secondary.