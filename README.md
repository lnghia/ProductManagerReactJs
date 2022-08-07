# Product Management

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`

Install all the necessary packages which has been defined in package.json

### `npm run start:{environment}`

supported values for `environment`:

- develop
- staging
- production

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run test:{environment}`

supported values for `environment`:

- develop
- staging
- production

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build:{environment}`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Environment variables file is required

`.env` file is required for application usage. You can define the environment variables that are necessary for the app by putting them in `.env` file which is at the root level.
However, you need to name the `.env` file correctly to get the app work. Make sure you follow these naming patterns:

| environment | name      |
| ----------- | --------- |
| develop     | .env.dev  |
| staging     | .env.stag |
| production  | .env.prod |
