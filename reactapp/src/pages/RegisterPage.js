import React, { Fragment, useState,	 useEffect } from 'react';

import RegisterForm from '../forms/RegisterForm'

import { useQuery, useMutation } from '@apollo/react-hooks'
import { CREATE_USER } from '../graphql/mutations'

// import tmLogo from '../images/tmLogoOrange.png'

const RegisterPage = (props) => {

	const [ createUser ] = useMutation(CREATE_USER)

	let w = window.innerWidth
	const [colSize, setColSize] = useState(null)

	console.log("WINDOW WIDTH", w)
	let colSizeNumber = ""
	if(w >= 375 && w <= 411){
		colSizeNumber = "col-12"
	} else if(w >= 412 && w <= 576){
		colSizeNumber = "col-12"
	} else if(w >= 577 && w <= 767){
		colSizeNumber = "col-12"
	} else if(w >= 768 && w <= 991){
		colSizeNumber = "col-10"
	} else if(w >= 992) {
		colSizeNumber = "col-10 form"
	}

	useEffect(() => {
		setColSize(colSizeNumber)
	}, [w])

	let colSizeImage = ""
	if(w >= 375 && w <= 411){
		colSizeImage = (
			""
		)
	} else if(w >= 412 && w <= 576){
		colSizeImage = (
			""
		)
	} else if(w >= 577){
		colSizeImage = (
			<div className="col col-7 register-bg">

			</div>
		)
	}

	let colSizeForm = ""
	if(w >= 375 && w <= 411){
		colSizeForm = "col-12 d-flex justify-content-center align-items-center register-form"
	} else if(w >= 412 && w <= 576){
		colSizeForm = "col-12 d-flex justify-content-center align-items-center register-form"
	} else if(w >= 577){
		colSizeForm = "col-5 d-flex justify-content-center align-items-center register-form"
	}

	return (
		<Fragment>
			<div className="container col-12 register-container">
				<div className="row">
					{ colSizeImage }
					<div className={`${colSizeForm}`}>
						<div className={`${colSize}`}>
							<div className="d-flex justify-content-center align-items-center register-left">
								<img src="https://res.cloudinary.com/kennmasing/image/upload/v1590210404/reactapp-template/codingarcht_logo_klw8o8.png" className="w-50"/>
							</div>

							<br/>
							{/*<h1 className="text-center"> register </h1>*/}
							<RegisterForm 
								createUser={createUser}
								setLoading={props.setLoading}
							/>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default RegisterPage;