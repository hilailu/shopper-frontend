import {useEffect, useState} from 'react';
import {getAllUsers, updateUserRole} from "../services/UserService.js";

function UserComponent() {

    const [users, setUsers] = useState([])
    const [selectedRoles, setSelectedRoles] = useState({});

    useEffect(() => {
        getUsers();
    }, []);

    function getUsers(){
        getAllUsers().then((response) => {
            setUsers(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    const handleChangeRole = (userId, e) => {
        const role = e.target.value;
        setSelectedRoles({ ...selectedRoles, [userId]: role });

        const userRole = { id: userId, role };

        updateUserRole(userRole).then((response) => {
            getUsers();
        }).catch(error => {
            console.error(error);
        });
    };

    return (
        <div className="catalog container">
            <br/>
            <h2 className="text-center">Users</h2>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Login</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.login}</td>
                        <td>{user.email}</td>
                        <td>
                            <select
                                value={selectedRoles[user.id] || user.role.name}
                                onChange={(e) => handleChangeRole(user.id, e)}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserComponent;
