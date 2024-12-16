// import { createContext, useContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// // eslint-disable-next-line react/prop-types
// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState("");
//   const [user,setuser] =useState()



//   const storeTokenInLS = (serverToken) => {
//     setToken(serverToken);
//     return localStorage.setItem("token", serverToken);
//   };


//   let isLoggedIn = !!token;
//   console.log("token", token);
//   console.log("isLoggedin ", isLoggedIn);

//   //   to check whether is loggedIn or not
//   const LogoutUser = () => {
//     setToken("");
//     return localStorage.removeItem("token");
//   };

 

// // Authentication 
// const userAuthentication = async () => {
//   try {
//     if (!token) {
//       console.log("Token not available. User not authenticated.");
//       return;
//     }

//     const response = await fetch("http://localhost:5000/api/auth/user", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });

//     if (response.ok) {
//       const data = await response.json();
//       setuser(data.userData);
//       console.log("User data:", data.userData);
//     } else {
//       // Handle unauthorized access or other errors
//       console.log("Error fetching user data:", response.statusText);
//     }
//   } catch (error) {
//     console.error("Error during user authentication:", error);
//   }
// };



//   useEffect(()=>{
//     userAuthentication();
//   },[])

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser,user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const authContextValue = useContext(AuthContext);
//   if (!authContextValue) {
//     throw new Error("useAuth used outside of the Provider");
//   }
//   return authContextValue;
// };


import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const [isloading,setloading] =useState(true)
  const [service,setService] =useState("");
  const AuthorizationToken =`Bearer ${token}`

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("Stored token:", storedToken);
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const userAuthentication = async () => {
    
    console.log("Authenticating user with token:", token);
    if (!token) {
      console.log("Token not available. User not authenticated.");
      return;
    }

    try {
      setloading(true)
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken 
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
        setloading(false)
        console.log("User data:", data.userData);
      } else {
        console.log("Error fetching user data:", response.statusText);
        setloading(false)
      }
    } catch (error) {
      console.error("Error during user authentication:", error);
    }
  };

  const getDatafromDb = async()=>{
   try {
    const response = await fetch("http://localhost:5000/api/data/service",
    {
      method : "GET",
    }
   )
   if(response.ok){
    const service =await response.json();
    setService(service.data)
    console.log(service.data,"Got the data");
   }
   } catch (error) {
    console.log("Error while fetching data")
   }
  }

  useEffect(() => {
    userAuthentication();
    getDatafromDb();
  }, [token]);

  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  let isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user,service,AuthorizationToken,isloading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
