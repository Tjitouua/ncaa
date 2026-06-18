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
import EmployeeDetails from './pages/administrator/EmployeeDetails'
import ProgramAdd from './pages/administrator/ProgramAdd'
import ProgramDetails from './pages/administrator/ProgramDetails'
import Dashboard2 from './pages/staff/Dashboard'
import MyCertifications from './pages/staff/MyCertifications'
import MyTrainingHistory from './pages/staff/MyTrainingHistory'
import ScrollToTop from './ui/ScrollToTop'
import Password from './pages/login/Password'
import AssignmentDetails from './pages/staff/AssignmentDetails'


function App() {
  return (
   <BrowserRouter>
     <ScrollToTop />
      <Routes>

        {/* Admin pages  */}
          <Route path="/" element={<Login />} />
          <Route path="/password" element={<Password />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/employees" element={<Employees />} />
          <Route path="/admin/employees/employee_add" element={<EmployeeAdd />} />
          <Route path="/admin/employees/employee_details/:id" element={<EmployeeDetails />} />
          <Route path="/admin/training_programs/" element={<Programs />} />
          <Route path="/admin/training_programs/program_add" element={<ProgramAdd />} />
          <Route path="/admin/training_programs/program_details/:id" element={<ProgramDetails />} />
          <Route path="/admin/assign_training" element={<Assign />} />
          <Route path="/admin/certifications" element={<Certifications />} />
          <Route path="/admin/training_history" element={<TrainingHistory />} />
          <Route path="/admin/notifications" element={<Notifications />} />


          {/* Staff pages  */}
          <Route path="/staff/dashboard" element={<Dashboard2 />} />
          <Route path="/staff/my_certifications" element={<MyCertifications />} />
          <Route path="/staff/my_training_history" element={<MyTrainingHistory />} />
          <Route path="/staff/assignment_details" element={<AssignmentDetails />} />


      </Routes>
   </BrowserRouter>
  )
}

export default App
