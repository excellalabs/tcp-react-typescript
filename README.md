## Repository Health:

<!-- prettier-ignore -->
| Build Status | Coverage Status |
| ------------ | --------------- |
| [![CircleCI](https://circleci.com/gh/excellaco/tcp-react-typescript.svg?style=svg&circle-token=24a8b6df1de53ca5c4fca49472214acdef7bf827)](https://circleci.com/gh/excellaco/tcp-react-typescript) | Coming Soon! |

## Running the project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

- Must have docker installed and running
- Run `docker-compose up --build` and the app will start on `localhost:9000`
- **Note:** you must have a `package-lock.json` in your local folder structure for the docker build to work. This should have been included after cloning the repo, but in the case it is missing, run `npm install` to generate it.
- Although this will stand up this application, you will not be able to login or populated any pages with data without also standing up the tcp-java repo available at: https://github.com/excellalabs/tcp-java

### Getting into the container

- To open a bash terminal in the running container you can do `docker exec -it tcp-react bash`
- From here you can run the different `npm` commands like `npm test`

## Library Documentation

Routing is handled by React Router
https://reactrouter.com/web/guides/quick-start

Async calls are handled by Axios
https://github.com/axios/axios

Formik manages form state
https://formik.org/docs/overview

Yup handles form validation
https://github.com/jquense/yup

Date manipulation uses Date Fns
https://date-fns.org/docs/Getting-Started

Unit and integration tests use Jest with React Testing Library
https://jestjs.io/docs/getting-started
https://testing-library.com/docs/react-testing-library/cheatsheet
https://github.com/testing-library/jest-dom
https://github.com/testing-library/user-event

End to end tests are handled with Cypress
https://docs.cypress.io/guides/overview/why-cypress
https://testing-library.com/docs/cypress-testing-library/intro
