# Contexts

The context pattern used in this repo is based off of this blog: https://kentcdodds.com/blog/how-to-use-react-context-effectively

## How to Use

Each context file has 3 exports: `Provider`, `useState`, and `useDispatch`. To properly use these you first need to wrap all components that need to take advantage of the respective context in the `<Provider>` component. Children of this component have access to the `useState` and `useDispatch` hooks in order to read and modify the values stored in that context.

Example:

```javascript
// Inside the top level component `App` we wrap `HomePage` in the UserProvider, thereby allowing `HomePage` to access the state defined in the User Context
const App = () => {
  return (
    <UserProvider>
      <HomePage />
    </UserProvider>
  );
};

const HomePage = () => {
  // We can access the useUserState hook here because HomePage is wrapped in a UserProvider
  // *This assumes there is a value `username` in the user state*
  const { username } = useUserState();

  // Same thing here with the useUserDispatch hook
  const userActions = useUserDispatch();

  // This renders a button that will call the hypothetical `updateUserName` action that would be defined in the reducer in the UserContext file.
  return (
    <div>
      {username} is currently logged in
      <button
        onClick={() =>
          userActions({
            type: "updateUserName",
            payload: { username: "new user name" },
          })
        }
      >
        Click me to call updateUserName Action
      </button>
    </div>
  );
};
```

## Modifying Context

The two existing context files `AuthContext` and `UserContext` can be modified by updating the respective `state` objects and writing custom reducer actions for modifying those states.
