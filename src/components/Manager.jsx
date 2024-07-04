import React, { useEffect, useState } from 'react'
import { useRef } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {v4 as uuidv4} from 'uuid';
const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])



    const getPasswords = async()=>{
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setPasswordArray(passwords)

    }
    useEffect(() => {
        // let passwordArray;
        getPasswords()



    }, [])

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
            });
        navigator.clipboard.writeText(text)
    }


    const showPassword = () => {
        passwordRef.current.type = 'text'
        if (ref.current.src.includes("icons/eyecross.svg")) {
            ref.current.src = "icons/eye.svg"
            passwordRef.current.type = 'password'
        }
        else {

            ref.current.src = "icons/eyecross.svg"
            passwordRef.current.type = 'text'
        }
    }

    const savePassword = async () => {
        if(form.site.length>3 && form.username.length>3 && form.password.length>6){
            // if any such id exists in th db , delete it 
            if(form.id !== undefined){
                await fetch("http://localhost:3000/",{method:"DELETE", headers:{"content-Type":"application/json"},body: JSON.stringify({id:form.id})})

            }


            setPasswordArray([...passwordArray, {...form,id: uuidv4()}])
            await fetch("http://localhost:3000/",{method:"POST", headers:{"content-Type":"application/json"},body: JSON.stringify({...form,id:uuidv4()})})
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id: uuidv4()}]))
            // console.log([...passwordArray, form])
            setForm({ site: "", username: "", password: "" })
            toast('Password saved !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                // transition: "Bounce",
            });
        }
        else{
            toast('Error: Password not saved!')
        }
    }
    const deletePassword = async(id) => {
        console.log("Deleting password with id : ",id)
        let c = confirm("Do you really want to delete this password ")
        if(c){
            setPasswordArray(passwordArray.filter(item=>item.id!==id))
            let res = await fetch("http://localhost:3000/",{method:"DELETE", headers:{"content-Type":"application/json"},body: JSON.stringify({id})})
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
            // console.log([...passwordArray, form])

            toast('Deleting Passwordf!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                // transition: Bounce,
                });
        }
    }
    const editPassword = (id) => {
        
        console.log("Editing password with id : ",id)
        setForm({...passwordArray.filter(item=>item.id==id)[0],id: id})
        setPasswordArray(passwordArray.filter(item=>item.id!==id))
        // localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
        // console.log([...passwordArray, form])
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"/>
            {/* Same as */}
            <ToastContainer />


            <div className="md:mycontainer bg-purple-200 md:px-0 p -2 min-h-[88vh]">
                <h1 className='text-3xl font-bold text-center'>
                    <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager.</p>
                <div className="flex text-black flex-col p-4 gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full w-full border border-green-500 p-4 py-1' type="text" name='site' id='site'/>
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter username ' className='rounded-full w-full border border-green-500 p-4 py-1' type="text" name='username' id='username'/>
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter password ' className='rounded-full w-full border border-green-500 p-4 py-1' type="password" id='password' name='password' />
                            <span className='absolute right-[12px] top-[3px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' src='icons/eye.svg' />


                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center rounded-full px-4 py-2 gap-2 w-fit bg-green-500 hover:bg-green-300 border border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save Password
                    </button>
                </div>


                <div className="passwords">
                    <h2 className='font-bold text-2 xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div> No Password to show </div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className=' bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {

                                return <tr key={index}>
                                    <td className='justify-center text-center py-2 border border-white '>
                                        <div className='flex items-center justify-center'>
                                            <span><a href={item.site} target='_blank' className='visited:text-red-400'>{item.site}</a></span>
                                            <div className="lordiconcopy cursor-pointer size-7" onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "2px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' justify-center text-center py-2 border border-white '>
                                        {/* {item.username} */}
                                        <div className='flex items-center justify-center' >
                                            <span>{item.username}</span>
                                            <div className="lordiconcopy cursor-pointer size-7" onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='justify-center text-center py-2 border border-white '>
                                        {/* {item.password} */}
                                        <div className='flex items-center justify-center' >
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className="lordiconcopy cursor-pointer size-7" onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>

                                    <td className='justify-center text-center py-2 border border-white '>
                                        
                                        
                                            <span className='cursor:pointer mx-1' onClick={()=>{editPassword(item.id)}}>
                                            
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px" }}
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </span>
                                            <span className='cursor:pointer mx-1' onClick={()=>{deletePassword (item.id)}}>
                                            
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px" }}
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </span>
                                        
                                    </td>

                                </tr>
                            })}

                        </tbody>
                    </table>
                    }



                </div>
            </div>
        </>
    )
}

export default Manager
