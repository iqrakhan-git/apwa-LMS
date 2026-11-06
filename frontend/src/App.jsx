import { Routes , Route } from "react-router-dom"
import Login from "./pages/Login"
import LoginT from "./pages/LoginT"
import StudentDashboard from "./pages/StudentDasboard"
import MyClasses from "./pages/Teacherdasboard/MyClasses"
import Attendance from "./pages/Studentdasboardpages/Attendance"
import AttendanceMark from "./pages/Teacherdasboard/AttendanceMark"
import MyProfile from "./pages/Studentdasboardpages/Myprofile"
import Grades from "./pages/Studentdasboardpages/Grades"
import GradesMark from "./pages/Teacherdasboard/GradesMark"
import Announcements from "./pages/Studentdasboardpages/Announcements"
import Settings from "./pages/Studentdasboardpages/Settings"
import TeacherSetting from "./pages/Teacherdasboard/TeacherSetting"
import Student from "./pages/Teacherdasboard/Student"
import Assignments from "./pages/Studentdasboardpages/Assignments"
import Welcome from "./pages/Welcome";
import TeacherDashboard from './pages/Teacherdasboard/TeacherDashboard'
import AssignmentMark from "./pages/Teacherdasboard/AssignmentMark"
import AIAssistant from "./pages/AIAssistant"
import Courses from "./pages/Studentdasboardpages/Courses"
import ClassSchedule from "./pages/Teacherdasboard/ClassSchedule"
import Profile from "./pages/Teacherdasboard/Profile"


function App() {
  return (
    <>
    <Routes>
        
        <Route path="/student/login" element={<Login />} />
        <Route path="/teacher/login" element={<LoginT />} />
        <Route path="/" element={<Welcome/>} />
        {/* <Route path="/teacher/login" element={<TeacherLogin />} /> */}
        <Route path="/dashboard" element={<StudentDashboard/>} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard/>} />
        <Route path="/attendance" element={<Attendance/>} />
        <Route path="/ai-assistant" element={<AIAssistant/>} />
        <Route path="/teacher/attendance" element={<AttendanceMark/>} />
        <Route path="/assignments" element={<Assignments/>} />
        <Route path="/teacher/assignments" element={<AssignmentMark/>} />
        <Route path="/announcements" element={<Announcements/>} />
        {/* <Route path="/teacher/announcements" element={<Announcements/>} /> */}
        <Route path="/teacher/student" element={<Student/>} />
        <Route path="/grades" element={<Grades/>} />
        <Route path="/teacher/grades" element={<GradesMark/>} />
        <Route path="/teacher/class-schedule" element={<ClassSchedule/>} />
        <Route path="/profile" element={<MyProfile/>} />
        <Route path="/teacher/profile" element={<Profile/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/teacher/settings" element={<TeacherSetting/>} />
         <Route path="/courses" element={<Courses/>}/>
         <Route path="/teacher/classes" element={<MyClasses/>}/>
      </Routes>
      </>
  )
}

export default App