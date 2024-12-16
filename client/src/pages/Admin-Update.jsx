// import React, { useEffect, useState } from "react"
// import { useParams } from "react-router-dom";
// import { useAuth } from "../store/Auth";

// export const AdminUpdate =()=>{
   

//     const[data,setdata] =useState({
//         username : "",
//         email : "",
//         password : ""
//     });

// const params =useParams();
// const {AuthorizationToken} =useAuth();


    
    

//     const getSingleUserData =async()=>{
//         try {
//             const response =await fetch(`http://localhost:5000/api/admin/users/${params.id}` ,{
//                 method : "GET",
//                 headers:{
//                     Authorization : AuthorizationToken
//                 }
    
//             }    
//             )
//             const data =await response.json();
//     console.log(`user after update ${data}`)
//     setdata(data)
//     if(response.ok){
//         // getAllUserdata();
//         toast.success("User updated successfully")
//     }

    
    
            
//         } catch (error) {
//             console.log(error)
//         }

       
//     } 

//     useEffect(()=>{
//         getSingleUserData();
//     },[])

//     const handleInput = (e) => {
//         console.log(e);
//         let name = e.target.name;
//         let value = e.target.value;

//         setdata({
//             ...data,
//             [name] :value,
//         })
//     }
//     // to update data dynamically 

//     const handleSubmit = async(e)=>{
//         e.preventDefault();
// try {
//     const response =await fetch(`http://localhost:5000/api/admin/users/update/${params.id}` ,{
//         method : "PATCH",
//         headers:{
//             "Content-Type" : "application/json",
//             Authorization : AuthorizationToken
//         },
//         body : JSON.stringify(data),

//     }    
//     )
//     const data =await response.json();
// console.log(`user after deletion ${data}`)
// if(response.ok){
// getAllUserdata();
// toast.success("User updated successfully")
// }else{
//     toast.error("Failed to update user")
// }
// } catch (error) {
    
// }
//     }



//     return (
//         <div className="updatecontainer">
//           <form onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="username">Username:</label>
//               <input
//                 type="text"
//                 name="username"
//                 id="username"
//                 value={data.username}
//                 onChange={handleInput}
//                 required
//               />
//             </div>
            
//             <div>
//               <label htmlFor="email">Email:</label>
//               <input
//                 type="email"
//                 name="email"
//                 id="email"
//                 value={data.email}
//                 onChange={handleInput}
//                 required
//               />
//             </div>
    
//             <div>
//               <label htmlFor="phone">Phone Number:</label>
//               <input
//                 type="number"
//                 name="phone"
//                 id="phone"
//                 value={data.phone}
//                 onChange={handleInput}
//                 required
//               />
//             </div>
    
//             <button type="submit">Update User</button>
//           </form>
//         </div>
//       );
// }


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify";

export const AdminUpdate = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "" // Assuming 'phone' is part of the data
  });



  const params = useParams();
  const { AuthorizationToken } = useAuth();

  const getSingleUserData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setData(userData);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/update/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthorizationToken
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        console.log("User updated successfully");
        toast.success("User updated successfully");
      } else {
        console.error("Failed to update user");
        toast.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
     
    }
  };

  return (
    <div className="updatecontainer">
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={data.username}
            onChange={handleInput}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={data.email}
            onChange={handleInput}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="number"
            name="phone"
            id="phone"
            value={data.phone}
            onChange={handleInput}
            required
          />
        </div>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};
