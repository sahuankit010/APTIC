import React from 'react';
import Login from './Login';

export default function Logout() {
    localStorage.removeItem("userId");

  return (
    <Login />
  )
}