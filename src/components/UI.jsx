import React from 'react'
import useStore from '../store'

export function Card({ children, style, onClick }) {
  const { palette:p } = useStore()
  const [hov, setHov] = React.useState(false)
  return (
    <div onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ background:p.bg2, border:`1px solid ${hov&&onClick?p.ac+'66':hov?p.ac+'33':p.br}`, borderRadius:12, padding:14, transition:'border-color .2s, transform .15s', cursor:onClick?'pointer':'default', transform:onClick&&hov?'translateY(-1px)':'none', ...style }}>
      {children}
    </div>
  )
}

export function CardTitle({ children }) {
  return <div style={{ fontSize:10, fontWeight:600, letterSpacing:'1.5px', textTransform:'uppercase', opacity:.4, marginBottom:10, fontFamily:"'Space Mono',monospace" }}>{children}</div>
}

export function MetricCard({ value, label, delta, positive=true }) {
  const { palette:p } = useStore()
  return (
    <Card style={{ textAlign:'center' }}>
      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:20, fontWeight:700, color:p.ac }}>{value}</div>
      <div style={{ fontSize:10, opacity:.45, letterSpacing:'1px', textTransform:'uppercase', marginTop:3 }}>{label}</div>
      {delta && <div style={{ fontSize:10, marginTop:5, color:positive?'#22c55e':'#ef4444' }}>{delta}</div>}
    </Card>
  )
}

export function Pill({ children, type='default' }) {
  const { palette:p } = useStore()
  const colors = {
    hot:  { color:p.ac,       border:p.ac+'44',       bg:p.ac+'11' },
    up:   { color:'#22c55e',  border:'#22c55e44',      bg:'#22c55e11' },
    warn: { color:'#f59e0b',  border:'#f59e0b44',      bg:'#f59e0b11' },
    err:  { color:'#ef4444',  border:'#ef444444',      bg:'#ef444411' },
    default: { color:p.tx,   border:p.br,              bg:'transparent' },
  }
  const c = colors[type] || colors.default
  return <span style={{ display:'inline-flex', alignItems:'center', gap:3, padding:'2px 8px', borderRadius:20, fontSize:10, fontWeight:600, border:`1px solid ${c.border}`, background:c.bg, color:c.color }}>{children}</span>
}

export function Button({ children, onClick, variant='primary', style, disabled }) {
  const { palette:p } = useStore()
  const [hov, setHov] = React.useState(false)
  const styles = {
    primary: { background:hov?p.ac+'cc':p.ac, color:p.bg, border:'none' },
    ghost:   { background:hov?p.ac+'22':'transparent', color:p.ac, border:`1px solid ${p.ac}44` },
    danger:  { background:hov?'#ef444422':'transparent', color:'#ef4444', border:'1px solid #ef444444' },
  }
  return (
    <button onClick={onClick} disabled={disabled} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ padding:'8px 16px', borderRadius:8, cursor:disabled?'not-allowed':'pointer', fontSize:11, fontWeight:700, fontFamily:"'Space Mono',monospace", letterSpacing:'1px', transition:'all .2s', opacity:disabled?.4:1, ...styles[variant], ...style }}>
      {children}
    </button>
  )
}

export function Input({ value, onChange, placeholder, multiline, style, onKeyDown }) {
  const { palette:p } = useStore()
  const [focus, setFocus] = React.useState(false)
  const base = { background:p.bg, border:`1px solid ${focus?p.ac+'66':p.br}`, borderRadius:10, padding:'9px 13px', fontSize:12, color:p.tx, width:'100%', fontFamily:'inherit', outline:'none', transition:'border-color .2s', ...style }
  return multiline
    ? <textarea value={value} onChange={onChange} placeholder={placeholder} onKeyDown={onKeyDown} onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)} style={{...base,resize:'none'}} />
    : <input value={value} onChange={onChange} placeholder={placeholder} onKeyDown={onKeyDown} onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)} style={base} />
}

export function Select({ value, onChange, options, style }) {
  const { palette:p } = useStore()
  return (
    <select value={value} onChange={onChange} style={{ background:p.bg, color:p.tx, border:`1px solid ${p.br}`, borderRadius:6, padding:'6px 8px', fontSize:11, outline:'none', cursor:'pointer', ...style }}>
      {options.map(o => <option key={o.value||o} value={o.value||o}>{o.label||o}</option>)}
    </select>
  )
}

export function Spinner() {
  const { palette:p } = useStore()
  return <div style={{ width:16, height:16, border:`2px solid ${p.br}`, borderTopColor:p.ac, borderRadius:'50%', animation:'spin .8s linear infinite', display:'inline-block' }} />
}

export function Grid({ cols=2, gap=10, children, style }) {
  return <div style={{ display:'grid', gridTemplateColumns:`repeat(${cols}, 1fr)`, gap, ...style }}>{children}</div>
}

export function Modal({ open, onClose, children, title, width=600 }) {
  const { palette:p } = useStore()
  if (!open) return null
  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.75)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:20, animation:'fadeIn .15s ease' }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:p.bg2, border:`1px solid ${p.br}`, borderRadius:16, width:'100%', maxWidth:width, maxHeight:'85vh', overflow:'auto', animation:'slideUp .2s ease' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 20px', borderBottom:`1px solid ${p.br}` }}>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:12, fontWeight:700, letterSpacing:'1px', color:p.ac }}>{title}</span>
          <button onClick={onClose} style={{ background:'none', border:'none', color:p.tx, cursor:'pointer', fontSize:18, opacity:.5, lineHeight:1 }}>✕</button>
        </div>
        <div style={{ padding:20 }}>{children}</div>
      </div>
    </div>
  )
}

export function TrendSparkline({ data, color, height=32 }) {
  if (!data || data.length < 2) return null
  const max = Math.max(...data), min = Math.min(...data), range = max-min||1
  const w=80, h=height
  const pts = data.map((v,i)=>`${(i/(data.length-1))*w},${h-((v-min)/range)*h}`).join(' ')
  return (
    <svg width={w} height={h} style={{ overflow:'visible', flexShrink:0 }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function StatBar({ value, max=100, color, style }) {
  const { palette:p } = useStore()
  return (
    <div style={{ height:6, borderRadius:3, background:p.br, overflow:'hidden', ...style }}>
      <div style={{ height:'100%', width:`${(value/max)*100}%`, borderRadius:3, background:color||p.ac, transition:'width .6s' }} />
    </div>
  )
}
