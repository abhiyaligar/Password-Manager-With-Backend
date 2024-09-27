import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { toast,ToastContainer } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css'

const Manger = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    const [isRequired, setIsRequired] = useState(false)

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/");
        let passwords = await req.json()
        setpasswordArray(passwords)
        console.log(passwords)
    }

    useEffect(() => {
        getPasswords()
        
    }, [])

    const copyText = (text) => {
        toast('Copied To Clipbored', {

            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {

        passwordRef.current.type = "text"
        if (ref.current.src.includes("Icons/hidden.png")) {
            passwordRef.current.type = "password"
            console.log(ref.current.src)
            ref.current.src = "Icons/view.png"
        }

        else {
            ref.current.src = "Icons/hidden.png"
            passwordRef.current.type = "text"
        }
    }


    const savePassword = async () => {
        if(form.site.length >3 && form.username.length >3 && form.password.length >3 ){

            /// if any id exiss delete it and store new

            await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json"}, body:JSON.stringify({ id:  form.id})} );



            handleReset();
            console.log(passwordArray)
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            await fetch("http://localhost:3000/", {method: "POST", headers: {"Content-Type": "application/json"}, body:JSON.stringify({...form, id:uuidv4()})} )
            toast('Password Added Succesfully', {
                
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else{
            handleReset();
            toast('Error : Password Not Saved  ', {
                
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        }
    }

    const deletePassword = async (id) => {
        let c = confirm("Do You Really Want To Delete The Password?")
        if (c) {

            console.log("deleteing files", id)
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)));
            let res = await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json"}, body:JSON.stringify({ id})} );
            toast('Password Deleted Succesfully', {

                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        }
    }
    const editPassword = (id) => {
        setform({...passwordArray.filter(i => i.id === id)[0], id: id});
        setpasswordArray((passwordArray.filter(i => i.id !== id)))

    }


    const handleReset = () => {
        setform({
            site: "",
            username: "",
            password: ""
        })

    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer 
                position="top-right"
                autoClose={1000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition="Slide"
                containerId="GlobalApplicationToast"
            />
            {/* Same as */}
            <ToastContainer />
            
            <div className="px-2 md:mycontainer font-bold max-w-5xl  mx-auto">
                <div className="text-black  flex flex-col p-4">
                    <input value={form.site} required onChange={handleChange} className=' p-2 rounded-full w-full border border-green-600   ' placeholder='Enter Website URL' type="url" name='site' id='' />
                    <div className="flex w-full text-sm md:text-lg  my-2 gap-3 ">
                        <input required value={form.username} onChange={handleChange} className='p-2 rounded-full w-full border border-green-600 ' placeholder='Enter Username' type="text" name='username' />
                        <div className='relative'>
                            <input required ref={passwordRef} value={form.password} onChange={handleChange} className='p-2 w-[150px] rounded-full md:w-full border text-sm md:text-lg border-green-600 ' placeholder='Enter Password' type="password" name='password' />
                            <span className='absolute right-0 top-1.5 md:top-2.5 cursor-pointer ' >
                                <img ref={ref} className='flex items-center mx-2' width={25} onClick={showPassword} src="Icons/view.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <div className='flex my-2 justify-center'>
                        < button onClick={savePassword} className=' flex  justify-center w-fit bg-green-500 p-2 gap-4  rounded-full items-center '>
                            <lord-icon
                                src="https://cdn.lordicon.com/jgnvfzqg.json"
                                trigger="hover">
                            </lord-icon>Save Password
                        </button>
                    </div>
                </div>
                <div>
                    <h2 className='text-2xl py-4 flex justify-center'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='flex justify-center bg-green-900 text-white rounded-md p-3  '>Add Some Passwords</div>}
                    {passwordArray.length != 0 && <table className="table-auto text-[10px]  md:text-lg  w-full  rounded-md overflow-hidden  ">
                        <thead className='bg-green-900 text-white'>
                            <tr >
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Passwords</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className=' hover:underline py-2 border text-center md:min-w-28' >
                                        <div className='flex justify-between '>
                                            <a href={item.site} className='mx-2' target='_blank'> {item.site}</a>
                                            <div className='cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", }}
                                                    src="https://cdn.lordicon.com/boyoxams.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' py-2 border text-center md:min-w-32'>
                                        <div className='flex justify-center mx-2 gap-2'>
                                            <div className='cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <span>{item.username}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' py-2 border text-center md:min-w-32'>
                                        <div className='flex justify-center mx-2 gap-2'>
                                            <div className='cursor-pointer ' onClick={() => { copyText(item.password) }}>
                                                <span className='flex text-center'>{"*".repeat(item.password.length)}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' py-2 border text-center min-w-32'>
                                        <span onClick={() => { deletePassword(item.id) }} >
                                            <lord-icon
                                                style={{ "width": "25px", "cursor": "pointer", "marginRight": "12px" }}
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover">
                                            </lord-icon>
                                        </span>
                                        <span onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                style={{ "width": "25px", "cursor": "pointer" }}
                                                src="https://cdn.lordicon.com/wuvorxbv.json"
                                                trigger="hover"
                                                stroke="bold"
                                                colors="primary:#121331,secondary:#121331">
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manger