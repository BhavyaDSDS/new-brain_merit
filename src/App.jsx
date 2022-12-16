import React from "react";
import { hot } from "react-hot-loader/root";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import store from "./app/store";
import history from "./router/history";
import AuthLayout from "./page/layout/AuthLayout";
import MainLayout from "./page/layout/MainLayout";
import ProtectedRoute from "./features/auth/ProtectedRoute";

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter history={history}>
          {/* <Switch>
            <MainLayout />            
          </Switch> */}
          <Switch>
              <Route path="/auth/" component={AuthLayout} />
              <ProtectedRoute path="/" component={MainLayout} />
          </Switch>          
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}
export default hot(App);
