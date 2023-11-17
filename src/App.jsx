import React, { useEffect, useState } from 'react'
import './App.css'

import { AuthProvider, useAuth } from './use-auth-client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './components/ICRC/dashboard'
import Login from './components/Login'
function App() {
  const { isAuthenticated } = useAuth()

  return <>{isAuthenticated ? <Dashboard /> : <Login />}</>
}

export default () => (
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
)
