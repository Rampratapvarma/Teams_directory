import logo from './logo.svg';
import './style.css';
import { useEffect, useState } from 'react';

function App() {

  const [usersData, setUsersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdminContainer, setShowAdminContainer] = useState(true);
  const [showMemberContainer, setShowMemberContainer] = useState(true);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  
  useEffect(() => {
    fetch('https://mocki.io/v1/ddb7e0a8-e218-4e36-b1be-b902cdb1c098')
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setUsersData(res);
        setIsLoading(false); 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = usersData.filter(user => {
    const fullName = user.first_name + ' ' + user.last_name;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <header>
        <h1>Teams</h1>
        <div className="search-container">
          <i className="fas fa-search" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'black', cursor: 'pointer' }}></i>
          <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} style={{ paddingLeft: '30px' }} />
        </div>
      </header>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="Main-container">
          {showAdminContainer && (
            <div className="administrators-container">
              {filteredUsers.some(user => user.role === 'admin') && <h2>Administrators</h2>}
              <div className="grid-container">
                {filteredUsers.map(user => {
                  if (user.role === 'admin') {
                    return (
                      <div className="card" key={user.id}>
                        <div className="user-profile">
                          <img src={user.img} alt="User Profile" />
                        </div>
                        <div className="user-name">
                          {user.first_name + ' ' + user.last_name}
                        </div>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
          )}
          {showMemberContainer && (
            <div className="members-container">
              {filteredUsers.some(user => user.role === 'member') && <h2>Members</h2>}
              <div className="grid-container">
                {filteredUsers.map(user => {
                  if (user.role === 'member') {
                    return (
                      <div className="card" key={user.id}>
                        <div className="user-profile">
                          <img src={user.img} alt="User Profile" />
                        </div>
                        <div className="user-name">
                          {user.first_name + ' ' + user.last_name}
                        </div>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
          )}
          {filteredUsers.length === 0 && <h4>No Results </h4>}
        </div>
      )}
      <div className="add-icon">
        <i className="fa fa-plus-circle"></i>
      </div>
    </>
  );
}

export default App;





