import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import Login from './Login';
import { withAuth0 } from '@auth0/auth0-react';
import BestBooks from './BestBooks';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import FavoriteDrinks from './FavoriteDrinks';

class App extends React.Component {

  render() {
    const {isAuthenticated}=this.props.auth0;
    console.log('app', this.props);
    return(
      <>
        <Router>
          <IsLoadingAndError>
            <Header />
            <Switch>
              <Route exact path="/">
                {isAuthenticated? <BestBooks/> : <Login/>}
              </Route>
              <Route exact path="/fav">
                {isAuthenticated? <FavoriteDrinks/> : <Login/>}
              </Route>
            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
