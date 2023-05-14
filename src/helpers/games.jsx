import { useState, useEffect, createContext, useContext, useCallback } from 'react'

import { useApp } from './app'
import { useLoading } from './loading'
import Game from '../logic/game'

const GamesContext = createContext()

export const useGames = () => useContext(GamesContext)

export function GamesProvider ({ children }) {
  const app = useApp()
  const { whileLoading } = useLoading()
  const [games, setGames] = useState([])

  const search = async ($search, filters) => {
    whileLoading(async () => {
      setGames(await app.mongo.db.collection('games').find({ $text: { $search }, ...filters }).toArray())
    })
  }

  return <GamesContext.Provider value={{ games, search }}>
    {children}
  </GamesContext.Provider>
}
