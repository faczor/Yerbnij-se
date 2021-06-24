You can run:

```
    npm install
```

To install all dependencies.

Or you can install one by one.

#### _But remember to copy all config files_

#

### 1. npx create-react-app nazwa-aplikacji

#

### 2. Prettier

```
    npm install --save-dev prettier
```

_**remember!** (if you use VSC) check "Format On Save" in your settings_

#

### 3. ESLint

```
    npx install-peerdeps --dev eslint-config-airbnb
```

_**remember!** Turn on ESLint in you IDE_

#

### 4. Husky

```
    npm i --save-dev husky
```

#

### 5. Lint-staged

```
   npm i lint-staged
```

#

#

### 6. Props Types

```
   npm i prop-types
```

#

#

To run only front-end

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#

#

# Styling library:

### 1. Styled components

```
    npm install --save styled-components
```

In folder styles you have Global Style, theme - colors, mixins and devices. You
can change those files. There are examples and show you how it looks like.

### 2. Material UI

```
    npm install @material-ui/core
```

### 3. Material UI icon

```
    npm install @material-ui/icons
```

#### 3.1 Font Awesome

package.json doesn't contain Font awesome, but sometime material icon is not
enough so you can install FA

```
npm i @fortawesome/react-fontawesome
```

#

#

# API

### 1. Axios

```
    npm i axios
```

In API/index.js you have new instance of axios with a custom config, object with
sample endpoints and example of execute
