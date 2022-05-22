# Polycode frontend

This is the frontend service fot the proof of concept of Polycode a Codingame like app.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Deployement

To deploy the app you'll need a running Kubernetes environment. You'll also need to setup a few things:

### Repository variables

- KUBECONFIG : The kubeconfig pointing to your cluster
- BOT_ACCESS_TOKEN: An admin access token to make the CI/CD pipeline work

### Environment variables

- API_URL: The url of the backend api to use

These variables can be setup in the `chart/backend/values.yaml` file.
