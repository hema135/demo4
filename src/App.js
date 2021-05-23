import React, { Component, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import "./App.css";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect
} from "react-router-dom";
// import Footer from "./Icons/footerIcons";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Signin from "./auth/signin";
import Signup from "./auth/signup";
import Page404 from "./404";
import axios from "axios";
import Records from "./Records";

class App extends Component {
	state = {
		discard: false,
		loading: true
	}
	
	onDiscard = () => {
		this.setState({discard: true})
	}
	componentDidUpdate(prevProps, prevState) {
		if(this.state.discard) {
			this.setState({discard: false})
		}
	}

	componentDidMount() {
		axios.get(`api/v1/getUserDetails`)
		.then(resp => {
			console.log(resp.data._id)
			if(resp && resp.status == 200 && resp.data._id){
				return this.setState({
					user: resp.data,
					loading: false
				});
			}
			this.setState({
				loading: false
			})
		})
		.catch(err=> {
			console.log("err", err);
			this.setState({
				loading: false
			})
		})
	}
	
	render() {
		let { user, loading } = this.state;
		if(loading)
			return <i className="fa fa-spinner full-scrren-spinner" />
		return (
			<Router>
				<Switch>
					<Route exact path="/login">
						{user && user._id ? <Redirect to="/" />:
							<Signin />
						}
					</Route>
					<Route exact path="/register">
						{user && user._id ? <Redirect to="/" />:
							<Signup />
						}
					</Route>
					<Route exact path="/">
						<Layout user={user}>
							<Main />
						</Layout>
					</Route>
					<Route exact path="/records">
						<Layout user={user} isAuthReq={false}>
							<Records />
						</Layout>
					</Route>
					<Route>
						<Page404 />
					</Route>
				</Switch>
			</Router>
		);
	}
};

const Layout = ({user, children, isAuthReq}) => {
	if(isAuthReq !== false && (!user || !user._id))  
		return <Redirect to="/login" />
	
	return 	<div className="app">
				<Header user={user}/>
				{children}
			</div>
}

export default App;
