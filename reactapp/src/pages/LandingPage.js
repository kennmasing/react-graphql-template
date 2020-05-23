import React, { Fragment } from 'react';

const LandingPage = (props) => {
	
	return (
		<Fragment>
			<div className="landing col-12 d-flex justify-content-center align-items-center">
				<div className="row">
					<div className="col col-12 d-flex justify-content-center align-items-center">
						<img src="https://res.cloudinary.com/kennmasing/image/upload/v1590210404/reactapp-template/codingarcht_logo_klw8o8.png" className="tmLogo"/>
					</div>
					<div className="col col-12 d-flex justify-content-center align-items-center">
						<a href="/login" className="btn btn-md btn-outline-white rounded-pill mt-3 px-5">Login</a>
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default LandingPage;