import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	NavbarText
} from 'reactstrap';

const AppNavbar = (props) => {

	const {
		token,
		_id,
		currentUser,
		roleId
	} = props

	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	let rightLinks = "";
	if(!token) {

	} else {
		rightLinks = (
			<Fragment>
				<Link to="/me" className="btn btn-outline-light">Welcome, {currentUser.charAt(0).toUpperCase()}{currentUser.slice(1)} </Link>
				<Link to="/logout" className="ml-3 btn btn-outline-light">Logout</Link>
			</Fragment>
		)
	}

	let leftLinks = "";
	if(!token) {

	} else if(token && props.roleId == 1) {
		leftLinks = (
			<Fragment>
					<ul className="navbar-nav mr-auto">
						<NavItem className="nav-item">
							<NavLink className="nav-link text-white" href="/home">Home</NavLink>
						</NavItem>
						<li className="nav-item">
							<a className="nav-link text-white" href="/users">Users <span className="sr-only">(current)</span></a>
						</li>
						<NavItem className="nav-item">
                            <NavLink className="nav-link text-white" href="/" disabled>Disabled</NavLink>
						</NavItem>
					</ul>
			</Fragment>
		)
	} else if(token && props.roleId == 2){
		leftLinks = (
			<Fragment>
					<ul className="navbar-nav mr-auto">
						<NavItem className="nav-item">
							<NavLink className="nav-link text-white" href="/home">Home</NavLink>
						</NavItem>
						<li className="nav-item">
							<a className="nav-link text-white" href="/" disabled>Disabled Active<span className="sr-only">(current)</span></a>
						</li>
						<NavItem className="nav-item">
                            <NavLink className="nav-link text-white" href="/" disabled>Disabled</NavLink>
						</NavItem>
					</ul>
			</Fragment>
		)		
	}

	return (
		<Fragment>
			<nav className="navbar navbar-expand-lg navbar-light bg-primary">
				<img src="https://res.cloudinary.com/kennmasing/image/upload/v1590210404/reactapp-template/codingarcht_logo_klw8o8.png" className="tmLogo mr-3"/>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
						{ leftLinks }
					<form className="form-inline my-2 my-lg-0">
						{ rightLinks }
					</form>
				</div>
			</nav>
		</Fragment>
	)

}

export default AppNavbar;
