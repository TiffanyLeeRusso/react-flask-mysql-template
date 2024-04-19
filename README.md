# react-flask-mysql-template

A basic app template for MySql, Python Flask, React, and Bootstrap. The app allows adding, editing, and deleting users from a database. Users have a single "name" field for example purposes.

*This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).*

## Setup

Make sure you have Node.js and Python installed in your environment. Tested with Node v20.12.2, npm version 10.5.0,  and Python 3.12.3.

### Database
Tested with MySQL v8.0.36.
Run the *db.sql* script to create the DB in your SQL server.
Run the *data.sql* script to add some initial mock data to your DB.

### Backend

#### Install Flask
Use one of the following commands to install Flask if you do not already have it:
`$ pip install Flask`
`$ py -m pip install flask`

#### Start the backend server
Open a terminal and run the following command. The process will not exit until Ctrl+C. Python "print" statements will appear in this terminal (for debugging) and script updates are handled automatically. Python errors will end the server process; make sure to run this command again if you create an error.

`$ py run.py`

### Frontend

#### Install all the things
You know the drill.
`$ cd scheduling-app`
`$ npm install`
*sips coffee*

#### Start react-scripts
Run the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

`$ cd scheduling-app`
`$npm start`

## Other Scripts

In the project directory, you can run:

### `npm test`

No tests yet.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

