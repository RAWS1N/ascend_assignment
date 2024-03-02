import { useCallback, useState } from "react";
import Modal from "./Modal";
import { UseLogin } from "../../../context/LoginContext"
import { UseSignup } from "../../../context/SignupContext"
import { UserState } from "../../../context/UserContext";
import { Server } from '../../../utils/Server'


const SignupModal = () => {
  const loginModal = UseLogin();
  const signupModal = UseSignup();
  const { setUser } = UserState()
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const { data } = await Server.post('/user/signup', formData)
      setUser(data)
      localStorage.setItem("user", JSON.stringify(data))
      setIsLoading(false)
      setTimeout(() => {
        loginModal.onClose();
      }, 1500)
      setFormData({username:"",email : "",password : ""})


    }
    catch (e) {
      setIsLoading(false)
      console.log(e)
    }
  }


  const onToggle = useCallback(() => {
    signupModal.onClose();
    loginModal.onOpen();
  }, [signupModal, loginModal])

  const bodyContent = (
    <div className="">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Enter username here..." required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email address here..." required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password here..." required />
        <button disabled={isLoading} className="bg-zinc-900 text-white py-1 px-8 rounded-md mx-auto">Create Account</button>
      </form>
      <div>
        <p className="text-center mt-3">already have an account? <span className="text-blue-500 cursor-pointer" onClick={onToggle}>Signin</span></p>
      </div>
    </div>
  )



  return (
    <Modal
      disabled={isLoading}
      isOpen={signupModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={signupModal.onClose}
      onSubmit={() => { }}
      body={bodyContent}
    />
  );
}

export default SignupModal;