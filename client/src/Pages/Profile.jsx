import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import Update  from "./Update";
import axios from 'axios';

function Profile() {
    const [values, setValues]=useState({userName:"",email:"",password:""});
    const [upload,setUpload] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleValues = (event) =>{
        setValues({...values, [event.target.name]:[event.target.value]});
    }

    const handleUpload=(event)=>{
        event.preventDefault();
        axios.post('http://localhost:3000/api/data',values)
        .then(response => {
            console.log("registered sucessfull")
        })
        .catch(error => console.log(error));
        event.target.reset();
        setUpload(true)
    }

    const handleDelete=(userName)=>{
        setShowSuccessMessage(true);
        setTimeout(() => {
        setShowSuccessMessage(false);
        location.reload()
        }, 3000); 
        axios.delete('http://localhost:3000/api/data/'+userName)
        .then(response => {})
        .catch(error => console.log(error));
    }

    const [data, setData] = useState([]); // Initialize data as an empty array
    useEffect(() => {
        fetch("http://localhost:3000/api/data")
            .then((response) => response.json())
            .then((data) => setData(data)) // Set data to the parsed JSON object
            .catch((error) => console.log(error));
        setUpload(false)    
    },[upload]); // Add an empty dependency array

    return (
        <>
            {
                data!=""?(<div className="flex items-center justify-center flex-col">
                <p className="font-bold text-2xl mb-3">User Credentials</p>
                <table >
                    <thead>
                        <tr>
                            <td className="border border-zinc-950 px-2 py-1 text-center">User Name</td>
                            <td className="border border-zinc-950 px-2 py-1 text-center">Email</td>
                            {/* <td className="border border-zinc-950 px-2 py-1">Password</td> */}
                            <td className="border border-zinc-950 px-2 py-1 text-center">Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, key) => (
                            <tr key={key}>
                                <td className="border border-zinc-950 px-2 py-1 text-center">{item.userName}</td>
                                <td className="border border-zinc-950 px-2 py-1 text-center">{item.email}</td>
                                {/* <td className="border border-zinc-950 px-2 py-1">{item.password}</td> */}
                                <td className="border border-zinc-950 px-2 py-1 text-center">
                                    <button onClick={()=>handleDelete(item.userName)} className="rounded-md bg-red-500 px-3 py-1 text-white mx-2">Delete</button>
                                    <Link to={`/account/${item.userName}`} className="rounded-md bg-blue-500 px-3 py-1.5 text-white mx-2">Update</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>):
            (<p className="font-bold text-2xl mb-3 text-center">No User Found</p>)
            }
            <form action="" className="flex items-center justify-center flex-col" onSubmit={handleUpload}>
                <p className="font-bold text-2xl m-3">New User Registration</p>
                <table>
                    <tbody>
                        <tr>
                            <td>User Name</td>
                            <td className="py-1.5">
                                <input type="text" name="userName" id="userName" required className="bg-slate-200 border-b-2 border-slate-800 outline-none p-1" onChange={handleValues}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td className="py-1.5">
                                <input type="email" name="email" id="email" required className="bg-slate-200 border-b-2 border-slate-800 outline-none p-1" onChange={handleValues}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td className="py-1.5">
                                <input type="text" name="password" id="password" required className="bg-slate-200 border-b-2 border-slate-800 outline-none p-1" onChange={handleValues}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button className="bg-green-400 px-3 py-1 rounded-md text-black" type="submit">Submit</button>
            </form>
            {showSuccessMessage && (
                <div className="h-screen w-full bg-[#00000071] fixed top-0 z-20">
                    <p className="text-black bg-white h-max p-10 text-center">Data deleted Successfully</p>
                </div>
            )}
        </>
    );
}

export default Profile;
