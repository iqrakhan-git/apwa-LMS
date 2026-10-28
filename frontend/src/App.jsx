import { Routes , Route } from "react-router-dom"
import Login from "./pages/Login"
import StudentDashboard from "./pages/StudentDasboard"
import Courses from "./pages/Studentdasboardpages/Courses"
import Attendance from "./pages/Studentdasboardpages/Attendance"
import MyProfile from "./pages/Studentdasboardpages/Myprofile"
import Grades from "./pages/Studentdasboardpages/Grades"
import Announcements from "./pages/Studentdasboardpages/Announcements"
import Settings from "./pages/Studentdasboardpages/Settings"
import Assignments from "./pages/Studentdasboardpages/Assignments"

function App() {
  return (
    <>
    <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<StudentDashboard/>} />
        <Route path="/attendance" element={<Attendance/>} />
        <Route path="/assignments" element={<Assignments/>} />
        <Route path="/announcements" element={<Announcements/>} />
        <Route path="/grades" element={<Grades/>} />
        <Route path="/profile" element={<MyProfile/>} />
        <Route path="/settings" element={<Settings/>} />
         <Route path="/courses" element={<Courses/>}/>
      </Routes>
      </>
  )
}

export default App