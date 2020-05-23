//IMPORT DEPENDENCIES
import React, { Fragment, useState } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./assets/css/bootstrap.css"
import "./assets/css/style.css"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Swal from 'sweetalert2'
import Loader from 'react-loader-spinner'

//IMPORT PAGES

//DEFAULT PAGES
import AppNavbar from './partials/AppNavbar'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NotFoundPage from './pages/NotFoundPage'

//DEV PAGES
import UserRolesPage from './pages/UserRolesPage'
import UserAdminPage from './pages/UserAdminPage'
import UserOrdinaryPage from './pages/UserOrdinaryPage'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

let backend = "http://localhost:8000/graphql"
// let backend = "https://kmasing-timetracker-server-02.herokuapp.com/graphql"
// let backend = "https://kmasing-timetracker-server-02.herokuapp.com/graphql" || "http://localhost:8000/graphql"
const client = new ApolloClient({ uri: backend }) //CHANGE PORT IF NECESSARY

//CONST APP
const App = () => {
    console.log("APP NAVBAR TOKEN", localStorage.token)
    //DECLARE STATE
    const [appData, setAppData] = useState({
        token: localStorage.token,
        _id: localStorage._id,
        roleId: localStorage.roleId,
        firstName: localStorage.firstName,
        lastName: localStorage.lastName,
        username: localStorage.username,
        email: localStorage.email
    })

  //DESTRUCTURE APP DATA
  const { token, _id, roleId, firstName, lastName, username, email } = appData

  const [loading, setLoading] = useState(false)

    if(loading) {
        return (
            <div className="App container">
                <div className="row">
                    <div id="col loaderContainer" >
                        <div id="loader">
                            <Loader
                                type="RevolvingDot"
                                color="#868d93"
                                height={100}
                                width={100}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

  //CREATE A FUNCTION FOR CURRENT USER
  const getCurrentUser = () => {
    return { token, _id, roleId, firstName, lastName, username, email }
  }

  //LOAD parameters(attr to be loaded, destination)
  const Load = (props, page) => {

    // //LANDING PAGE
    if(page === "LandingPage" && token && roleId == 1) {
      return  <Redirect to="/home" token={token} roleId={roleId}/>
    } else if(page === "LandingPage" && token && roleId == 2) {
      return  <Redirect to="/home" token={token} roleId={roleId}/>
    } else if(page === "LandingPage") {
      return <LandingPage {...props} token={token} roleId={roleId} setLoading={setLoading}/>
    }//REFACTOR FOR LANDING


    // //LOGIN PAGE
    if(page === "LoginPage" && token) {
      return <Redirect to="/" />
    } else if(page === "LoginPage") {
      return <LoginPage {...props} setLoading={setLoading}/>
    }

    // //REGISTER PAGE
    if(page === "RegisterPage" && token) {
      return <Redirect to="/" />
    } else if(page === "RegisterPage") {
      return <RegisterPage {...props} setLoading={setLoading}/>
    }

    if(!token) return <Redirect to="/login" />

    if( page === "LogoutPage" ) {
      localStorage.clear()
      setAppData({
        token,
        username
      })
      setLoading(true)

      Swal.fire({
            title: "Success",
            text: "Logout successful!",
            icon: "success",
            showConfirmationButton: false,
            timer: 3000
          })

      return window.location = "/"
    }

    if(roleId == 1){
      switch(page) {
        case "LandingPage": return <LandingPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
        case "HomePage": return <HomePage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
        case "LoginPage": return <LoginPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>       
        case "UserRolesPage": return <UserRolesPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
        case "UserAdminPage": return <UserAdminPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
        case "UserOrdinaryPage": return <UserOrdinaryPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
        default:  return <NotFoundPage/>
      }      
    } else if(roleId == 2){
      switch(page) {
        case "LandingPage": return <LandingPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
        case "HomePage": return <HomePage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
        case "LoginPage": return <LoginPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>       
        default:  return <NotFoundPage/>
      }
    }


    switch(page) {
        case "LandingPage": return <LandingPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
        case "HomePage": return <HomePage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
        case "LoginPage": return <LoginPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>       
        case "UserRolesPage": return <UserRolesPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
        case "UserAdminPage": return <UserAdminPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
        case "UserOrdinaryPage": return <UserOrdinaryPage {...props} token={token} roleId={roleId} userId={_id} currentUser={getCurrentUser} setLoading={setLoading}/>
        default:  return <NotFoundPage/>
    }
  }

  let navbar = ""

  if(!token) {

  } else {
    navbar = (
        <Fragment>
          <AppNavbar token={token} currentUser={firstName} roleId={roleId} userId={_id} className="bg-secondary" _id={_id} setLoading={setLoading}/>
        </Fragment>
    )
  }

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        { navbar }
          <Switch>
            <Route exact path="/" render={ (props)=> Load(props, "LandingPage") } />
            <Route exact path="/register" render={ (props)=> Load(props, "RegisterPage") } />
            <Route path="/logout" render={ (props)=> Load(props, "LogoutPage") } />
            <Route path="/login" render={ (props)=> Load(props, "LoginPage") } />
            <Route path="/home" render={ (props)=> Load(props, "HomePage") } />
            <Route path="/users/admin/:id" render={ (props)=> Load(props, "UserAdminPage") } />
            <Route path="/users/ordinary/:id" render={ (props)=> Load(props, "UserOrdinaryPage") } />
            <Route path="/users" render={ (props)=> Load(props, "UserRolesPage") } />
            <Route path="*" render={ (props)=> Load(props, "NotFoundPage") } />
          </Switch>
      </BrowserRouter>
    </ApolloProvider>
  )
}

//EXPORT FUNCTION
export default App