import {combineReducers, configureStore} from "@reduxjs/toolkit";

/**
 * Creates a new empty redux store and creates an injectReducer function to add reducers dynamically.
 */
export function initializeStore() {
    const store: any = configureStore({reducer: {}});

    store.asyncReducers = {};
    store.injectReducer = (key: string, reducer: any) => {
        store.asyncReducers[key] = reducer;
        store.replaceReducer(combineReducers({...store.asyncReducers}))
    };

    return store;
}
