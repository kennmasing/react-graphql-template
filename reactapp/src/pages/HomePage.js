import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom'

const HomePage = props => {
	return (
		<Container>
			<Row>
				<Col className="m-3">
					<h1 className="page-hdr">HOMEPAGE</h1>
					<Link to="/" className="bottom-border navlink-body">> Return </Link>
				</Col>
			</Row>
		</Container>
	)
}

export default HomePage;