import './Nav.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faComment, faRobot, faCog, faUser, faLock, faSignOutAlt, faSignInAlt, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';

function Nav() {
  const [navContent, setNavContent] = useState(null); // Initialize as null to avoid undefined
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleDropdownItemClick = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    // Function to set nav content based on role
    const updateNavContent = () => {
      const role = localStorage.getItem('role');
      if (role === 'admin') {
        setNavContent(
          <header className="header">
            <div className="container">
              <nav className="navbar navbar-default yamm">
                <div className="navbar-header">
                  <div className="logo-normal">
                    <a className="navbar-brand" style={{ display: 'flex' }}>
                      <img src="./assets/images/favicon.ico" alt="Faculty Forum" />
                      <h4
                        style={{
                          color: '#fff',
                          fontStyle: 'italic',
                          marginTop: '10px',
                        }}
                      >
                        Faculty Forum
                      </h4>
                    </a>
                  </div>
                </div>
                <div id="navbar-content" className="navbar-collapse collapse">
                  <ul className={`nav navbar-nav navbar-right ${isNavOpen ? 'show' : ''}`}>
                  <li>
                      <Link to="/admin">
                        <FontAwesomeIcon icon={faHome} style={{ marginRight: '10px' }} />
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/manageuser">
                        <FontAwesomeIcon icon={faUsers} style={{ marginRight: '10px' }} />
                        Manage User
                      </Link>
                    </li>
                    <li>
                      <Link to="/cpadmin">
                        <FontAwesomeIcon icon={faLock} style={{ marginRight: '10px' }} />
                        Change Password
                      </Link>
                      <Link to="/epadmin">
                        <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} />
                        Edit Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/logout">
                        <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '10px' }} />
                        LogOut
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </header>
        );
      } else if (role === 'user') {
        setNavContent(
          <header className="header">
            <div className="container">
              <nav className="navbar navbar-default yamm">
                <div className="navbar-header">
                  
                  <div className="logo-normal">
                    <a className="navbar-brand" style={{ display: 'flex' }}>
                      <img src="./assets/images/favicon.ico" alt="Faculty Forum" />
                      <h4
                        style={{
                          color: '#fff',
                          fontStyle: 'italic',
                          marginTop: '10px',
                        }}
                      >
                        Faculty Forum
                      </h4>
                    </a>
                  </div>
                </div>
                <div id="navbar-content" className="navbar-collapse collapse">
                  <ul className={`nav navbar-nav navbar-right ${isNavOpen ? 'show' : ''}`}>
                    <li>
                      <Link to="/user">
                        <FontAwesomeIcon icon={faHome} style={{ marginRight: '8px' }} />
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/feedback">
                        <FontAwesomeIcon icon={faComment} style={{ marginRight: '8px' }} />
                        Feedback
                      </Link>
                    </li>
                    <li>
                      <Link to="/chatbot">
                        <FontAwesomeIcon icon={faRobot} style={{ marginRight: '8px' }} />
                        Chat Bot
                      </Link>
                    </li>
                    <li className="dropdown">
                      <a
                        onClick={toggleDropdown}
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        aria-expanded={isDropdownOpen}
                        aria-haspopup="true"
                        role="button"
                      >
                        <FontAwesomeIcon icon={faCog} style={{ marginRight: '8px' }} />
                        Settings
                        <span
                          style={{
                            marginLeft: '5px',
                            fontSize: '12px',
                            transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s',
                          }}
                        >
                          ▼
                        </span>
                      </a>
                      {isDropdownOpen && (
                        <ul className="dropdown-menu" role="menu">
                          <li>
                            <Link
                              to="/profile"
                              role="menuitem"
                              onClick={handleDropdownItemClick}
                            >
                              <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} />
                              Profile
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/cpuser"
                              role="menuitem"
                              onClick={handleDropdownItemClick}
                            >
                              <FontAwesomeIcon icon={faLock} style={{ marginRight: '10px' }} />
                              Update Password
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/logout"
                              role="menuitem"
                              onClick={handleDropdownItemClick}
                            >
                              <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '10px' }} />
                              Logout
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </header>
        );
      } else if (role === 'faculty') {
        setNavContent(
          <header className="header">
            <div className="container">
              <nav className="navbar navbar-default yamm">
                <div className="navbar-header">
                  
                  <div className="logo-normal">
                    <a className="navbar-brand" style={{ display: 'flex' }}>
                      <img src="./assets/images/favicon.ico" alt="Faculty Forum" />
                      <h4
                        style={{
                          color: '#fff',
                          fontStyle: 'italic',
                          marginTop: '10px',
                        }}
                      >
                        Faculty Forum
                      </h4>
                    </a>
                  </div>
                </div>
                <div id="navbar-content" className="navbar-collapse collapse">
                  <ul className={`nav navbar-nav navbar-right ${isNavOpen ? 'show' : ''}`}>
                    <li>
                      <Link to="/faculty">
                        <FontAwesomeIcon icon={faHome} style={{ marginRight: '8px' }} />
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/facultyfeedback">
                        <FontAwesomeIcon icon={faComment} style={{ marginRight: '8px' }} />
                        View Feedback
                      </Link>
                    </li>
                    <li>
                      <Link to="/cpfaculty">
                        <FontAwesomeIcon icon={faLock} style={{ marginRight: '10px' }} />
                        Change Password
                      </Link>
                      <Link to="/epfaculty">
                        <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} />
                        Edit Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/logout">
                        <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '8px' }} />
                        LogOut
                      </Link>
                    </li>
                         
                    
                  </ul>
                </div>
              </nav>
            </div>
          </header>
        );
      } 
      
      else {
        setNavContent(
          <header className="header">
            <div className="container">
              <nav className="navbar navbar-default yamm">
                <div className="navbar-header">
                  <div className="logo-normal">
                    <a className="navbar-brand" style={{ display: 'flex' }}>
                      <img src="./assets/images/favicon.ico" alt="Faculty Forum" />
                      <h4
                        style={{
                          color: '#fff',
                          fontStyle: 'italic',
                          marginTop: '10px',
                        }}
                      >
                        Faculty Forum
                      </h4>
                    </a>
                  </div>
                </div>
                <div id="navbar-content" className="navbar-collapse collapse">
                  <ul className={`nav navbar-nav navbar-right ${isNavOpen ? 'show' : ''}`}>
                    <li>
                      <Link to="/login">
                        <FontAwesomeIcon icon={faSignInAlt} style={{ marginRight: '8px' }} />
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to="/register">
                        <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: '8px' }} />
                        Register
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </header>
        );
      }
    };

    // Call the function to set nav content initially
    updateNavContent();

    // Handle clicks outside to close dropdown
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown') && !event.target.closest('.dropdown-menu')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isNavOpen, isDropdownOpen]); // Dependencies for useEffect

  return <>{navContent}</>;
}

export default Nav;