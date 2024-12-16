import { NavLink, Navigate, Outlet } from "react-router-dom"
import { FaUser } from "react-icons/fa";
import "./Admin-layout.css"
import { useAuth } from "../../store/Auth";


export const AdminLayout =()=>{

    const {user,isloading} =useAuth();
    console.log("admin layout",user)

    if(isloading){
       return <h1>Loading ...</h1>
    }

    if(!user.Isadmin){
       return <Navigate to= "/"/>
    }
    
return (
    <>
    <h1>Admin Panel</h1>
    <div className="container">
        <nav>
            <ul>
                <li><NavLink className="admin-navigation" to="/admin/users"><FaUser />users</NavLink></li>
                <li><NavLink className="admin-navigation"  to="/admin/contacts">Contacts</NavLink></li>
                <li><NavLink className="admin-navigation"  to="/">Home</NavLink></li>

 
            </ul>
        </nav>
    </div>
    <Outlet/>
    </>
)
}