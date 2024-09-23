import React, { useState, useEffect } from "react";
import axios from "axios";
import UserList from "./UserList";
import UserForm from "./UserForm";
import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const App = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    // Fetch users on component mount
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/users")
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    // Delete a user
    const handleDelete = (userId) => {
        axios.delete(`http://127.0.0.1:8000/api/users/${userId}`)
            .then(() => {
                setUsers(users.filter(user => user.id !== userId));
            })
            .catch(error => console.error(error));
    };

    // Edit a user (open form with user details)
    const handleEdit = (user) => {
        setSelectedUser(user);
    };

    return (
        <Container>
            <h1>User Management</h1>
            <UserForm selectedUser={selectedUser} setUsers={setUsers} />
            <UserList users={users} onDelete={handleDelete} onEdit={handleEdit} />
        </Container>
    );
};

export default App;
