import React from 'react'
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import useStore from '../store'
import { Card, CardTitle, Grid, MetricCard } from '../components/UI'

function Tip({ active, payload, label, p }) {
  if (!active||!payload?.length) return null
  return (
    <div style={{ background:p.bg2, border:`1px solid ${p.br}`, borderRadius:8, padding:'8px 12px', fontSize:11 }}>
      <div style={{ fontFamily:"'Space Mono',monospace", opacity:.5, marginBottom:4 }}>{label}</div>
      {payload.map((e,i)=><div key={i} style={{ color:e.color||p.ac, marginBottom:2 }}>{e.name}: <strong>{typeof e.value==='number'?e.value.toLocaleString():e.value}</strong></div>)}
    </div>
  )
}

export default function Stats() {
  const { palette:p, analytics, analyticsRange, setAnalyticsRange } = useStore()
  const data = analytics[analyticsRange] || []
  const [metric, setMetric] = React.useState('reach')
  const totals = { reach:data.reduce((a,x)=>a+x.reach,0), eng:data.reduce((a,x)=>a+x.eng,0), follows:data.reduce((a,x)=>a+x.follows,0) }

  return (
    <div className="animate-up">
      <div style={{ display:'flex', gap:6, marginBottom:14 }}>
        {['weekly','monthly'].map(r=>(
          <button key={r} onClick={()=>setAnalyticsRange(r)} style={{ padding:'5px 14px', borderRadius:6, border:`1px solid ${analyticsRange===r?p.ac:p.br}`, background:analyticsRange===r?p.ac+'22':'transparent', color:analyticsRange===r?p.ac:p.tx, cursor:'pointer', fontSize:11, fontWeight:600, transition:'all .2s', textTransform:'capitalize' }}>{r}</button>
        ))}
      </div>
      <Grid cols={4} gap={8} style={{ marginBottom:14 }}>
        <MetricCard value={`${(totals.reach/1000).toFixed(0)}K`} label="Total Reach" delta="+18%" />
        <MetricCard value={totals.eng.toLocaleString()} label="Engagements" delta="+12%" />
        <MetricCard value={totals.follows.toLocaleString()} label="New Follows" delta="+9%" />
        <MetricCard value="6.8%" label="Avg Eng Rate" delta="+2.1%" />
      </Grid>
      <Card style={{ marginBottom:14 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
          <CardTitle>Reach & Engagement</CardTitle>
          <div style={{ display:'flex', gap:6 }}>
            {['reach','eng','follows'].map(m=>(
              <button key={m} onClick={()=>setMetric(m)} style={{ padding:'3px 10px', borderRadius:6, border:`1px solid ${metric===m?p.ac:p.br}`, background:metric===m?p.ac+'22':'transparent', color:metric===m?p.ac:p.tx, cursor:'pointer', fontSize:10, fontWeight:600, transition:'all .2s', textTransform:'capitalize' }}>{m}</button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data} margin={{ top:5, right:10, bottom:0, left:0 }}>
            <defs>
              <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={p.ac} stopOpacity={0.25} />
                <stop offset="95%" stopColor={p.ac} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={p.br} strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="day" tick={{ fill:p.tx, opacity:.4, fontSize:10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill:p.tx, opacity:.4, fontSize:10 }} axisLine={false} tickLine={false} tickFormatter={v=>v>=1000?`${(v/1000).toFixed(0)}K`:v} />
            <Tooltip content={<Tip p={p} />} />
            <Area type="monotone" dataKey={metric} stroke={p.ac} strokeWidth={2} fill="url(#ag)" dot={{ fill:p.ac, strokeWidth:0, r:3 }} activeDot={{ r:5, fill:p.ac }} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
      <Grid cols={2} gap={10} style={{ marginBottom:14 }}>
        <Card>
          <CardTitle>Platform Reach</CardTitle>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={analytics.platforms} layout="vertical" margin={{ top:5, right:10, bottom:0, left:0 }}>
              <CartesianGrid stroke={p.br} strokeDasharray="4 4" horizontal={false} />
              <XAxis type="number" tick={{ fill:p.tx, opacity:.4, fontSize:10 }} axisLine={false} tickLine={false} tickFormatter={v=>`${(v/1000).toFixed(0)}K`} />
              <YAxis type="category" dataKey="name" tick={{ fill:p.tx, opacity:.6, fontSize:10 }} axisLine={false} tickLine={false} width={70} />
              <Tooltip content={<Tip p={p} />} formatter={v=>v.toLocaleString()} />
              <Bar dataKey="reach" radius={[0,4,4,0]} fill={p.ac} opacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <CardTitle>6-Month Growth</CardTitle>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={analytics.growth6m} margin={{ top:5, right:10, bottom:0, left:0 }}>
              <CartesianGrid stroke={p.br} strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="month" tick={{ fill:p.tx, opacity:.4, fontSize:10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:p.tx, opacity:.4, fontSize:10 }} axisLine={false} tickLine={false} tickFormatter={v=>`${(v/1000).toFixed(0)}K`} />
              <Tooltip content={<Tip p={p} />} formatter={v=>v.toLocaleString()} />
              <Line type="monotone" dataKey="subs" stroke={p.ac} strokeWidth={2} dot={{ fill:p.ac, r:4, strokeWidth:0 }} activeDot={{ r:6 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </Grid>
      <Card>
        <CardTitle>Platform Breakdown</CardTitle>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 80px 80px 80px 80px', gap:8, padding:'6px 10px', fontSize:10, opacity:.4, letterSpacing:1, textTransform:'uppercase', fontFamily:"'Space Mono',monospace", borderBottom:`1px solid ${p.br}` }}>
          <span>Platform</span><span>Reach</span><span>Eng %</span><span>Follows</span><span>Posts</span>
        </div>
        {analytics.platforms.map(pl=>(
          <div key={pl.name} style={{ display:'grid', gridTemplateColumns:'1fr 80px 80px 80px 80px', gap:8, padding:'10px 10px', borderBottom:`1px solid ${p.br}`, alignItems:'center', cursor:'pointer', borderRadius:6, transition:'background .15s' }}
            onMouseEnter={e=>e.currentTarget.style.background=p.bg3}
            onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}><div style={{ width:8, height:8, borderRadius:'50%', background:pl.color, flexShrink:0 }} /><span style={{ fontSize:12, fontWeight:600 }}>{pl.name}</span></div>
            <span style={{ fontSize:11, fontFamily:"'Space Mono',monospace" }}>{(pl.reach/1000).toFixed(0)}K</span>
            <span style={{ fontSize:11, color:'#22c55e', fontFamily:"'Space Mono',monospace" }}>{pl.eng}</span>
            <span style={{ fontSize:11, fontFamily:"'Space Mono',monospace" }}>{pl.follows.toLocaleString()}</span>
            <span style={{ fontSize:11, fontFamily:"'Space Mono',monospace" }}>{pl.posts}</span>
          </div>
        ))}
      </Card>
    </div>
  )
}
