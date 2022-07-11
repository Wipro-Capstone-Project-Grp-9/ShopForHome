import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getUsers, deleteUser } from './apiAdmin';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const { user, token } = isAuthenticated();

  const loadUsers = () => {
    getUsers().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data)
        setUsers(data);
      }
    });
  };

  const destroy = (userId) => {
    deleteUser(userId, token).then((data) => {
      console.log(data)
      if (data.error) {
        console.log(data.error);
      } else {
        loadUsers();
      }
    })
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Layout
      title='Manage Users'
      description='Perform CRUD on users'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-12'>
          <h2 className='text-center'>All Users</h2>
          <hr />
          <ul className='list-group'>
            {
                users.map((u, i) => (
                    !u.role &&
                    <li
                        key={i}
                        className='list-group-item d-flex justify-content-between align-items-center'
                    >
                        <strong>{u.name}</strong>
                        <strong>{u.email}</strong>
                        <Link>
                            <span
                                onClick={() => destroy(u._id)}
                                className='badge badge-danger badge-pill'
                            >
                            Delete
                            </span>
                        </Link>
                    </li>
                ))
            }
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageUsers;
