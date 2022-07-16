# Budget Tracker

## Purpose
Budget Tracker is a progressive web application (PWA) deployed via Heroku. It uses MongoDB and Express.js for database management and routing. Given the main application code, I developed it into a PWA with offline functionality. The purpose of this development is to provide users with uninterrupted service regardless of their internet connection. Users are able to input transactions and view their budget details while offline. Any new transactions will be automatically sent to the database when connection is restored. Completing this project enhanced my knowledge of the necessary components for creating a PWA and deploying through Heroku with a connection to a MongoDB database (via MongoDB Atlas). 

### User Story
AS AN avid traveler
I WANT to be able to track my withdrawals and deposits with or without a data/internet connection
SO THAT my account balance is accurate when I am traveling 

### Acceptance Criteria
GIVEN a budget tracker without an internet connection
WHEN the user inputs an expense or deposit
THEN they will receive a notification that they have added an expense or deposit
WHEN the user reestablishes an internet connection
THEN the deposits or expenses added while they were offline are added to their transaction history and their totals are updated

## Application Details
This application is [deployed via heroku.](https://warm-scrubland-56362.herokuapp.com/). It can also be downloaded to a user's local computer by clicking the link in the address bar. 

### Installation
To use the app, simply head to the heroku deployment.

For contributions, or to run the application locally, clone the repository to your local machine and run an `npm install`. Then run `npm start` to start the server and automatically create the database. Navigate to `http://localhost:3001/` on your browser.

### Code Summary
This application consists of a MongoDB database to hold transaction data, as well as simple routing with Express.js for accessing the database. It serves a static html file and uses javascript functions to handle data input on the front end, updating the budget and graphs as needed. 

This database only contains one Model: transaction. 

The only API endpoints are `/api/transaction` and `/api/transaction/bulk` (the latter of which is for bulk create and utilized by indexedDB for sending all transactions the user has entered while offline at once). 

### Technologies Used
Javascript, Node.js, MongoDB

Project dependencies: Express.js, mongoose

Service Worker: `/public/service-worker.js` is responsible for cacheing resources and fetching them when necessary

IndexedDB: `/public/js/idb.js` manages the online & offline states of the connection. When offline, it locally stores any transactions input by the user. When online again, it sends any local data to the server.

Web Manifest: `/public/manifest.json` holds the app’s metadata, to let users’ devices know what they’re installing and how the app should look on the home screen.

## Deployed Application

Link to live deployment on heroku: [Heroku App](https://warm-scrubland-56362.herokuapp.com/)
