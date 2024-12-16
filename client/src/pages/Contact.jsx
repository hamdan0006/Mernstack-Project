import { useState } from "react";
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify";

const defaultContactForm ={
  username : "",
  email : "",
  message : ""
}

export const Contact = () => {
  const [contact, setContact] = useState(defaultContactForm);

const [userData,setuserData] =useState(true)
  const {user} =useAuth();

  if(userData && user){
    setContact({
      username : user.username,
      email : user.email,
      message : ""
    })
    setuserData(false)
  }

  // lets tackle our handleInput
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  // handle fomr getFormSubmissionInfo
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response =await fetch("http://localhost:5000/api/form/contact",{
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body :JSON.stringify(contact),
    })
    if(response.ok){
     setContact(defaultContactForm);
     const data =await response.json();
     console.log(data);
     toast.success("Message sent successfully")
    }

    console.log(contact);
    } catch (error) {
      console.log(error,"could not send message");
     toast("could not send message")

    }
    
  };
  return (
    <>
    <div className="contact-section">
      <div className="image-container">
        <img
          src="/images/support.png"
          alt="a nurse with a cute look"
          width="400"
          height="500"
        />
      </div>
      <div className="contact-dtsl">
        <h1>Contact us</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={contact.username}
              onChange={handleInput}
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              value={contact.email}
              onChange={handleInput}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              value={contact.message}
              onChange={handleInput}
              placeholder="Type your message here"
            />
          </div>

          <button type="submit" className="btn btn-submit">
            Send Message
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default Contact;
