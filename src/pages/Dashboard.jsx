import { useNavigate } from 'react-router-dom'
import useStore from '../store'
import { TRENDS, PLATFORM_STATS, PLATFORMS } from '../data/appData'

export default function Dashboard() {
  const navigate = useNavigate()
  const { posts, setActivePlatform } = useStore()
  const todayStr = new Date().toISOString().split('T')[0]
  const todayPosts = posts.filter(p => p.date === todayStr)

  const topTrends = Object.entries(TRENDS).flatMap(([plat, ts]) =>
    ts.slice(0,2).map(t => ({ ...t, platform: plat }))
  ).sort((a,b) => b.score - a.score).slice(0,6)

  return (
    <div className="section-pad page-enter">
      <div className="g4" style={{marginBottom:16}}>
        {[['2.4M','Total Reach','+18%'],['6.8%','Eng Rate','+2.1%'],['12.4K','New Follows','+847'],['94','AI Score','+6']].map(([v,l,d]) => (
          <div key={l} className="card" style={{textAlign:'center'}}>
            <div className="met-val">{v}</div>
            <div className="met-lbl">{l}</div>
            <div className="met-delta delta-up">{d}</div>
          </div>
        ))}
      </div>

      <div className="g2" style={{marginBottom:16}}>
        <div className="card">
          <div className="card-title">Platform Status</div>
          {Object.entries(PLATFORM_STATS).map(([key, stat]) => (
            <div key={key} onClick={() => { setActivePlatform(key); navigate('/analytics') }}
              style={{display:'flex',alignItems:'center',gap:10,marginBottom:12,cursor:'pointer',borderRadius:8,padding:'6px 4px',transition:'background .2s'}}
              onMouseOver={e=>e.currentTarget.style.background='var(--ac)11'}
              onMouseOut={e=>e.currentTarget.style.background='transparent'}>
              <div style={{width:34,height:34,borderRadius:8,background:`${stat.color}22`,border:`1px solid ${stat.color}44`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,color:stat.color,fontFamily:'monospace',flexShrink:0}}>
                {PLATFORMS[key].short}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span style={{fontSize:12,fontWeight:600}}>{PLATFORMS[key].label}</span>
                  <span style={{fontSize:10,opacity:.5}}>{stat.followers}</span>
                </div>
                <div className="stat-bar"><div className="stat-fill" style={{width:`${stat.pct}%`,background:stat.color}} /></div>
              </div>
              <span style={{fontSize:10,color:'#22c55e',fontFamily:'monospace',flexShrink:0}}>{stat.growth}</span>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-title">AI Pulse</div>
          {[
            {msg:'TikTok #SkillUnlock spiking — 18hr window remaining', type:'hot', path:'/trends/tiktok/SkillUnlock'},
            {msg:'IG engagement dip detected — pivot to carousel format', type:'warn', path:'/trends/instagram/CarouselDump'},
            {msg:'#AINews trending on X — thought leadership opportunity', type:'hot', path:'/trends/x/AINews'},
            {msg:'YT watch time avg up 22% — strong hook performance', type:'up', path:'/analytics'},
          ].map((item, i) => (
            <div key={i} onClick={() => navigate(item.path)}
              style={{display:'flex',gap:8,alignItems:'flex-start',marginBottom:10,cursor:'pointer',borderRadius:6,padding:'4px',transition:'background .2s'}}
              onMouseOver={e=>e.currentTarget.style.background='var(--ac)11'}
              onMouseOut={e=>e.currentTarget.style.background='transparent'}>
              <div style={{width:6,height:6,borderRadius:'50%',flexShrink:0,marginTop:4,background:item.type==='hot'?'var(--ac)':item.type==='up'?'#22c55e':'#f59e0b',animation:'breathe 2s infinite'}} />
              <span style={{fontSize:11,lineHeight:1.5,flex:1}}>{item.msg}</span>
              <span style={{opacity:.3}}>›</span>
            </div>
          ))}
          <div style={{marginTop:14,padding:12,borderRadius:10,background:'var(--ac)11',border:'1px solid var(--ac)22',cursor:'pointer'}} onClick={()=>navigate('/lineup')}>
            <div className="card-title" style={{marginBottom:4}}>Next Best Post</div>
            <div style={{fontSize:13,fontWeight:600}}>TikTok · #SkillUnlock hook video</div>
            <div style={{fontSize:11,opacity:.6,marginTop:2}}>Post in 2h 14m for peak reach ›</div>
          </div>
        </div>
      </div>

      {todayPosts.length > 0 && (
        <div className="card" style={{marginBottom:16}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
            <div className="card-title" style={{marginBottom:0}}>Today's Posts</div>
            <button className="btn btn-sm" onClick={()=>navigate('/lineup')}>Manage ›</button>
          </div>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            {todayPosts.map(p => {
              const plat = PLATFORMS[p.platform]
              return (
                <div key={p.id} onClick={()=>navigate('/lineup')}
                  style={{padding:'8px 12px',borderRadius:8,border:`1px solid ${plat.color}44`,background:`${plat.color}11`,cursor:'pointer',transition:'border-color .2s'}}
                  onMouseOver={e=>e.currentTarget.style.borderColor=plat.color}
                  onMouseOut={e=>e.currentTarget.style.borderColor=`${plat.color}44`}>
                  <div style={{fontSize:10,fontWeight:700,color:plat.color,marginBottom:2}}>{plat.short} · {p.type}</div>
                  <div style={{fontSize:12,fontWeight:600}}>{p.title}</div>
                  <div style={{fontSize:10,opacity:.5,marginTop:2,fontFamily:'monospace'}}>{p.status.toUpperCase()}</div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className="card">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
          <div className="card-title" style={{marginBottom:0}}>Top Trending Signals</div>
          <button className="btn btn-sm" onClick={()=>navigate('/trends')}>View All ›</button>
        </div>
        <div className="g3">
          {topTrends.map(t => {
            const plat = PLATFORMS[t.platform]
            return (
              <div key={t.tag+t.platform} className="card card-clickable" style={{padding:12,background:'var(--bg)'}}
                onClick={()=>navigate(`/trends/${t.platform}/${t.tag.replace('#','')}`)}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                  <span style={{fontSize:10,fontWeight:700,color:plat.color,fontFamily:'monospace'}}>{plat.short}</span>
                  <span style={{fontSize:10,color:'#22c55e'}}>{t.change}</span>
                </div>
                <div style={{fontSize:13,fontWeight:700,color:'var(--ac)',marginBottom:4}}>{t.tag}</div>
                <div style={{fontSize:10,opacity:.5}}>{t.vol} · {t.window}</div>
                <div className="stat-bar" style={{marginTop:8}}>
                  <div className="stat-fill" style={{width:`${t.score}%`,background:plat.color}} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
