import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Update() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [successMessage, SetsuccessMessage] = useState(false);

    const [values,setValues] = useState({
        userName : id,
        email : "",
        password: ""
    });

    useEffect(()=>{
        axios.get("http://localhost:3000/api/data/"+id)
        .then(res => {
            const data = res.data[0];
            if(data)
            {
                setValues({...values,email:data.email,password:data.password});
                console.log(res.data);
            }
        })
        .catch(error => console.log(error));
    },[id])    

    const handleUpdate = (event) =>{
        event.preventDefault();
        axios.put("http://localhost:3000/api/data/" + id, values)
            .then(res => {
                SetsuccessMessage(true);
                setTimeout(() => {
                    SetsuccessMessage(false);
                    navigate("/profile");
                }, 3000);
            })
            .catch(err => console.log(err));
    }
    return ( 
        <>
            <form action="" className="flex items-center justify-center flex-col" onSubmit={handleUpdate}>
                <table>
                    <tbody>
                        <tr>
                            <td>User Name</td>
                            <td className="py-1.5">
                                <input type="text" name="userName" readOnly required className="bg-slate-200 border-b-2 border-slate-800 outline-none p-1" value={values.userName} onChange={e => setValues({...values,userName:e.target.value})} />
                            </td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td className="py-1.5">
                                <input type="text" name="email" required className="bg-slate-200 border-b-2 border-slate-800 outline-none p-1" value={values.email} onChange={e => setValues({...values,email:e.target.value})} />
                            </td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td className="py-1.5">
                                <input type="text" name="password" required className="bg-slate-200 border-b-2 border-slate-800 outline-none p-1" value={values.password} onChange={e => setValues({...values,password:e.target.value})} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button className="bg-green-300 text-black px-3 py-1 rounded-md">Update</button>
            </form>
            {successMessage && (
                <div className="h-screen w-full bg-[#00000071] fixed top-0 z-20">
                    <p className="text-black bg-white h-max p-10 text-center">Data Updated Successfully</p>
                </div>
            )}
        </>
     );
}

export default Update;