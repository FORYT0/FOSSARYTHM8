import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Trends from './pages/Trends'
import Lineup from './pages/Lineup'
import AIBrain from './pages/AIBrain'
import Stats from './pages/Stats'
import Discovery from './pages/Discovery'
import { Studio, Settings } from './pages/StudioSettings'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/"         element={<Dashboard />} />
        <Route path="/trends"   element={<Trends />} />
        <Route path="/studio"   element={<Studio />} />
        <Route path="/discovery" element={<Discovery />} />
        <Route path="/lineup"   element={<Lineup />} />
        <Route path="/ai"       element={<AIBrain />} />
        <Route path="/stats"    element={<Stats />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  )
}
