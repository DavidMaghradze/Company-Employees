import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import '../global.css';
import Container from '@material-ui/core/Container';
import data from '../data.json';
import Header from './header/header';
import Users from './users';
import UserAdd from './users/UserAdd';
import UserEdit from './users/UserEdit';
import { UsersContext } from '../context/UserContext';

class App extends React.Component {

    updateUsers = user => {
        this.setState({ users: [user, ...this.state.users] })
    }
    
    deleteUser = userId => {
        const users = this.state.users.filter(user => user.id!==userId);
        this.setState({ users })
    }

    editUser = updatedUser => {
        const updatedUsers = [...this.state.users]
        updatedUsers.forEach((user, i)=>{
            if(user.id==updatedUser.id) {
                updatedUsers[i] = updatedUser;
            }
        })
        this.setState({ users: updatedUsers })
    }

    state = {
        users: [],
        addUser: this.updateUsers,
        deleteUser: this.deleteUser,
        editUser: this.editUser
    }

    componentDidMount(){
        this.setState({ users: data })
    }
    
    render(){
        return (
            <UsersContext.Provider value={this.state}>
                <Container maxWidth={'lg'}>
                    <CssBaseline/>
                    <BrowserRouter>
                        <div id="modal"></div>
                        <Header/>
                        <Switch>
                            <Route path="/users/:id/edit" component={UserEdit}/>
                            <Route path="/users/add" component={UserAdd}/>
                            <Route path="/" render={ (props)=> <Users {...props}  users={this.state.users}/>}/>
                        </Switch>
                    </BrowserRouter>
                </Container>
            </UsersContext.Provider>
        )
    }
};

export default App;