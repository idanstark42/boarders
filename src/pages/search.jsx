import { useState, useEffect } from 'react'

import { useLoading } from '../helpers/loading'
import { useGames } from '../helpers/game'
import Page from '../components/structure/page'

export default function Search () {
  const { loading } = useLoading()
  const { games, search } = useGames()

  return <Page>
  </Page>
}
