import './App.css';
import Axios from 'axios';
import { useState } from 'react';

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [email, setEmail] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')

  const [loginUsername, setLoginUsername] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  const [signupStatus, setSignupStatus] = useState("")
  const [loginStatus, setLoginStatus] = useState("")
  const [yes, setYes] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
  }

const register = () => {
  if(username.length < 1){
    setSignupStatus("Username cannot be empty")
    return
  }
  if (password !== confirmedPassword) {
    setSignupStatus("Passwords do not match.")
    return
  }

  Axios.post("http://localhost:3001/register", {
    username: username,
    passw: password,
    firstName: first,
    lastName: last,
    email: email,
  }).then((res) => {
    console.log(res)
    if(res){
      console.log(res.data)
      setSignupStatus(res.data.message)
    }else{
      console.log(res)
      setSignupStatus("Account successfully created!")
      setYes('yes')
    }
  })
}

const login = () => {
  Axios.post("http://localhost:3001/login", {
    username: loginUsername,
    passw: loginPassword,
  }).then((res) => {
    if(res.data.message){
      console.log(res)
      setLoginStatus(res.data.message)
    }else{
      console.log(res.data)
      setLoginStatus(res.data[0].username)
    }
  })
}

  return (
    <div className='flex  w- mx-auto justify-center items-center h-screen gap-12'>
      <form className='rounded-lg flex flex-col border border-black p-4 px-8 items-center gap-4' onSubmit={submitHandler}>
        <h1 className='text-2xl font-semibold'>Register</h1>

        <label className='font-bold'>Username</label>
        <input className='border border-black' onChange={(e) => {setUsername(e.target.value)}}/>
      

        <label className='font-bold'>password</label>
        <input className='border border-black' onChange={(e) => {setPassword(e.target.value)}}/>

        <label className='font-bold'>Confirm password</label>
        <input className='border border-black' type="password" onChange={(e) => {setConfirmedPassword(e.target.value)}}/>

        <label className='font-bold'>first name</label>
        <input className='border border-black' onChange={(e) => {setFirst(e.target.value)}}/>

        <label className='font-bold'>last name</label>
        <input className='border border-black' onChange={(e) => {setLast(e.target.value)}}/>

        <label className='font-bold'>email</label>
        <input className='border border-black' onChange={(e) => {setEmail(e.target.value)}}/>

        <button className='rounded-lg border border-black w-1/2 hover:bg-slate-600 hover:text-white' onClick={register}>Initialize Database</button>
        <h1>{yes}</h1>
      </form>

      <form className='rounded-lg flex flex-col border border-black p-4 items-center gap-4' onSubmit={submitHandler}>
        <h1 className='text-2xl font-semibold'>Login</h1>
        <input className='border border-black' type="text" placeholder='username' onChange={(e) => {setLoginUsername(e.target.value)}}/>
        <input className='border border-black' type="password" placeholder='password' onChange={(e) => {setLoginPassword(e.target.value)}}/>
        <button className='rounded-lg border border-black w-1/2 hover:bg-slate-600 hover:text-white' onClick={login}>Login</button>
      </form>

      <h1>{loginStatus}</h1>
      
    </div>
  );
}

export default App;
