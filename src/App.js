import React from 'react';
import {Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';


import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SingInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from './components/header/header.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import {setCurrentUser } from './redux/user/user.actions';


class App extends React.Component{
    unSubscribeFromAuth = null;

    componentDidMount() {
        const { setCurrentUser } = this.props;

        // Open subscription "open message system" that informs you that the authentication state has changed without manually fetching it as long the app location class is mounted on the DOM.
        this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
           if (userAuth) {

               // calls the createUserProfileDocument that's been made in firebase
               const userRef = await createUserProfileDocument(userAuth);

               // The snapSHot object is where you'll get the data  related to the user "userRef" that is possibly stored if it was a new authentication, or the data related to the user that is already stored in the database.
               userRef.onSnapshot(snapShot => {
                 setCurrentUser({
                         id: snapShot.id,
                         ...snapShot.data() // use .data() in order to get the data you stored in the database.
                     })
               });
           }

           else setCurrentUser(userAuth);
        });
    }

    componentWillUnmount() {
        // closes the subscription whenever the component unMounts.
        this.unSubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route exact path='React-E-commerce-store/' component={HomePage}/>
                    <Route  path='/shop' component={ShopPage}/>
                    <Route  exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SingInAndSignUpPage />) }/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
