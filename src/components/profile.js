import React, { useContext, useState } from "react";
import { UserContent } from "../App";
import { Card, CardContent, Typography, TextField, Button, Stack, Alert } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const { user, setUser } = useContext(UserContent);
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({ name: user?.name, email: user?.email });
  const [changePassword, setChangePassword] = useState(false);
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditValues({ name: user.name, email: user.email });
  };

  const handleSaveClick = () => {
    // Update local state
    setUser({ ...user, name: editValues.name, email: editValues.email });

    // Update data on JSON Server for name and email
    fetch(`http://localhost:9999/users/${user.id}`, {
      method: 'PATCH', // or 'PUT' if you prefer PUT
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: editValues.name, email: editValues.email }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setIsEditing(false); // Disable editing mode after successful update
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handlePasswordChange = () => {
    setChangePassword(true);
  };

  const handleCancelPasswordChange = () => {
    setChangePassword(false);
    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setError('');
    setSuccess('');
  };

  const handleSavePasswordChange = () => {
    // Validate passwords
    if (passwords.currentPassword === '' || passwords.newPassword === '' || passwords.confirmPassword === '') {
      setError('Please fill in all fields.');
      return;
    }
    if (passwords.newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError('New password and confirm password must match.');
      return;
    }

    // Check current password
    fetch(`http://localhost:9999/users/${user.id}`)
      .then(response => response.json())
      .then(data => {
        // Compare current password with entered currentPassword
        if (data.password !== passwords.currentPassword) {
          setError('Current password is incorrect.');
        } else {
          // Send request to update password
          fetch(`http://localhost:9999/users/${user.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: passwords.newPassword }),
          })
          .then(response => response.json())
          .then(data => {
            console.log('Password updated successfully:', data);
            setSuccess('Password updated successfully.');
            setChangePassword(false);
            setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setError('');
          })
          .catch((error) => {
            console.error('Error updating password:', error);
            setError('Error updating password. Please try again.');
          });
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data. Please try again.');
      });
  };

  const handlePasswordChangeInput = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({ ...prevPasswords, [name]: value }));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Profile
        </Typography>
        {isEditing ? (
          <Stack spacing={2}>
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              value={editValues.name}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              value={editValues.email}
              onChange={handleChange}
            />
            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="primary" onClick={handleSaveClick}>
                Save
              </Button>
              <Button variant="contained" color="secondary" onClick={handleCancelClick}>
                Cancel
              </Button>
            </Stack>
          </Stack>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary">
              Name: {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: {user.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Role: {user.role}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleEditClick}>
              Edit
            </Button>
            <Button variant="contained" color="secondary" onClick={handlePasswordChange}>
              Change Password
            </Button>
          </>
        )}

        {changePassword && (
          <Stack mt={2} spacing={2}>
            <TextField
              label="Current Password"
              type="password"
              name="currentPassword"
              variant="outlined"
              value={passwords.currentPassword}
              onChange={handlePasswordChangeInput}
            />
            <TextField
              label="New Password"
              type="password"
              name="newPassword"
              variant="outlined"
              value={passwords.newPassword}
              onChange={handlePasswordChangeInput}
            />
            <TextField
              label="Confirm New Password"
              type="password"
              name="confirmPassword"
              variant="outlined"
              value={passwords.confirmPassword}
              onChange={handlePasswordChangeInput}
            />
            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="primary" onClick={handleSavePasswordChange}>
                Save
              </Button>
              <Button variant="contained" color="secondary" onClick={handleCancelPasswordChange}>
                Cancel
              </Button>
            </Stack>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default Profile;
