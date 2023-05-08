import { useState, useEffect } from 'react'

import { useLoading } from '../helpers/loading'
import { useGames } from '../helpers/myths'
import Page from '../components/structure/page'

export default function Admin () {
  const { loading } = useLoading()
  const { games, edit } = useGames()

  return <Page authorizedOnly>
  </Page>
}
