import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { UsersContext } from '../../context/UserContext';
import Modal from '../portals/modal';

const Users = ({ history, users }) => {
    console.log(history)

    const [ userToDelete, setUserToDelete ] = useState({});
    const [ showModal, modalToggle ] = useState(false);

    const openModal = userId => { modalToggle(true); setUserToDelete(users.filter(user=>user.id === userId)) };
    
    const hideModal = () => modalToggle(false);

    const renderUsers = users => {
        return users.map( (user, i) => (
            <Grid item xs={12} md={6} lg={4} key={i}>
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe">
                                {user.firstname.charAt(0).toUpperCase()}
                            </Avatar>
                        }
                        title={`${user.firstname} ${user.lastname}`}
                        subheader={`${user.position ? user.position : ''}`}
                    />
                    <section>
                        <ul>
                            <span>Created - {user.createDate}</span>
                            <li><strong>Address:</strong> {user.address} </li>
                            <li><strong>Age:</strong> {user.age} </li>
                            <li><strong>Email:</strong> {user.email} </li>
                        </ul>
                    </section>
                    <CardActions style={{ justifyContent: "flex-end" }}>
                                    <Link to={`users/${user.id}/edit`}>
                                        <Button variant="contained" color="default">
                                            EDIT
                                        </Button>
                                    </Link>
                                    <Button onClick={()=>openModal(user.id)} variant="contained" color="secondary">
                                        Delete    
                                    </Button>
                    </CardActions>
                    { showModal &&
                      <Modal hideModal={hideModal} class="opened">
                          <div style={{padding: "20px"}}>
                                <h1>Are you sure you want to remove <strong>{userToDelete[0].firstname} {userToDelete[0].lastname}</strong> from list ?</h1>
                                <div className="ui buttons" style={{marginTop: '20px'}}>
                                    <UsersContext.Consumer>
                                        {({ deleteUser }) => (
                                            <>
                                                <Button onClick={()=>{ deleteUser(userToDelete[0].id); hideModal() }} variant="contained" color="secondary">Remove</Button>
                                                <div className="or"></div>
                                                <Button onClick={()=>hideModal()} variant="contained" color="default">Discard</Button>
                                            </>
                                        )}
                                    </UsersContext.Consumer>
                                </div>
                            </div>
                      </Modal> 
                    }
                </Card>
            </Grid>
        ))
    }

    return (
        <Grid container spacing={2} style={{width: '100%'}}>
            {renderUsers(users)}
        </Grid>
    )
};

export default Users;