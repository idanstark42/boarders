import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import ThemeProvider from './helpers/theme'
import { AppProvider } from './helpers/app'
import { LoadingProvider } from './helpers/loading'
import { GamesProvider } from './helpers/games'

import Auth from './pages/auth'
import Search from './pages/search'
import Admin from './pages/admin'

export default function App() {
  return <AppProvider>
    <LoadingProvider>
      <GamesProvider>
        <Router>
          <Routes>
            <Route path='/auth' element={<Auth />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/*' element={<Search />} />
          </Routes>
        </Router>
      </GamesProvider>
    </LoadingProvider>
  </AppProvider>
}
