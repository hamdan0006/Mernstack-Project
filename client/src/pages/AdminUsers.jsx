import { useEffect, useState } from "react"
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
export const  AdminUsers= ()=>{

const {AuthorizationToken} =useAuth();
const [users,setUsers] =useState([])

    const getAllUserdata =async()=>{

      try {
        const response =await fetch("http://localhost:5000/api/admin/users",{
            method : "GET",
            headers:{
                Authorization : AuthorizationToken
            }

        }    
        )
    const data =await response.json();
    console.log(`user ${data}`)
    setUsers(data);

      } catch (error) {
        console.log(error)
      }
    }
    const deleteUser =async(id)=>{
        try {
            const response =await fetch(`http://localhost:5000/api/admin/users/delete/${id}` ,{
                method : "DELETE",
                headers:{
                    Authorization : AuthorizationToken
                }
    
            }    
            )
            const data =await response.json();
    console.log(`user after deletion ${data}`)
    if(response.ok){
        getAllUserdata();
        toast.success("User deleted successfully")
    }
    
            
        } catch (error) {
            console.log(error)
        }

       
    }
    useEffect(()=>{
        getAllUserdata();
    },[])

return(
    <>
    <table >
    <thead>
        <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Phone</td>
            <td>Update</td>
            <td>Delete</td>

        </tr>
    </thead>
    <tbody>
       {users.map((curElem)=>{
    return (
        <tr>
            <td>{curElem.username}</td>
            <td>{curElem.email}</td>
            <td>{curElem.phone}</td>
            <td>
            <Link to={`/admin/users/${curElem._id}`}>
            <button>Update</button>
              </Link>

                </td>
            <td><button className="dlt-btn" onClick={()=> deleteUser(curElem._id)}>Delete</button></td>

        </tr>
    )
       })}
    </tbody>
</table>
    </>
)
}