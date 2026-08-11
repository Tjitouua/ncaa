import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import Dashboard from './pages/administrator/Dashboard'
import Employees from './pages/administrator/Employees'
import Programs from './pages/administrator/Programs'
import Assign from './pages/administrator/Assign'
// import Certifications from './pages/administrator/Certifications'
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
import TrainingDetails from './pages/administrator/TrainingDetails'
import NotificationsStaff from './pages/staff/NotificationsStaff'
import Home from './pages/Home'
import TrainingMatrix from './pages/administrator/TrainingMatrix'
import StaffCompliance from './pages/administrator/StaffCompliance'
import TrainingRequests from './pages/administrator/TrainingRequests'
import RequestTraining from './pages/staff/RequestTraining'
import StaffProgramAdd from './pages/staff/ProgramAdd'
import RequestDetails from './pages/staff/RequestDetails'
import AdminRequestDetails from './pages/administrator/RequestDetails'




function App() {
  return (
   <BrowserRouter>
     <ScrollToTop />
      <Routes>

        {/* Admin pages  */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password" element={<Password />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/employees" element={<Employees />} />
          <Route path="/admin/employees/employee_add" element={<EmployeeAdd />} />
          <Route path="/admin/employees/employee_details/:id" element={<EmployeeDetails />} />
          <Route path="/admin/training_programs/" element={<Programs />} />
          <Route path="/admin/training_programs/program_add" element={<ProgramAdd />} />
          <Route path="/admin/training_programs/program_details/:id" element={<ProgramDetails />} />
          <Route path="/admin/assign_training" element={<Assign />} />
          <Route path="/admin/training_details/:id" element={<TrainingDetails />} />
          <Route path="/admin/training_history" element={<TrainingHistory />} />
          <Route path="/admin/notifications" element={<Notifications />} />
          <Route path="/admin/training_matrix" element={<TrainingMatrix />} />
          <Route path="/admin/staff_compliance" element={<StaffCompliance />} />
          <Route path="/admin/training_requests" element={<TrainingRequests />} />
          <Route path="/admin/request_details/:id" element={<AdminRequestDetails />} />


          {/* Staff pages  */}
          <Route path="/staff/dashboard" element={<Dashboard2 />} />
          <Route path="/staff/my_certifications" element={<MyCertifications />} />
          <Route path="/staff/my_training_history" element={<MyTrainingHistory />} />
          <Route path="/staff/assignment_details/:id" element={<AssignmentDetails />} />
          <Route path="/staff/notifications" element={<NotificationsStaff />} />
          <Route path="/staff/request_training" element={<RequestTraining />} />
          <Route path="/staff/programs/program_add" element={<StaffProgramAdd />} />
          <Route path="/staff/request_training/request_details/:id" element={<RequestDetails />} />


      </Routes>
   </BrowserRouter>
  )
}

export default App
