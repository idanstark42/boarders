import { useState, createContext, useContext } from 'react'

const LoadingContext = createContext()

export const useLoading = () => useContext(LoadingContext)

export function LoadingProvider ({ children }) {
  const [loading, setLoading] = useState(true)

  const whileLoading = async callback => {
    await setLoading(true)
    const result = await callback()
    await setLoading(false)
    return result
  }

  return <LoadingContext.Provider value={{ loading, setLoading, whileLoading }}>
    {children}
  </LoadingContext.Provider>
}
