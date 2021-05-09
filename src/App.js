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
						{(!user || !user._id) ? <Redirect to="/login" />:
							<div className="app">
								<Header />
								<Main />
							</div>
						}
					</Route>
					<Route>
						<Page404 />
					</Route>
				</Switch>
			</Router>
		);
	}
};

export default App;
