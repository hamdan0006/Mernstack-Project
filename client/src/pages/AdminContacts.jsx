import { useEffect, useState } from "react";
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify";

export const AdminContacts = () => {
    const [contactData, setContactData] = useState([]);
    const { AuthorizationToken } = useAuth();

    const getContactData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/admin/contacts', {
                method: 'GET',
                headers: {
                    Authorization: AuthorizationToken
                }
            });
            const data = await response.json();
            if (response.ok) {
                setContactData(data);
            } else {
                toast.error("Failed to fetch contact data");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while fetching contact data");
        }
    };

    const deleteContactbyId = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: AuthorizationToken
                }
            });
            if (response.ok) {
                getContactData();
                toast.success("Contact Deleted successfully");
            } else {
                toast.error("Failed to delete contact");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while deleting contact");
        }
    };

    useEffect(() => {
        getContactData();
    }, []);

    return (
        <>
            <h1>User Contact Data</h1>
            {contactData.map((curdata) => (
                <div key={curdata._id}>
                    <p>{curdata.username}</p>
                    <p>{curdata.email}</p>
                    <p>{curdata.message}</p>
                    <button onClick={() => deleteContactbyId(curdata._id)}>Delete</button>
                </div>
            ))}
        </>
    );
};
