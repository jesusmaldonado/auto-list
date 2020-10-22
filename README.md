This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## This is an implementation using only React.useState and React.useEffect

The project implements a list view, a detail view according to a specified UI system using:

- Material-UI
- typescript 3.7.2
- Caching of requests using `useRef`
- Transition Fades
- Node `v10.16.3`
- Fetching of favorite cars using `localStorage`

## Available Scripts

In the project directory, you can run:

## Initial Run

```
npm i && npm run start
```

## Tests

```
npm run test
```

\*\*Hint: you may have to hit `a` to run all tests

## Further improvements

Considering the project structure involves multiple requests and a large state object

- `React.useReducer`
- `React.useContext`

This would enable the application to have a more extensible infrastructure that could allow for more complex actions and less of the work being done in the `MainView.tsx`. I would also like some more thorough integrations tests mocking requests etc.
