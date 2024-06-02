import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.tsx'
import { SelectedUserProvider } from './context/SelectedUser.tsx'
import { SocketContextProvider } from './context/Socket.context.tsx'
import MessagesContextProvider from './context/Messages.context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SelectedUserProvider>
        <AuthContextProvider>
          <MessagesContextProvider>
            <SocketContextProvider>
              <App />
            </SocketContextProvider>
          </MessagesContextProvider>
        </AuthContextProvider>
      </SelectedUserProvider>
    </BrowserRouter>
  </React.StrictMode>

)
