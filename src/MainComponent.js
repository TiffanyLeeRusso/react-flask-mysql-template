import React, { useState, useEffect, useRef } from 'react';
//import * as bootstrap from '../node_modules/bootstrap/dist/js/bootstrap.esm.min.js'
import './MainComponent.css';

const MainComponent = () => {

  // Variables
  const defaultFormData = {name: ""};
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState(defaultFormData);
  const [error, setError] = useState("");
  const key = useRef(0);

  // Functions

  // fetchData
  // dataType:string The URL for the backend; also used for the error message
  // parse:boolean JSON.parse or not
  // setFunc:Function callback to the set-state function for this data.
  const fetchData = (dataType, parse, setFunc) => {
    // This is the flask server url
    fetch("http://localhost:5000/" + dataType, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*' // PROD_REMOVE
        }
    }).then((res) => res.json()
        .then((result) => {
          if(result.status === "200" &&
             typeof(result.data) !== "undefined") {
            const data = parse ? JSON.parse(result.data) : result.data;
            setFunc([...data]);
          } else {
            setError("Error: Could not retrieve data.");
            console.error(`Scheduler::fetch ${dataType} got result ${result.status}.`);
          }
      })
    );
  };

  const fetchUsers = () => { fetchData("users", false, setUsers); };
  const fetchAll = () => {
    fetchUsers();
  }

  const updateFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  const addUser = () => {
    fetch("http://localhost:5000/users", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    }).then((res) => res.json()
        .then((result) => {
          if(result.status !== "200") {
            setError("Error: Could not add user.");
            console.error(`MainComponent::addUser got result ${result.status}.`);
          } else {
            fetchAll();
            setFormData(defaultFormData);
          }
      })
    );
  }

  const editUser = (e, id) => {
    fetch("http://localhost:5000/users", {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "id": id, "name": e.target.innerText })
    }).then((res) => res.json()
      .then((result) => {
        if(result.status !== "200") {
          setError("Error: Could not edit user.");
          console.error(`MainComponent::editUser got result ${result.status}.`);
        } else {
          fetchAll();
        }
      })
    );
  }

  const deleteUser = (id) => {
     fetch("http://localhost:5000/users", {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "id": id })
    }).then((res) => res.json()
        .then((result) => {
          if(result.status !== "200") {
            setError("Error: Could not delete user.");
            console.error(`MainComponent::deleteUser got result ${result.status}.`);
          } else {
            fetchAll();
          }
      })
    );
  }

  const renderUsers = () => {
    if(users.length > 0) {
      // Sort users by name
      users.sort((a, b) => { return a.name > b.name; });
      return (
      <div className="users">
        <div className="instructions"><p>To edit a user click on the name.</p><p>Updates are automatic unless an error is displayed.</p></div>
        <ul>
          { users.map((user) => 
            <li key={key.current++}>
              <div className="user-field" contentEditable="true" onInput={(e) => {editUser(e, user.id)}} suppressContentEditableWarning={true}>{user.name}</div>
              <button className="btn btn-secondary" title="Delete" onClick={()=>{deleteUser(user.id)}}>X</button>
            </li>
          )}
        </ul>
      </div>
      );
    } else {
      return (
        <div>No data to display.</div>
      );
    }
  };

  // Component init
  useEffect(() => {
    setError("");
    fetchAll();
    renderUsers();
  }, []);

  // HTML
  return (
    <div className="mainComponent">
      <h2>Users</h2>
      <div className="add-user">
        <label><div>Name</div><input type="text" name="name" value={formData.name} onChange={updateFormData}/></label>
        <button className="btn btn-primary" onClick={addUser}>Add User</button>
      </div>
      { error.length > 0 ? 
        (<>
         <div className="error">{error}</div>
         </>
        )
        :
        null
      }
      { renderUsers() }
    </div>
  );
}
export default MainComponent;