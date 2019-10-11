import React from "react";
import { BrowserRouter, Switch } from "react-router-dom"; //install them
import "./App.css";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode";

//Redux
import { Provider } from "react-redux"; //redux
import store from "./redux/store";
import {SET_AUTHENTICATED} from './redux/types';
import {logoutUser , getUserData} from './redux/actions/userActions';
//Components
import Navbar from "./components/Navbar";
import AuthRoute from "./util/AuthRoute";
import NoAuthRoute from "./util/NoAuthRoute";

//Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import postInfo from "./pages/postInfo";
import userProfile from "./pages/userProfile";

import Axios from "axios";
//import { typography } from "@material-ui/system";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#d1c4e9",
      main: "#7e57c2",
      dark: "#512da8",
      contrastText: "#fff"
    },
    secondary: {
      light: "#80deea",
      main: "#00bcd4",
      dark: "#00838f",
      contrastText: "#fff"
    }
  },
  typography: {
    useNextVariants: true
  }
}); //

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser);
  } else {
    store.dispatch({type:SET_AUTHENTICATED});
    Axios.defaults.headers.common['Authorization']= token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            <Navbar />
            <div className="container">
              <Switch>
                <AuthRoute exact path="/" component={home} />
                <NoAuthRoute
                  exact
                  path="/login"
                  component={login}
                />
                <NoAuthRoute
                  exact
                  path="/signup"
                  component={signup}
                />
                
                <AuthRoute exact path="/users/:userId" component={userProfile} />
                <AuthRoute exact path="/posts/:postId" component={postInfo} />

              </Switch>
            </div>
          </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
