import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
    // Initialize users state as an empty array
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users from API
        const fetchUsers = async () =>  {
            const response = await fetch(`http://127.0.0.1:8000/api/users`);
            const result = await response.json();
            console.log(result.data);
            setUsers(result.data);
        };
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>User List</h1>

                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
        </div>
    );
};

export default UserList;
