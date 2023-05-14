import { useState, useEffect } from 'react'

import { useLoading } from '../helpers/loading'
import { useGames } from '../helpers/games'
import Page from '../components/page'
import Loader from '../components/loader'
import GameCard from '../components/game-card'

export default function Admin () {
  const { loading } = useLoading()
  const { games, edit } = useGames()

  return <Page authorizedOnly>
    <h1>Admin</h1>
    <ul>
      {games.map(game => <li key={game.id}><GameCard game={game} editable /></li>)}
    </ul>
    {loading && <Loader />}
  </Page>
}
