import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginLogoutButton extends Component { 
    render () {
        const {isAuthenticated, onLogout} = this.props;
        return (
            <div className="nav-link">
                {isAuthenticated ? 
                    <button 
                        className="btn btn-danger btn-sm" 
                        onClick={onLogout}>Log out
                    </button> : 
                    <Link 
                        className="btn btn-secondary btn-sm" 
                        to='/login'>Log in
                    </Link>
                }
            </div>
        );
    }
}

export default LoginLogoutButton;