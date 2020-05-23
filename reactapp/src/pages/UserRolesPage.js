import React, { Fragment, useState } from 'react'
import { Container, Row, Col, Button, Form, FormGroup, Input, Card, CardBody, CardTitle, CardSubtitle, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';

import UserAdminCard from '../cards/UserAdminCard';

const UserRolesPage = props => {

	return (
		<Fragment>
			<h1 className="container-fluid text-center page-hdr mt-5">USER ROLES PAGE</h1>
				<div className="col-10 mr-5 offset-md-1">
					<Col className="landing-desktop d-flex col-12">
						<UserAdminCard />
					</Col>
				</div>
		</Fragment>
	)
}

export default UserRolesPage;