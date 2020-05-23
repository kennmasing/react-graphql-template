import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Table, Spinner } from 'reactstrap';
import Swal from 'sweetalert2';

const UserOrdinaryModal = (props) => {

const {
    modal,
    setModal,
    toggle,
    user,
    _id,
    firstName,
    lastName,
    username,
    email,
    password,
    updateUser,
    archiveUser,
    deleteUser,
    onChangeModal,
    modalData,
    setModalData,
    GET_USERS_BY_ROLE_ID,
    setLoading,
    usersAdminLoading
} = props

const onClickArchiveHandler = async (e) => {
    e.preventDefault();
    try{
        await archiveUser({
            variables: {
                _id,
                isArchived: !user.isArchived
            },
            refetchQueries: [
                {
                    query: GET_USERS_BY_ROLE_ID,
                    variables: {
                        roleId: 2
                    }
                }
            ]
        })
        if(usersAdminLoading) return <Spinner color="primary" />
        toggle(false, _id, firstName, lastName, username, email, password)
        Swal.fire({
            title: "Success",
            text: `"${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}" is ${user.isArchived ? "Activated" : "Archived"}`,
            icon: "success",
            showConfirmationButton: false,
            timer: 1500
        })
    } catch(e) {
        setLoading(false)
        console.log(e)
        //SWAL ERROR
    }
}

const onClickDeleteHandler = (e) => {
    e.preventDefault();
    Swal.fire({
        icon: "question",
        title: "Delete User",
        text: `Are you sure you want to delete "${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}"`,
        focusConfirm: false,
        showCloseButton: true
    }).then(async response => {

        if(response.value){
            setLoading(true)
            await deleteUser({
                variables: {
                _id
                },
                refetchQueries: [
                    {
                        query: GET_USERS_BY_ROLE_ID,
                        variables: {
                            roleId: 2
                        }
                    }
                ]
            })
            setLoading(false)
            Swal.fire({
                title: "Success",
                text: `"${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}" Deleted`,
                icon: "success",
                showConfirmationButton: false,
                timer: 2250
            })
        }
    })
}

const onSubmitModal = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
        await updateUser({
            variables: {...modalData},
            refetchQueries: [
                {
                    query: GET_USERS_BY_ROLE_ID,
                    variables: {
                        roleId: 2
                    }
                }
            ]
        })
        Swal.fire({
            title: "Success",
            text: `"${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}" Updated.`,
            icon: "success",
            showConfirmationButton: false,
            timer: 2250       
        })
        setModalData({
            _id: "",
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: ""
        })
        setLoading(false)
        setModal(!modal)
    } catch(e) {
        setLoading(false)
        console.log(e)
        //SWAL ERROR
        Swal.fire({
            title: "Error",
            text: e.response,
            icon: "error",
            showConfirmationButton: false,
            timer: 2250       
        })
    }
}

  let archival = ""
  if(user.isArchived == false) {
     archival = (
      <Button className="mb-1 btn btn-sm btn-block btn-success btn-block" onClick={ e => onClickArchiveHandler(e) } ><i class="fas fa-archive"></i>&nbsp;&nbsp; ACTIVE </Button>
    )
  } else {
    archival =(
      <Button className="mb-1 btn btn-sm btn-block btn-secondary btn-block" onClick={ e => onClickArchiveHandler(e) } ><i class="fas fa-archive"></i>&nbsp;&nbsp;  ARCHIVED </Button>
    )
  }

 return (
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Update Task</ModalHeader>
        <ModalBody>
            <Form onSubmit={ e => onSubmitModal(e) }>
                <FormGroup>
                    <Label className="">First Name</Label>
                    <Input
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={ e => onChangeModal(e) }
                        maxLength="20"
                        pattern="[a-zA-Z\s]+"
                    />
                </FormGroup>
                <FormGroup>
                    <Label className="">Last Name</Label>
                    <Input
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={ e => onChangeModal(e) }
                        maxLength="20"
                        pattern="[a-zA-Z\s]+"
                    />
                </FormGroup>
                <FormGroup>
                    <Label className="">Username</Label>
                    <Input
                        type="text"
                        name="username"
                        value={username}
                        onChange={ e => onChangeModal(e) }
                        maxLength="20"
                        pattern="[a-zA-Z0-9]+"
                    />
                </FormGroup>
                <FormGroup>
                    <Label className="">Email</Label>
                    <Input
                        type="text"
                        name="email"
                        value={email}
                        onChange={ e => onChangeModal(e) }
                    />
                </FormGroup>
                <Table className="">
                    <thead>
                        <th>ACTIONS</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="md-12 no-gutters">
                                {archival}
                                <Button className="mb-1 btn btn-sm btn-block btn-warning" onClick={ e => onClickDeleteHandler(e) }><i class="fas fa-trash-alt"></i>&nbsp;&nbsp;DELETE</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <div className=" d-flex justify-content-end no-gutters">
                    <Button color="primary" className="mr-1">Update</Button>{' '}
                    <Button color="secondary" onClick={()=> toggle(true, _id, firstName, lastName, username, email, password) }>Cancel</Button>
                </div>
            </Form>
        </ModalBody>
      </Modal>
  );
}

export default UserOrdinaryModal;