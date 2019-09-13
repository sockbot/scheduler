# Interview Scheduler

Interview Scheduler is a tool to help administrators schedule interviews between students and interviewers.

## Technologies and Frameworks

### Test

- Storybook
- Cypress
- Jest

### Front End

- React
- HTML/CSS
- SASS

### Back End

- WebSockets
- Postgres
- Axios
- Express

## Setup

Install dependencies with `npm install`.

Set up PostgreSQL database scheduler_development with owner development password development on port 5432.

Install the API server from: https://github.com/sockbot/scheduler-api

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Screenshots & Video

![Browse](https://github.com/sockbot/scheduler/blob/master/docs/Interview%20Scheduler.png?raw=true)
![Edit](https://github.com/sockbot/scheduler/blob/master/docs/Interview%20Scheduler2.png?raw=true)
![Saving Status](https://github.com/sockbot/scheduler/blob/master/docs/Interview%20Scheduler3.png?raw=true)

https://youtu.be/Iy_F_ld22aI

## How it works

A user can create, edit and delete appointments between students and interviewers in 5 slots per day, 5 days a week. The appointment data is persistent stored on a server in a PostgreSQL database.

The user input is validated on the client side to ensure empty appointments are not submitted. State is handled using React useEffect and useReducer.

The user input is posted to the server using an asynchronous Ajax call and posted to all connected clients using WebSockets.
