"use client";

import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";
import { Provider } from "react-redux";
import { useRef } from "react";

function ReduxProvider({ children }) {
  const storeRef = useRef(null);

  if (!storeRef.current) {
    const sagaMiddleware = createSagaMiddleware();

    const composeEnhancers =
      process.env.NODE_ENV !== "production" &&
      typeof window !== "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose;

    const store = createStore(
      reducers,
      composeEnhancers(applyMiddleware(sagaMiddleware))
    );

    sagaMiddleware.run(rootSaga);

    storeRef.current = store;
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

export default ReduxProvider;
