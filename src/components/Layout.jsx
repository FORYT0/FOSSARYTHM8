import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useStore from '../store'

const NAV = [
  { path:'/',         icon:'◈', label:'Dashboard' },
  { path:'/discovery', icon:'🔍', label:'Explore' },
  { path:'/trends',   icon:'⬡', label:'Trends' },
  { path:'/studio',   icon:'◎', label:'Studio' },
  { path:'/lineup',   icon:'▦', label:'Lineup' },
  { path:'/ai',       icon:'◉', label:'AI Brain', dot:true },
  { path:'/stats',    icon:'◫', label:'Analytics' },
  { path:'/settings', icon:'◌', label:'Settings' },
]

const PAL_NAMES = ['VOID BLACK','BLOOD SAMURAI','NEON PULSE','GOLD CIRCUIT','COBALT NIGHT','ABSINTHE','CHROME ROSE','COPPER FORGE']

export default function Layout({ children }) {
  const { palette:p, cyclePalette, paletteIdx } = useStore()
  const nav = useNavigate()
  const loc = useLocation()

  React.useEffect(() => {
    const r = document.documentElement.style
    r.setProperty('--bg',  p.bg)
    r.setProperty('--bg2', p.bg2)
    r.setProperty('--bg3', p.bg3)
    r.setProperty('--tx',  p.tx)
    r.setProperty('--ac',  p.ac)
    r.setProperty('--br',  p.br)
  }, [p])

  const pageLabel = NAV.find(n => n.path === loc.pathname)?.label || 'FOSSARYTHM8'

  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden', background:p.bg, color:p.tx, transition:'background .4s, color .4s' }}>
      {/* Sidebar */}
      <div style={{ width:58, flexShrink:0, display:'flex', flexDirection:'column', alignItems:'center', padding:'14px 0', gap:2, borderRight:`1px solid ${p.br}`, background:p.bg2 }}>
        <div onClick={() => nav('/')} style={{ width:36, height:36, borderRadius:10, background:p.ac, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:12, fontFamily:"'Space Mono',monospace", fontSize:12, fontWeight:900, color:p.bg, cursor:'pointer', transition:'transform .2s', flexShrink:0 }}
          onMouseEnter={e=>e.currentTarget.style.transform='scale(1.08)'}
          onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>
          F8
        </div>
        {NAV.map(item => {
          const active = loc.pathname === item.path
          return (
            <button key={item.path} onClick={() => nav(item.path)} title={item.label}
              style={{ width:42, height:42, borderRadius:10, border:'none', background: active ? p.ac+'22' : 'transparent', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:17, transition:'all .2s', position:'relative', color: active ? p.ac : p.tx, opacity: active ? 1 : .6 }}
              onMouseEnter={e=>{ e.currentTarget.style.background=p.ac+'22'; e.currentTarget.style.color=p.ac; e.currentTarget.style.opacity='1' }}
              onMouseLeave={e=>{ e.currentTarget.style.background=active?p.ac+'22':'transparent'; e.currentTarget.style.color=active?p.ac:p.tx; e.currentTarget.style.opacity=active?'1':'.6' }}>
              {item.icon}
              {item.dot && <span style={{ position:'absolute', top:7, right:7, width:5, height:5, borderRadius:'50%', background:p.ac, animation:'breathe 2s ease-in-out infinite' }} />}
            </button>
          )
        })}
      </div>

      {/* Main */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0, overflow:'hidden' }}>
        <div style={{ height:54, display:'flex', alignItems:'center', padding:'0 18px', gap:10, borderBottom:`1px solid ${p.br}`, flexShrink:0, background:p.bg2 }}>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:12, fontWeight:700, letterSpacing:'2px', flex:1, color:p.ac }}>{pageLabel.toUpperCase()}</span>
          <div style={{ width:6, height:6, borderRadius:'50%', background:p.ac, animation:'breathe 2s infinite' }} />
          <span style={{ fontSize:10, opacity:.4, fontFamily:"'Space Mono',monospace" }}>LIVE</span>
          <div style={{ flex:1 }} />
          <button onClick={cyclePalette}
            style={{ padding:'6px 12px', borderRadius:20, border:`1px solid ${p.br}`, background:'transparent', cursor:'pointer', fontFamily:"'Space Mono',monospace", fontSize:9, fontWeight:700, letterSpacing:'1.5px', color:p.tx, display:'flex', alignItems:'center', gap:6, transition:'all .2s' }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor=p.ac; e.currentTarget.style.color=p.ac }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor=p.br; e.currentTarget.style.color=p.tx }}>
            <div style={{ width:8, height:8, borderRadius:'50%', background:p.ac }} />
            {PAL_NAMES[paletteIdx]}
          </button>
        </div>
        <div style={{ flex:1, overflowY:'auto', overflowX:'hidden', padding:18 }}>
          {children}
        </div>
      </div>
    </div>
  )
}
