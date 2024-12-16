import React from 'react'
import { useAuth } from '../store/Auth'

function About() {
  const {user}=useAuth();
  return (
    <div>Welcome  {user ? `${user.username} to our website`: `to our website`} </div>
  )
}

export default About;