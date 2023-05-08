import { useState, useEffect, createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import App from '../logic/app'

const AppContext = createContext()

export const useApp = () => useContext(AppContext)

export function AppProvider ({ children }) {
  const [app, setApp] = useState(undefined)

  useEffect(() => {
    const app = App.init()
    setApp(app)
  }, [setApp])

  return <AppContext.Provider value={app}>
    {children}
  </AppContext.Provider>
}

export function Protected ({ children }) {
  const app = useApp()
  const navigate = useNavigate()

  useEffect(() => {
    if (app && !app.user) {
      navigate('/auth')
    }
  }, [app, navigate])

  return children
}
