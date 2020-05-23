import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Card, CardImg, CardText, CardBody, CardLink, CardTitle, CardSubtitle } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';

const UserOrdinaryForm = (props) => {

	const {
		createUser,
		GET_USERS_BY_ROLE_ID,
		setLoading
	} = props;

  const [formData, setFormData] = useState({
	    firstName: "",
	    lastName: "",
	    username: "",
	    email: "@thinkingmachines.com",
	    password: "123123123",
	    roleId: 2
  })

	const { firstName, lastName, username, email, roleId } = formData

	const [disabledBtn, setDisabledBtn] = useState(true);
	const [isRedirected, setIsRedirected] = useState(false);

	const onChangeHandler = e => {
		setFormData({
			...formData,
			username: `${firstName}${lastName}`,
			email: `${firstName}${lastName}@thinkingmachines.com`,
			[e.target.name] : e.target.value
		})
	}

	const onSubmitHandler = async e => {
		e.preventDefault()
		setLoading(true)
		try {
			await createUser({
				variables: {...formData},
				refetchQueries: [
					{
						query: GET_USERS_BY_ROLE_ID,
						variables: {
							roleId
						}
					}
				]
			})
        	Swal.fire({
              title: "Success",
              html: `User Creation Successful!<br>Name: "${firstName.toUpperCase()} ${lastName.toUpperCase()}"`,
              icon: "success",
              showConfirmationButton: false,
              timer: 3000
            })
         	setFormData({
			    firstName: "",
			    lastName: "",
			    username: "",
			    email: "",
			   	password: "123123123",
	    		roleId: 2
	        })
	        setLoading(false)
		} catch(e) {
			setLoading(false)
			console.log(e)
			 Swal.fire({
              title: "Error",
              text: "User Creation: Error",
              icon: "error",
              showConfirmationButton: false,
              timer: 3000
            })
		}
	}

  useEffect(() => {
    if(firstName !== "" && lastName !== "" && username !== "" && email !== "") {
      setDisabledBtn(false)
    } else {
      setDisabledBtn(true)
    }
  }, [formData])

  let adminForm = ""
  if(props.roleId == 1){
  	adminForm = (
  		<Fragment>
  		<Form className="mb-5 container-fluid col-12 border-light-grey rounded" onSubmit={ e => onSubmitHandler(e) }>
			<div className=" d-flex justify-content-center mt-3">
				<h4 className="form-hdr">ADD NEW USER</h4>
			</div>
			 <FormGroup>
	            <Label for="firstName" className="mb-n5">First Name</Label>
	            <Input
	              type="text"
	              name="firstName"
	              id="firstName"
	              value={firstName}
	              onChange={ e => onChangeHandler(e) }
	              maxLength="20"
	              pattern="[a-zA-Z\s]+"
	              required
	            />
	      </FormGroup>
	      <FormGroup>
	            <Label for="lastName" className="mb-n5">Last Name</Label>
	            <Input
	              type="text"
	              name="lastName"
	              id="lastName"
	              value={lastName}
	              onChange={ e => onChangeHandler(e) }
	              maxLength="20"
	              pattern="[a-zA-Z\s]+"
	              required
	            />
	      </FormGroup>
	      <FormGroup>
	            <Label for="username" className="mb-n5">Username</Label>
	            <Input
	              type="text"
	              name="username"
	              id="username"
	              value={username}
	              onChange={ e => onChangeHandler(e) }
	              maxLength="20"
	              pattern="[a-zA-Z0-9]+"
	              required
	            />
	      </FormGroup>
	      <FormGroup>
	        <Label for="email" className="mb-n5">Email</Label>
	        <Input
	          type="email"
	          name="email"
	          id="email"
	          value={email}
	          onChange={ e => onChangeHandler(e) }
	          required
	        />
	      </FormGroup>
			<Button className="btn btn-block btn-primary mb-4" disabled={disabledBtn}>Save Changes</Button>
		</Form>
		</Fragment>
	)
  } else if(props.roleId == 2) {
  	adminForm = (
  		<Fragment>
  		<Form className="mb-5 container-fluid col-12 border-light-grey rounded" onSubmit={ e => onSubmitHandler(e) }>
			<div className=" d-flex justify-content-center mt-3">
				<h4 className="form-hdr">ADD NEW ADMIN</h4>
			</div>
			 <FormGroup>
	            <Label for="firstName" className="mb-n5">First Name</Label>
	            <Input
	              type="text"
	              name="firstName"
	              id="firstName"
	              value={firstName}
	              onChange={ e => onChangeHandler(e) }
	              maxLength="20"
	              pattern="[a-zA-Z\s]+"
	              required
	              disabled
	            />
	      </FormGroup>
	      <FormGroup>
	            <Label for="lastName" className="mb-n5">Last Name</Label>
	            <Input
	              type="text"
	              name="lastName"
	              id="lastName"
	              value={lastName}
	              onChange={ e => onChangeHandler(e) }
	              maxLength="20"
	              pattern="[a-zA-Z\s]+"
	              required
	              disabled
	            />
	      </FormGroup>
	      <FormGroup>
	            <Label for="username" className="mb-n5">Username</Label>
	            <Input
	              type="text"
	              name="username"
	              id="username"
	              value={username}
	              onChange={ e => onChangeHandler(e) }
	              maxLength="20"
	              pattern="[a-zA-Z0-9]+"
	              required
	              disabled
	            />
	      </FormGroup>
	      <FormGroup>
	        <Label for="email" className="mb-n5">Email</Label>
	        <Input
	          type="email"
	          name="email"
	          id="email"
	          value={email}
	          onChange={ e => onChangeHandler(e) }
	          required
	          disabled
	        />
	      </FormGroup>
			<Button className="btn btn-block btn-primary mb-4" disabled={disabledBtn}>Save Changes</Button>
		</Form>
		</Fragment>
	)
  }

  return(
   <Fragment>
		{adminForm}
	</Fragment>
  )
}

export default UserOrdinaryForm;