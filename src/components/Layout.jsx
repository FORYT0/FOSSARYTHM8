import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import useStore from '../store/useStore'

const NAV = [
  { to:'/dashboard', icon:'◈', label:'Dashboard' },
  { to:'/trends',    icon:'⬡', label:'Trend Radar' },
  { to:'/studio',    icon:'◎', label:'Content Studio' },
  { to:'/lineup',    icon:'▦', label:'Post Lineup' },
  { to:'/ai',        icon:'◉', label:'AI Brain', dot:true },
  { to:'/analytics', icon:'◫', label:'Analytics' },
]

export default function Layout() {
  const { palette, cyclePalette, notifications, markAllRead } = useStore()
  const [notifOpen, setNotifOpen] = useState(false)
  const location = useLocation()
  const unread = notifications.filter(n => !n.read).length

  const pageTitles = {
    '/dashboard':'Dashboard', '/trends':'Trend Radar', '/studio':'Content Studio',
    '/lineup':'Post Lineup', '/ai':'AI Brain', '/analytics':'Analytics', '/settings':'Settings',
  }
  const base = '/' + location.pathname.split('/')[1]
  const pageTitle = pageTitles[base] || 'FOSSARYTHM8'

  return (
    <div className="layout">
      <aside className="sidebar">
        <NavLink to="/dashboard" className="logo-mark">F8</NavLink>
        {NAV.map(n => (
          <NavLink key={n.to} to={n.to}
            className={({ isActive }) => `nav-btn${isActive ? ' active' : ''}`}>
            {n.icon}
            {n.dot && <span className="live-dot" />}
            <span className="nav-tooltip">{n.label}</span>
          </NavLink>
        ))}
        <div style={{flex:1}} />
        <div style={{position:'relative'}}>
          <button className="nav-btn" onClick={() => { setNotifOpen(o => !o); markAllRead() }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            {unread > 0 && (
              <span style={{position:'absolute',top:6,right:6,width:14,height:14,borderRadius:'50%',background:'var(--ac)',color:'var(--bg)',fontSize:8,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'monospace'}}>
                {unread}
              </span>
            )}
            <span className="nav-tooltip">Alerts ({unread})</span>
          </button>
          {notifOpen && (
            <div style={{position:'absolute',left:54,bottom:0,width:300,background:'var(--bg2)',border:'1px solid var(--br)',borderRadius:12,padding:16,zIndex:200,boxShadow:'0 8px 40px rgba(0,0,0,.6)'}}>
              <div className="card-title" style={{marginBottom:12}}>Alerts</div>
              {notifications.map(n => (
                <div key={n.id} style={{display:'flex',gap:8,alignItems:'flex-start',marginBottom:12,opacity:n.read?.5:1}}>
                  <div style={{width:6,height:6,borderRadius:'50%',background:n.type==='hot'?'var(--ac)':n.type==='up'?'#22c55e':'#f59e0b',flexShrink:0,marginTop:5}} />
                  <div style={{flex:1}}>
                    <div style={{fontSize:11,lineHeight:1.5}}>{n.msg}</div>
                    <div style={{fontSize:10,opacity:.4,marginTop:2}}>{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <NavLink to="/settings" className={({isActive})=>`nav-btn${isActive?' active':''}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
          <span className="nav-tooltip">Settings</span>
        </NavLink>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <span style={{fontFamily:'monospace',fontSize:12,fontWeight:700,letterSpacing:2,flex:1,color:'var(--ac)'}}>
            {pageTitle}
          </span>
          <div style={{display:'flex',gap:6,alignItems:'center'}}>
            <div style={{width:6,height:6,borderRadius:'50%',background:'var(--ac)',animation:'breathe 2s infinite'}} />
            <span style={{fontSize:10,opacity:.4,fontFamily:'monospace'}}>LIVE</span>
          </div>
          <div style={{flex:1}} />
          <button className="pal-btn" onClick={cyclePalette}>
            <div className="pal-swatch" />
            <span>{palette.name}</span>
          </button>
        </header>
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
