import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserProvider from '../context/UserContext.jsx'
import LoginProvider from '../context/LoginContext.jsx'
import SignupProvider from '../context/SignupContext.jsx'
import ListContextProvider from '../context/ListContext.jsx'
import NewListProvider from '../context/NewListContext.jsx'
import NewTaskProvider from '../context/NewTaskContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <SignupProvider>
        <LoginProvider>
          <ListContextProvider>
            <NewListProvider>
              <NewTaskProvider>
                <App />
              </NewTaskProvider>
            </NewListProvider>
          </ListContextProvider>
        </LoginProvider>
      </SignupProvider>
    </UserProvider>
  </React.StrictMode>,
)
