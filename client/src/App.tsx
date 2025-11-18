import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import type { Location } from 'react-router-dom'

// pages:
import Home from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import PageNotFound from './pages/PageNotFound'

// components:
import LandingNav from './components/LandingNav'
import DashboardNav from './components/DashboardNav'

// CSS:
import './App.css'

function Layout() {
    const location: Location = useLocation()

    let nav = null
    if (location.pathname.startsWith('/edit')) {
        nav = <DashboardNav />
    } else {
        nav = null
    }

    return (
        <>
            {nav}

            <main className="p-6">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/edit/dashboard" element={<Dashboard />} />
                    <Route path="/edit/settings" element={<Settings />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </main>
        </>
    )
}

export default function App() {
    return (
        <Router>
            <Layout />
        </Router>
    )
}
