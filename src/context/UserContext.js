import React from 'react';

export const UsersContext = React.createContext({
    users: [],
    addUser: () => {},
    deleteUser: () => {},
    editUser: () => {}
})