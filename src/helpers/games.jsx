import { useState, useEffect, createContext, useContext, useCallback } from 'react'

import { useApp } from './app'
import { useLoading } from './loading'
import Game from '../logic/game'

const GamesContext = createContext()

export const useGames = () => useContext(GamesContext)

export function GamesProvider ({ children }) {
  const app = useApp()
  const [games, setGames] = useState([])

  const search = () => {

  }

  const edit = () => {

  }

  return <GamesContext.Provider value={{ games, search, edit }}>
    {children}
  </GamesContext.Provider>
}
