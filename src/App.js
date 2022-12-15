import { Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";

import Layout from "./components/Layout/Layout";
import AuthPage from "./pages/AuthPage";
import AuthContext from "./store/auth-context";
import Todos from "./pages/Todos";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <AuthPage />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        <Route path="/todos">
          {authCtx.isLoggedIn && <Todos />}
          {!authCtx.isLoggedIn && <Redirect to="auth" />}
        </Route>
        {/*  다른 경로 막음 */}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
