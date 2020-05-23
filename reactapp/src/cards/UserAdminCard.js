import React, { Fragment, useState } from 'react'
import { Container, Row, Col, Button, Form, FormGroup, Input, Card, CardBody, CardTitle, CardSubtitle, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';

// import { FaHeartbeat, FaPiggyBank, FaCrown, FaUsers, FaUserPlus } from 'react-icons/fa';
import { FaHeartbeat, FaPiggyBank, FaCrown, FaUsers, FaUserPlus } from 'react-icons/fa';
import { MdDirectionsBike } from  'react-icons/md';
import { GiEarthAsiaOceania } from 'react-icons/gi'

const UserAdminCard = props => {

	return (
		<Fragment>
				<div className="col-2 mx-2 container-fluid d-flex justify-content-center align-items-center card-vh-roles landing-desktop">

				</div>
				<Card className="col-4 mx-2 container-fluid d-flex justify-content-center align-items-center card-vh-roles landing-desktop">
					<CardBody className="col-12 no-gutters">
						<CardTitle>
							<div className="">
									<p className="text-center mt-5 icon-desktop">
										<FaUserPlus
										className="heartbeat"
										size={125}
										/>
									</p>
								<CardBody className="mt-n4">
									<CardTitle className="mb-4">
										<h2 className="text-center card-title-desktop">ADMIN<br/>USERS</h2>
									</CardTitle>
									<CardSubtitle className="text-center card-subtitle mb-5">
										<Link to={`users/admin/1`} className="btn btn-md btn-block btn-primary mr-1">View</Link>
									</CardSubtitle>
								</CardBody>
							</div>
						</CardTitle>
					</CardBody>
				</Card>
				<Card className="col-4 mx-2 container-fluid d-flex justify-content-center align-items-center card-vh-roles landing-desktop">
					<CardBody className="col-12 no-gutters">
						<CardTitle>
							<div className="">
									<p className="text-center mt-5 icon-desktop">
										<FaUsers
										className="heartbeat"
										size={125}
										/>
									</p>
								<CardBody className="mt-n4">
									<CardTitle className="mb-4">
										<h2 className="text-center card-title-desktop">ORDINARY<br/>USERS</h2>
									</CardTitle>
									<CardSubtitle className="text-center card-subtitle mb-5">
										<Link to={`users/ordinary/2`} className="btn btn-md btn-block btn-primary mr-1">View</Link>
									</CardSubtitle>
								</CardBody>
							</div>
						</CardTitle>
					</CardBody>
				</Card>
		</Fragment>
	)
}

export default UserAdminCard;