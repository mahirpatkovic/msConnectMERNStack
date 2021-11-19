import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            await axios
                .get('https://msconnectapp.herokuapp.com/api/users')
                .then((res) => {
                    console.log(res.data.allUsers);
                    setUsers(res.data.allUsers);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        getUsers();
    }, []);
    return (
        <div>
            Home Page
            {users &&
                users.map((user, index) => <p key={index}>{user.email}</p>)}
        </div>
    );
}

export default Home;
