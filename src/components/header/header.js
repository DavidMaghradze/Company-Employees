import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import Button from '@material-ui/core/Button';

const Header = () => (
    <header>
        <div className="header__row">
            <Link to="/">
                <div className="logo">
                    <img src="img/logo.png"></img>
                    <h1>INTROO</h1>
                </div>
            </Link>
            <div>
                <Link to="users/add">
                    <Button variant="contained" color="primary">
                        Add Employee
                    </Button>
                </Link>
            </div>
        </div>
    </header>
);

export default Header;