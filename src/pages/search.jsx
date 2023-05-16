import { useState, useEffect } from 'react'
import Stack from '@mui/material/Stack'

import { useLoading } from '../helpers/loading'
import { useGames } from '../helpers/games'
import Page from '../components/page'
import Loader from '../components/loader'
import GameCard from '../components/game-card'
import SearchBar from '../components/search-bar'

export default function Search () {
  const { loading } = useLoading()
  const { games } = useGames()

  return <Page fullHeight loading={loading}>
    <Stack justifyContent='center'>
      <SearchBar />
    </Stack>
  </Page>
}