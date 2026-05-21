import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import Dashboard from './pages/administrator/Dashboard'
import Employees from './pages/administrator/Employees'
import Programs from './pages/administrator/Programs'
import Assign from './pages/administrator/Assign'
import Certifications from './pages/administrator/Certifications'
import TrainingHistory from './pages/administrator/TrainingHistory'
import Notifications from './pages/administrator/Notifications'
import EmployeeAdd from './pages/administrator/EmployeeAdd'


function App() {
  return (
   <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/employees" element={<Employees />} />
          <Route path="/admin/employees/employee_add" element={<EmployeeAdd />} />
          <Route path="/admin/training_programs" element={<Programs />} />
          <Route path="/admin/assign_training" element={<Assign />} />
          <Route path="/admin/certifications" element={<Certifications />} />
          <Route path="/admin/training_history" element={<TrainingHistory />} />
          <Route path="/admin/notifications" element={<Notifications />} />
      </Routes>
   </BrowserRouter>
  )
}

export default App
