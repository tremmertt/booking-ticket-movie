import "./App.css";
import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Detail from "./pages/Detail/Detail";
import Checkout from "./pages/Checkout/Checkout";
import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
import { Suspense, lazy } from "react";
import { UserTemplate } from "./templates/UserTemplate/UserTemplate";
import ScrollToTop from "./ScrollToTop.js";
import Loading from "./components/Loading/Loading";

// const CheckoutTemplate = lazy(() =>
//   import("./templates/CheckoutTemplate/CheckoutTemplate")
// );

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Loading />
      <ScrollToTop>
        <Switch>
          <HomeTemplate path="/home" exact Component={Home} />
          <HomeTemplate path="/contact" exact Component={Contact} />
          <HomeTemplate path="/news" exact Component={News} />
          <HomeTemplate path="/detail/:id" exact Component={Detail} />

          <Route path="/register" exact Component={Register} />

          <CheckoutTemplate path="/checkout/:id" exact Component={Checkout} />

          {/* <Suspense fallback={<h1> LOADING... </h1>}>
          <CheckoutTemplate path="/checkout/:id" exact Component={Checkout} />
        </Suspense> */}
          <UserTemplate path="/login" exact Component={Login} />

          <HomeTemplate path="/" exact Component={Home} />
        </Switch>
      </ScrollToTop>
    </Router>
  );
}

export default App;
