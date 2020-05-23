import React, { Fragment, useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2';

const UserOrdinaryRow = (props) => {

const {
  toggle,
  user,
  index,
  GET_USERS_BY_ROLE_ID,
  updateUser,
  archiveUser,
  deleteUser,
  roleId
} = props

const {
	_id,
	firstName,
	lastName,
	username,
	email,
	isArchived,
	createdAt
} = user

const [disabledbtn, setDisabledBtn] = useState(false)

const onClickArchiveHandler = (e) => {
  e.preventDefault();
  archiveUser({
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
  // toggle(false, _id)
  Swal.fire({
    title: "Success",
    text: `"${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}" is ${user.isArchived ? "Unarchived" : "Archived"}`,
    icon: "success",
    showConfirmationButton: false,
    timer: 1500
  })
}

const onClickDeleteHandler = (e) => {
  e.preventDefault();
  Swal.fire({
    icon: "question",
    title: "Delete User",
    text: `Are you sure you want to delete "${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}"`,
    focusConfirm: false,
    showCloseButton: true
  }).then(response => {

    if(response.value){
      deleteUser({
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

useEffect(() => {
  if(user.isArchived == false && roleId == 2){
    setDisabledBtn(true)
  } else if(user.isArchived == true && roleId == 2){
    setDisabledBtn(true)
  }

  if(roleId == 2){
    setDisabledBtn(true)
  }

}, [props])

let archival = ""
if(user.isArchived == false) {
   archival = (
    <td><Button className="mb-1 btn btn-sm btn-success btn-block mx-1" onClick={ e => onClickArchiveHandler(e) } disabled> ACTIVE </Button></td>
  )
} else {
  archival = (
     <td><button className="mb-1 btn btn-sm btn-outline-secondary btn-block mx-1" onClick={ e => onClickArchiveHandler(e) } disabled>  ARCHIVED </button></td>
  )
}

	return (
    <Fragment>
        <tr className="bottom-border">
          <th className="text-center">{index}</th>
          <td className="text-left">{firstName.toUpperCase()} {lastName.toUpperCase()}</td>
          <td className="text-center">{moment(createdAt).fromNow()}</td>
          { archival }
          <td className="text-right">
              <Button className="mb-1 btn btn-sm btn-success ml-1" onClick={() => toggle(true, _id, firstName, lastName, username, email) } disabled={disabledbtn}><i class="fas fa-wrench"></i>&nbsp;&nbsp;UPDATE</Button>
          </td>
          <td className="text-right pr-4">
              <Link to={`/tasks/user/${_id}`} className="btn btn-sm btn-primary"><i class="fas fa-eye"></i>&nbsp;&nbsp;TASKS</Link>
          </td>
        </tr>
    </Fragment>
  )
}

export default UserOrdinaryRow;