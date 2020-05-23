import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { CREATE_USER } from '../graphql/mutations';

const RegisterForm = (props) => {

  const [ createUser ] = useMutation(CREATE_USER)
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    password2: ""
  })
  const { firstName, lastName, username, email, password, password2 } = formData;

  const [disabledBtn, setDisabledBtn] = useState(true); 
  const [isRedirected, setIsRedirected] = useState(false); 

  const onChangeHandler = e => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }

  const onSubmitHandler = async e => {
    e.preventDefault();
    props.setLoading(true)
    if(password !== password2) {
      Swal.fire({
        title: "Error",
        text: "Passwords don't match",
        icon: "error",
        showConfirmationButton: false,
        timer: 3000
      })
    } else {
      console.log(formData)
      const newUser = { firstName, lastName, username, email, password }
      try {
        createUser({
          variables: {...formData}
        })
        Swal.fire({
          title: "Success",
          text: "Successfully created new user!",
          icon: "success",
          showConfirmationButton: false,
          timer: 3000
        })
        setIsRedirected(true)
      } catch(e) {
        props.setLoading(false)
        Swal.fire({
              title: "Error",
              text: "Registration error",
              icon: "error",
              showConfirmationButton: false,
              timer: 3000
            })
            console.log(e.message)
      }
    }
    props.setLoading(false) 
  }

  useEffect(() => {
    if(username !== "" && email !== "" && password !== "" && password2 !== "") {
      setDisabledBtn(false)
    } else {
      setDisabledBtn(true)
    }
  }, [formData])

  if(isRedirected) {
    return <Redirect to="/login" />
  }

  return (
    <Form className="cotainer container-fluid my-3 register" onSubmit={ e => onSubmitHandler(e) }>
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
      <FormGroup>
        <Label for="password" className="mb-n5">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={ e => onChangeHandler(e) }
          minLength="8"
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="password2" className="mb-n5">Confirm Password</Label>
        <Input
          type="password"
          name="password2"
          id="password2"
          value={password2}
          onChange={ e => onChangeHandler(e) }
          minLength="8"
          required
          className="mb-4"
        />
      </FormGroup>
      <Button color="primary" className="btn btn-block btn-primary mb-3 rounded-pill" disabled={disabledBtn}>Register</Button>
      <p className="d-flex justify-content-center">Already have an account? <Link to="/login">&nbsp;Login</Link></p>
    </Form>
  )
}

export default RegisterForm;