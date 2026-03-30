import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/layout/ProtectedRoute"
import Home from "./pages/Home"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminContacts from "./pages/admin/AdminContacts"
import UserDashboard from "./pages/user/UserDashboard"
import UserContacts from "./pages/user/UserContacts"
import ContactDetails from "./pages/ContactDetails"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/contacts" element={<ProtectedRoute><AdminContacts /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/contacts" element={<ProtectedRoute><UserContacts /></ProtectedRoute>} />
        <Route path="/contacts/:id" element = {<ContactDetails/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App