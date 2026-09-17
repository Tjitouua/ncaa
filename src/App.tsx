import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import Dashboard from './pages/administrator/Dashboard'
import Employees from './pages/administrator/Employees'
import Assign from './pages/administrator/Assign'
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
import StaffProgramAdd from './pages/staff/ProgramAdd'
import TrainingPlans from './pages/administrator/TrainingPlans'
import ProtectedRoute from './ui/ProtectedRoute'
import Forgot from './pages/login/Forgot'




function App() {
  return (
   <BrowserRouter>
     <ScrollToTop />
      <Routes>

          {/* Public pages  */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password" element={<Password />} />
          <Route path="/forgot" element={<Forgot />} />

          {/* Admin pages  */}
          <Route element={<ProtectedRoute allowedRole='admin' />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/employees" element={<Employees />} />
          <Route path="/admin/employees/employee_add" element={<EmployeeAdd />} />
          <Route path="/admin/employees/employee_details/:id" element={<EmployeeDetails />} />
          <Route path="/admin/training_programs/program_add/:id" element={<ProgramAdd />} />
          <Route path="/admin/training_programs/program_details/:id" element={<ProgramDetails />} />
          <Route path="/admin/assign_training" element={<Assign />} />
          <Route path="/admin/training_details/:id" element={<TrainingDetails />} />
          <Route path="/admin/training_history" element={<TrainingHistory />} />
          <Route path="/admin/notifications" element={<Notifications />} />
          <Route path="/admin/training_plans/:id" element={<TrainingPlans />} />
          </Route>


          {/* Staff pages  */}
          <Route element={<ProtectedRoute allowedRole='staff' />}>
          <Route path="/staff/dashboard" element={<Dashboard2 />} />
          <Route path="/staff/my_certifications" element={<MyCertifications />} />
          <Route path="/staff/my_training_history" element={<MyTrainingHistory />} />
          <Route path="/staff/assignment_details/:id" element={<AssignmentDetails />} />
          <Route path="/staff/notifications" element={<NotificationsStaff />} />
          <Route path="/staff/programs/program_add" element={<StaffProgramAdd />} />
          </Route>


      </Routes>
   </BrowserRouter>
  )
}

export default App
