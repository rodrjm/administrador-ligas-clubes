import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/layout'
import Home from './pages/home'
import MatchLive from './pages/match-live'
import Leagues from './pages/leagues'
import LeagueDetail from './pages/league-detail'
import Matches from './pages/matches'
import Profile from './pages/profile'
import './App.css'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/partido/:id" element={<MatchLive />} />
        <Route path="/ligas" element={<Leagues />} />
        <Route path="/liga/:slug" element={<LeagueDetail />} />
        <Route path="/partidos" element={<Matches />} />
        <Route path="/perfil" element={<Profile />} />
      </Routes>
    </Layout>
  )
}

export default App
