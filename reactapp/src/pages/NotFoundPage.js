import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom'

const NotFoundPage = props => {
	return (
		<Container>
			<Row>
				<Col className="m-3">
					<h1 className="page-hdr">PAGE NOTFOUND</h1>
					<Link to="/" className="bottom-border navlink-body">> Return </Link>
				</Col>
			</Row>
		</Container>
	)
}

export default NotFoundPage;