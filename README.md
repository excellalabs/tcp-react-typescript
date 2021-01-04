## Running the project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

- Must have docker installed and running
- Run `docker-compose up --build` and the app will start on `localhost:3000`
- **Note:** you must have a `package-lock.json` in your local folder structure for the docker build to work. This should have been included after cloning the repo, but in the case it is missing, run `npm install` to generate it.

### Getting into the container

- To open a bash terminal in the running container you can do `docker exec -it va-cedar-frontend bash`
- From here you can run the different `npm` commands like `npm test`
