import React, { useState } from 'react';

const UserForm = () => {
    // Initialize state for form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // To display success/error messages

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = { name, email, password };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const result = await response.json();
                setMessage('User created successfully!');
                // Reset form fields after successful submission
                setName('');
                setEmail('');
                setPassword('');
            } else {
                setMessage('Failed to create user. Please check your input.');
            }
        } catch (error) {
            setMessage('Error: ' + error.message);
        }
    };

    return (
        <div>
            <h2>Create User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Create User</button>
            </form>

            {message && <p>{message}</p>} {/* Display success or error message */}
        </div>
    );
};

export default UserForm;
