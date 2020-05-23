import React, { Fragment, useState } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'
import Swal from 'sweetalert2'

const LoginForm = (props) => {

const [formData, setFormData] = useState({
	username: "",
	email: "",
	password: ""
})

const { username, email, password } = formData

const [disabledBtn, setDisabledBtn] = useState(false)

const onChangeHandler = (e) => {
	setFormData({
		...formData,
		[e.target.name] : e.target.value
	})
}

const onSubmitHandler = async (e) => {
	e.preventDefault()
	props.setLoading(true)
	await props.login({
		variables: {
			...formData,
			username: username,
			// email: email,
			password: password
		}
	}).then(async response => {
		let data = response.data.login

		console.log("LOGIN DATA", data)

		if(data != null){
			localStorage.setItem("token", data.token)
			localStorage.setItem("_id", data._id)
			localStorage.setItem("roleId", data.roleId)
			localStorage.setItem("firstName", data.firstName)
			localStorage.setItem("lastName", data.lastName)
			localStorage.setItem("username", data.username)
			localStorage.setItem("email", data.email)

			Swal.fire({
				title: "Success",
				text: "Welcome, " + data.firstName.charAt(0).toUpperCase() + data.firstName.slice(1) + " " + data.lastName.charAt(0).toUpperCase() + data.lastName.slice(1) + "!",
				icon: "success",
				showConfirmationButton: false,
				timer: 3000
			})

			return window.location = "/"
			props.setLoading(false)
		} else {
			props.setLoading(false)
			localStorage.removeItem("token")
			localStorage.removeItem("_id")
			localStorage.removeItem("roleId")
			localStorage.removeItem("firstName")
			localStorage.removeItem("lastName")
			localStorage.removeItem("username")
			localStorage.removeItem("email")
			Swal.fire({
				title: "Error",
				text: "Username, Email or Password don't match!",
				icon: "error",
				showConfirmationButton: false,
				timer: 30000
			})
			console.log(e)
		}
	})
}

	return (	
		<Fragment>
			<Form onSubmit={ e => onSubmitHandler(e) } className="login">
				<FormGroup className="mt-3">
					<Input
						type="text"
						name="username"
						id="username"
						value={username}
						pattern='[a-zA-Z0-9.@]+'
						onChange={ e => onChangeHandler(e) }
						placeholder="Username or Email"
					/>
				</FormGroup>
				<FormGroup>
					<Input
						type="password"
						name="password"
						id="password"
						value={password}
						onChange={ e => onChangeHandler(e) }
						placeholder="Password"
					/>
				</FormGroup>
				<button className="btn btn-md btn-block btn-primary rounded-pill px-3 mb-3">Login</button>
				<p className="d-flex justify-content-center">
						Don't have an account yet? <Link to="/register">&nbsp;Register</Link>
				</p>
			</Form>
			<div className="d-flex justify-content-center mt-5 login-credential">
				<div className="">
					<div className="row d-flex justify-content-center">
						<h6>LOGIN CREDENTIALS</h6>
					</div>
					<table className="">
						<tr>
							<th className="text-center px-3">USERNAME</th>
							<th className="text-center px-3">PASSWORD</th>
							<th className="text-center px-3">ROLE</th>
						</tr>
						<tr>
							<td className="text-center">admin123</td>
							<td className="text-center">123123123</td>
							<td className="text-center">admin</td>
						</tr>
						<tr>
							<td className="text-center">user123</td>
							<td className="text-center">123123123</td>
							<td className="text-center">user</td>
						</tr>
					</table>
				</div>
			</div>
		</Fragment>
	)

}

export default LoginForm