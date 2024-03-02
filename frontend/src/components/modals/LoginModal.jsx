import { useCallback, useState } from "react";
import Modal from "./Modal";
import { UseLogin } from "../../../context/LoginContext"
import { UseSignup } from "../../../context/SignupContext"
import { UserState } from "../../../context/UserContext";
import { Server } from '../../../utils/Server'


const LoginModal = () => {
  const loginModal = UseLogin();
  const signupModal = UseSignup();
  const { setUser } = UserState()
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }



  const onToggle = useCallback(() => {
    loginModal.onClose();
    signupModal.onOpen();
  }, [loginModal, signupModal])



  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const { data } = await Server.post('/user/signin', formData)
      setUser(data)
      localStorage.setItem("user", JSON.stringify(data))
      setIsLoading(false)
      setTimeout(() => {
        loginModal.onClose();
      }, 1500)
      setFormData({email : "",password : ""})


    }
    catch (e) {
      setIsLoading(false)
      console.log(e)
    }
  }

  const bodyContent = (
    <div className="">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email address here..." required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password here..." required />
        <button disabled={isLoading} className="bg-zinc-900 text-white py-1 px-8 rounded-md mx-auto">Sign in</button>
      </form>
      <div>
        <p className="text-center mt-3">don't have account yet? <span className="text-blue-500 cursor-pointer" onClick={onToggle}>Create account</span></p>
      </div>
    </div>
  )


  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={() => { }}
      body={bodyContent}
    />
  );
}

export default LoginModal;