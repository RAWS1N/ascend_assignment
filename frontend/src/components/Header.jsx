import React from 'react'
import { UseLogin } from '../../context/LoginContext'
import { UserState } from '../../context/UserContext'

const Header = () => {
    const loginModal = UseLogin()
    const {user} = UserState()
   
  return (
    <nav className='flex justify-between py-4 px-8 border-b'>
        <p>Welcome {user.name}</p>
        {!user && <button onClick={loginModal.onOpen} className='bg-zinc-900 px-6 py-1.5 rounded-md text-white'>Login</button>}
    </nav>
  )
}

export default Header