import React from 'react'
import { useNavigate } from 'react-router-dom'
import useStore from '../store'
import { Card, CardTitle, MetricCard, Pill, Grid, TrendSparkline } from '../components/UI'

export default function Dashboard() {
  const { palette:p, trends, posts, analytics, setSelectedTrend } = useStore()
  const nav = useNavigate()
  const [digest, setDigest] = React.useState('Analyzing your performance delta...')
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function getDigest() {
      try {
        const topTrend = Object.values(trends).flat().sort((a,b)=>b.score-a.score)[0]
        const res = await fetch('/api/generate', {
          method:'POST', headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            model:'llama-3.3-70b-versatile',
            system: 'You are a senior growth manager. Provide 1 punchy, actionable strategy sentence (max 20 words) based on the stats.',
            messages: [{ role:'user', content: `Reach is up 18%. Engagement 6.8%. Top trend is ${topTrend.tag}.` }]
          })
        })
        const data = await res.json()
        setDigest(data.content?.[0]?.text || 'Keep pushing viral hooks on TikTok.')
      } catch (e) { setDigest('Data-driven growth is your best bet today.') }
      setLoading(false)
    }
    getDigest()
  }, [])

  const totalReach = analytics.platforms.reduce((a,x) => a+x.reach, 0)
  const topTrends = [...trends.tiktok.slice(0,2), ...trends.youtube.slice(0,2), ...trends.instagram.slice(0,1), ...trends.x.slice(0,2)]

  const pulseAlerts = [
    { msg:'TikTok algorithm shifting toward #SkillUnlock — 18hr window remaining', type:'hot', platform:'tiktok', tag:'#SkillUnlock' },
    { msg:'IG engagement dip detected — pivot to carousel format now', type:'warn', platform:'instagram', tag:'#CarouselDump' },
    { msg:'#AINews trending on X — jump in within 30 minutes for max reach', type:'hot', platform:'x', tag:'#AINews' },
    { msg:'YT watch time avg up 22% — strong hook performance this week', type:'up', platform:'youtube', tag:'#AIExplained' },
  ]

  function handleAlertClick(alert) {
    const item = trends[alert.platform]?.find(t => t.tag === alert.tag)
    if (item) { setSelectedTrend({...item, platform:alert.platform}); nav('/trends') }
  }

  return (
    <div className="animate-up">
      <Card style={{ 
        marginBottom:14, 
        background:`linear-gradient(90deg, ${p.ac}11 0%, ${p.bg} 100%)`, 
        border:`1px solid ${p.ac}22`,
        backdropFilter:'blur(20px)',
        position:'relative',
        overflow:'hidden'
      }}>
        <div style={{ position:'absolute', top:-10, right:-10, width:60, height:60, background:p.ac, filter:'blur(40px)', opacity:.1, borderRadius:'50%' }} />
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:34, height:34, borderRadius:'50%', background:p.ac, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, flexShrink:0, boxShadow:`0 0 15px ${p.ac}66` }}>🧠</div>
          <div>
            <div style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', opacity:.4, letterSpacing:1, marginBottom:2 }}>AI Manager's Digest</div>
            <div style={{ fontSize:13, fontWeight:600, color:p.tx, lineHeight:1.4 }}>
              {loading ? <span className="pulse">Synthesizing strategy...</span> : digest}
            </div>
          </div>
        </div>
      </Card>

      <Grid cols={4} gap={8} style={{ marginBottom:14 }}>
        <MetricCard value={`${(totalReach/1000000).toFixed(1)}M`} label="Total Reach" delta="+18% this week" />
        <MetricCard value="6.8%" label="Eng Rate" delta="+2.1% vs last week" />
        <MetricCard value="12.4K" label="New Follows" delta="+847 today" />
        <MetricCard value="94" label="AI Score" delta="+6 pts" />
      </Grid>

      <Grid cols={2} gap={10} style={{ marginBottom:14 }}>
        <Card>
          <CardTitle>Platform Status</CardTitle>
          {analytics.platforms.map(plat => (
            <div key={plat.name} onClick={() => nav('/stats')}
              style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10, cursor:'pointer', padding:'4px 6px', borderRadius:8, transition:'background .15s' }}
              onMouseEnter={e=>e.currentTarget.style.background=p.bg3}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              <div style={{ width:32, height:32, borderRadius:8, background:plat.color+'22', border:`1px solid ${plat.color}44`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700, color:plat.color, fontFamily:"'Space Mono',monospace", flexShrink:0 }}>
                {plat.name.slice(0,2).toUpperCase()}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
                  <span style={{ fontSize:12, fontWeight:600 }}>{plat.name}</span>
                  <span style={{ fontSize:10, opacity:.5 }}>{(plat.reach/1000).toFixed(0)}K reach</span>
                </div>
                <div style={{ height:4, borderRadius:2, background:p.br, overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${(plat.reach/1200000)*100}%`, background:plat.color, borderRadius:2, transition:'width .6s' }} />
                </div>
              </div>
            </div>
          ))}
        </Card>

        <Card>
          <CardTitle>AI Pulse</CardTitle>
          {pulseAlerts.map((a,i) => (
            <div key={i} onClick={() => handleAlertClick(a)}
              style={{ display:'flex', gap:8, alignItems:'flex-start', marginBottom:10, cursor:'pointer', padding:'5px 6px', borderRadius:8, transition:'background .15s' }}
              onMouseEnter={e=>e.currentTarget.style.background=p.bg3}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              <div style={{ width:6, height:6, borderRadius:'50%', flexShrink:0, marginTop:4, background:a.type==='hot'?p.ac:a.type==='up'?'#22c55e':'#f59e0b', animation:'breathe 2s infinite' }} />
              <span style={{ fontSize:11, lineHeight:1.5, opacity:.85 }}>{a.msg}</span>
            </div>
          ))}
          <div onClick={() => nav('/lineup')}
            style={{ marginTop:12, padding:10, borderRadius:8, background:p.ac+'11', border:`1px solid ${p.ac}22`, cursor:'pointer', transition:'background .2s' }}
            onMouseEnter={e=>e.currentTarget.style.background=p.ac+'1e'}
            onMouseLeave={e=>e.currentTarget.style.background=p.ac+'11'}>
            <div style={{ fontSize:10, opacity:.5, fontFamily:"'Space Mono',monospace", marginBottom:4 }}>NEXT BEST POST</div>
            <div style={{ fontSize:12, fontWeight:600 }}>TikTok · #SkillUnlock hook video</div>
            <div style={{ fontSize:11, opacity:.6, marginTop:2 }}>Post in 2h 14m for peak reach →</div>
          </div>
        </Card>
      </Grid>

      <Card style={{ marginBottom:14 }}>
        <CardTitle>Trending Now — Click any tag to deep-dive</CardTitle>
        <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
          {topTrends.map(t => (
            <div key={t.tag} onClick={() => { setSelectedTrend(t); nav('/trends') }}
              style={{ display:'flex', alignItems:'center', gap:6, padding:'5px 10px', borderRadius:20, border:`1px solid ${p.ac}33`, background:p.ac+'0d', cursor:'pointer', transition:'all .2s' }}
              onMouseEnter={e=>{ e.currentTarget.style.background=p.ac+'22'; e.currentTarget.style.borderColor=p.ac+'66' }}
              onMouseLeave={e=>{ e.currentTarget.style.background=p.ac+'0d'; e.currentTarget.style.borderColor=p.ac+'33' }}>
              <span style={{ fontSize:11, fontWeight:700, color:p.ac }}>{t.tag}</span>
              <span style={{ fontSize:9, color:'#22c55e', fontFamily:"'Space Mono',monospace" }}>{t.delta}</span>
            </div>
          ))}
        </div>
      </Card>

      <Grid cols={2} gap={10}>
        <Card>
          <CardTitle>Recent Posts</CardTitle>
          {posts.slice(0,4).map(post => (
            <div key={post.id} onClick={() => nav('/lineup')}
              style={{ display:'flex', alignItems:'center', gap:10, padding:'7px 6px', borderRadius:8, cursor:'pointer', borderBottom:`1px solid ${p.br}`, transition:'background .15s' }}
              onMouseEnter={e=>e.currentTarget.style.background=p.bg3}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              <div style={{ width:28, height:28, borderRadius:6, background:post.color+'22', border:`1px solid ${post.color}44`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, fontWeight:700, color:post.color, fontFamily:"'Space Mono',monospace", flexShrink:0 }}>{post.platform}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:11, fontWeight:600, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{post.title}</div>
                <div style={{ fontSize:10, opacity:.4 }}>{post.day} · {post.time}</div>
              </div>
              <Pill type={post.status==='LIVE'?'hot':post.status==='DONE'?'up':post.status==='SCHED'?'warn':'default'}>{post.status}</Pill>
            </div>
          ))}
          <div onClick={() => nav('/lineup')} style={{ marginTop:8, fontSize:11, color:p.ac, cursor:'pointer', opacity:.7, textAlign:'center' }}>View full lineup →</div>
        </Card>

        <Card>
          <CardTitle>This Week's Reach</CardTitle>
          <div style={{ display:'flex', alignItems:'flex-end', gap:6, height:100, paddingTop:10 }}>
            {analytics.weekly.map(d => {
              const max = Math.max(...analytics.weekly.map(x=>x.reach))
              const h = Math.round((d.reach/max)*90)
              return (
                <div key={d.day} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                  <div style={{ width:'100%', height:h, borderRadius:'3px 3px 0 0', background:p.ac, opacity:.7 }} />
                  <span style={{ fontSize:9, opacity:.3, fontFamily:"'Space Mono',monospace" }}>{d.day[0]}</span>
                </div>
              )
            })}
          </div>
          <div onClick={() => nav('/stats')} style={{ marginTop:8, fontSize:11, color:p.ac, cursor:'pointer', opacity:.7, textAlign:'center' }}>Full analytics →</div>
        </Card>
      </Grid>
    </div>
  )
}
