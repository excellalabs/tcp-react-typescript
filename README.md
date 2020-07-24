## Repository Health:

<!-- prettier-ignore -->
| Build Status | Coverage Status |
| ------------ | --------------- |
| [![CircleCI](https://circleci.com/gh/excellaco/tcp-react-typescript.svg?style=svg&circle-token=24a8b6df1de53ca5c4fca49472214acdef7bf827)](https://circleci.com/gh/excellaco/tcp-react-typescript) | Coming Soon! |

## Running the project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

- Must have docker installed and running
- Run `docker-compose up --build` and the app will start on `localhost:3000`
- **Note:** you must have a `package-lock.json` in your local folder structure for the docker build to work. This should have been included after cloning the repo, but in the case it is missing, run `npm install` to generate it.

### Getting into the container

- To open a bash terminal in the running container you can do `docker exec -it tcp-react bash`
- From here you can run the different `npm` commands like `npm test`
