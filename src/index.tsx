import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "./store/store";
import {QueryClient, QueryClientProvider} from "react-query";
const queryClient = new QueryClient()
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            {/*<PersistGate loading={null} persistor={persistor}>*/}
                <App />
            {/*</PersistGate>*/}
        </Provider>
    </QueryClientProvider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
