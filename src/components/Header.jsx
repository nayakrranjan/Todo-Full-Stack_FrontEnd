import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from './security/AuthContext'

const Header = ({username}) => {
    const authContext = useAuth();

  return (
    <header className="border-bottom border-light border-5 mb-5 p-2">
        <div className="container">
            <div className="row">
                <nav className="navbar navbar-expand-lg">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item fs-5" style={{fontWeight:"bold"}}>Hello, {username}</li>
                        </ul>
                    </div>
                    <ul className="navbar-nav">
                        <li className="nav-item fs-5">
                            <Link className="nav-link" to="/logout" onClick={() => authContext.logout()}>
                                Logout
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
  )
}

export default Header