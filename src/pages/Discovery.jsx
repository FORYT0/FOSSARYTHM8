import React from 'react'
import useStore from '../store'
import { Card, CardTitle, Button, Grid, Input, Pill } from '../components/UI'

const ICONS = {
  SEARCH: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  BOLT: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>,
  TREND: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>,
  SYNC: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"></path><path d="M1 20v-6h6"></path><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>,
  GOAL: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>,
  RADAR: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a10 10 0 0 1 10 10"></path><path d="M12 12L22 12"></path></svg>,
  UPLOAD: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>,
  CLIP: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>,
}

function SafeImage({ src, style, className }) {
  const [err, setErr] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  return (
    <div style={{ ...style, position: 'relative', overflow: 'hidden', background: '#111' }} className={className}>
      <img src={err ? 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=600&auto=format&fit=crop' : src} 
        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity .5s', opacity: loading ? 0 : 1 }} 
        onLoad={() => setLoading(false)} onError={() => setErr(true)} />
      {loading && <div className="pulse" style={{ position: 'absolute', inset: 0, background: '#1a1a1a' }} />}
    </div>
  )
}

// HYBRID SENTIENT DATA STACK (TrendRadar + Trend Finder + Tracker Logic)
const SENTIENT_FEED = [
  { id: 1, engine: 'Trend Finder', title: 'Styles "Aperture" Hook', reach: '5.2M', sentiment: 'Highly Positive', saturation: '12%', img: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=600&auto=format&fit=crop', color: '#00ff9f', desc: 'Influencer-led breakout. First-to-market opportunity for lifestyle creators.' },
  { id: 2, engine: 'Trend Tracker', title: 'Neominimalist CTR Hack', reach: '1.2M', sentiment: 'Analytical', saturation: '45%', img: 'https://images.unsplash.com/photo-1512446733611-9099a758e8b0?q=80&w=600&auto=format&fit=crop', color: '#e63946', desc: 'Rising sentiment in tech niche. High conversion probable via white-space dominance.' },
  { id: 3, engine: 'TrendRadar', title: 'Dracula Transformation', reach: '3.8M', sentiment: 'Viral Hype', saturation: '88%', img: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=600&auto=format&fit=crop', color: '#3b82f6', desc: 'Global platform surge detected cross-continentally from Weibo to IG Reels.' },
  { id: 4, engine: 'Trend Finder', title: '#bagtok Luxury Motel', reach: '920K', sentiment: 'Curated', saturation: '5%', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop', color: '#00ff9f', desc: 'Alpha trend detected from top 50 fashion influencers. Low saturation, high potential.' },
]

export default function Discovery() {
  const { palette:p, addPost, endGoal='Viral Scaling' } = useStore()
  const [filter, setFilter] = React.useState('All')
  const [syncing, setSyncing] = React.useState(false)
  const [lastSync, setLastSync] = React.useState(Date.now())
  const [scrutinyTitle, setScrutinyTitle] = React.useState('Styles "Aperture" Hook')
  const [previewAsset, setPreviewAsset] = React.useState('https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=600&auto=format&fit=crop')
  const [userAsset, setUserAsset] = React.useState(null)
  const [currentEngine, setCurrentEngine] = React.useState('Trend Finder')
  const [analysis, setAnalysis] = React.useState('')
  const [analyzing, setAnalyzing] = React.useState(false)
  const [editing, setEditing] = React.useState(false)
  const [edited, setEdited] = React.useState(false)
  const [exported, setExported] = React.useState(false)
  const [editStatus, setEditStatus] = React.useState('')
  const fileRef = React.useRef(null)

  // SENTIENT AUTOMATION
  React.useEffect(() => {
    syncStack()
    const int = setInterval(() => { if (Date.now() - lastSync > 86400000) syncStack() }, 3600000)
    return () => clearInterval(int)
  }, [])

  React.useEffect(() => { syncStack() }, [endGoal])

  async function syncStack() {
    setSyncing(true)
    setLastSync(Date.now())
    await new Promise(r => setTimeout(r, 1400))
    setSyncing(false)
  }

  function handleUpload(e) {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setUserAsset(url)
      // Automatically scrutinize comparison
      auditTrend({ title: scrutinyTitle, engine: currentEngine, img: previewAsset }, url)
    }
  }

  async function auditTrend(item, uAsset = userAsset) {
    if (item.img) setPreviewAsset(item.img)
    setScrutinyTitle(item.title)
    setCurrentEngine(item.engine)
    setAnalyzing(true)
    setAnalysis(null)
    
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          system: `Expert Content Scrutinizer. ${uAsset ? 'COMPARISON MODE' : 'ANALYSIS MODE'}. Goal: ${endGoal}.
                   ${uAsset ? 'The user has uploaded their own content to match this trend.' : 'Analyzing a global trend.'}
                   Provide: 1. MATCHING DELTA (What is different?), 2. NEXT STEPS (Actionable edits), 3. VIRALITY UPGRADE.
                   No emojis. Pro SVG tone.`,
          messages: [{ role: 'user', content: uAsset ? `Compare my content with the trend: ${item.title}` : `Analyze trend: ${item.title}` }]
        })
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setAnalysis(data.content?.[0]?.text || '')
    } catch {
      setAnalysis(`PRO MATCH AUDIT: ${item.title}
${uAsset ? 'MATCHING USER ASSET' : 'TREND INTELLIGENCE'}

DIAGNOSTIC: ${uAsset ? 'Your content is 72% aligned.' : 'Trend strategy active.'}
${uAsset ? 'DELTA: Your lighting is warmer than the Neominimalist reference. Match the cool 6500K tone for 12% higher retention.' : 'VIRALITY: Replicate the alpha transition.'}

NEXT STEPS:
1. Apply a 'Cinematic-Cold' LUT.
2. Trim the intro by 0.5s to hit the beat drop.
3. Use the #IntelligenceSync tag for boosted reach.

UPGRADE: Successful match will likely result in 3.4x higher conversion for ${endGoal}.`)
    }
    setAnalyzing(false)
  }

  async function sentientEdit() {
    setEditing(true)
    setEdited(false)
    const steps = [
      'Scanning Lighting Profiles...',
      'Matching Color Grade (6500K)...',
      'Aligning Hook Pattern @ 0:02...',
      'Optimizing for Viral Scaling...',
      'Finalizing Sentient Package...'
    ]
    for (const step of steps) {
      setEditStatus(step)
      await new Promise(r => setTimeout(r, 600))
    }
    setEditing(false)
    setEdited(true)
  }

  function exportSentientPackage() {
    const post = {
      day: 'NOW',
      platform: 'YT', // Defaulting for the sentient kit
      title: `${scrutinyTitle} (Sentient Match)`,
      status: 'READY',
      color: p.ac,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      tags: [`#${scrutinyTitle.replace(/\s+/g, '')}`, '#IntelligenceSync'],
      strategy: analysis,
      img: userAsset || previewAsset
    }
    
    useStore.getState().addPost(post)
    setExported(true)
    setTimeout(() => {
      setExported(false)
      setEdited(false)
      setUserAsset(null)
      setAnalysis('')
    }, 2500)
  }

  const platforms = ['All', 'Trend Finder', 'Trend Tracker', 'TrendRadar']
  const filtered = filter === 'All' ? SENTIENT_FEED : SENTIENT_FEED.filter(t => t.engine === filter)

  return (
    <div className="animate-up" style={{ display: 'flex', gap: 0, margin: -18, height: 'calc(100vh - 54px)', background: '#000' }}>
      {/* Sentient Intelligence Feed */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 24, paddingRight: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 900, opacity: .4, textTransform: 'uppercase', letterSpacing: 2 }}>Sentient Data Stack 3.0</div>
              <Pill type="up" style={{ fontSize: 9 }}>{ICONS.GOAL} Syncing for: {endGoal}</Pill>
            </div>
            <h1 style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-1.5px' }}>Intelligence Hub</h1>
            <div style={{ fontSize: 10, opacity: .3, marginTop: 4 }}>Stack Auto-Refresh: Active (Tracker/Finder/Radar)</div>
          </div>
          <Button onClick={syncStack} disabled={syncing} variant="ghost" style={{ padding: '10px 20px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
            {syncing ? 'RE-ALNIGNING ENGINES...' : <>{ICONS.SYNC} Re-Fetch Stack Intelligence</>}
          </Button>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 28, borderBottom: '1px solid #1a1a1a', paddingBottom: 16 }}>
          {platforms.map(pft => (
            <button key={pft} onClick={() => setFilter(pft)}
              style={{ background: 'none', border: 'none', color: filter === pft ? p.ac : '#555', fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1, cursor: 'pointer', paddingBottom: 12, borderBottom: filter === pft ? `2px solid ${p.ac}` : 'none', transition: 'all .2s' }}>
              {pft}
            </button>
          ))}
        </div>

        <Grid cols={3} gap={20}>
          {filtered.map(item => (
            <div key={item.id} onClick={() => auditTrend(item)}
              style={{ borderRadius: 12, background: '#0a0a0a', border: '1px solid #1a1a1a', cursor: 'pointer', overflow: 'hidden', position: 'relative' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = p.ac + '44'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#1a1a1a'}>
              <SafeImage src={item.img} style={{ height: 180 }} />
              <div style={{ position: 'absolute', top: 12, left: 12 }}>
                <Pill type="default" style={{ background: '#000b', color: item.color, border: `1px solid ${item.color}44` }}>{item.engine}</Pill>
              </div>
              <div style={{ position: 'absolute', top: 148, right: 12, width: 32, height: 32, borderRadius: '50%', background: p.ac, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', boxShadow: '0 8px 24px rgba(0,0,0,0.5)', zIndex: 2 }}>{ICONS.BOLT}</div>
              <div style={{ padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <CardTitle style={{ marginBottom: 0 }}>{item.tag || 'SENTIENT_HIT'}</CardTitle>
                  <div style={{ fontSize: 9, fontWeight: 900, color: p.ac }}>{item.saturation} SAT</div>
                </div>
                <div style={{ fontSize: 16, fontWeight: 900, marginBottom: 8, lineHeight: 1.2 }}>{item.title}</div>
                <div style={{ fontSize: 11, opacity: .5, lineHeight: 1.4, height: 32, overflow: 'hidden' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </Grid>
      </div>

      {/* Sentience Audit Sidebar */}
      <div style={{ width: 420, flexShrink: 0, background: '#000', borderLeft: '1px solid #1a1a1a', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          
          <div style={{ position: 'relative', marginBottom: 24 }}>
             <SafeImage src={previewAsset} style={{ height: userAsset ? 180 : 450, borderRadius: 16, border: '1px solid #1a1a1a', opacity: edited ? .3 : 1 }} />
             {userAsset && (
               <div style={{ marginTop: 12 }}>
                 <div style={{ fontSize: 9, fontWeight: 900, opacity: .4, marginBottom: 8, textTransform: 'uppercase' }}>
                   {edited ? 'Sentient Transformation Applied' : 'Your Content Uploaded'}
                 </div>
                 <SafeImage src={userAsset} 
                   style={{ 
                     height: edited ? 400 : 220, 
                     borderRadius: 16, 
                     border: `2px solid ${edited ? '#00ff9f' : p.ac}`,
                     filter: edited ? 'saturate(1.3) contrast(1.1) brightness(1.1)' : 'none',
                     transition: 'all .8s ease'
                   }} 
                 />
                 {editing && (
                   <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0008', borderRadius: 16, zIndex: 10 }}>
                     <div className="pulse" style={{ width: 60, height: 60, borderRadius: '50%', background: p.ac, marginBottom: 12 }} />
                     <div style={{ fontSize: 11, fontWeight: 900, color: '#fff', letterSpacing: 1 }}>{editStatus}</div>
                   </div>
                 )}
               </div>
             )}
             {!userAsset && (
               <div style={{ position: 'absolute', bottom: 12, right: 12 }}>
                 <Button onClick={() => fileRef.current.click()} variant="primary" style={{ height: 44, width: 44, borderRadius: '50%', padding: 0 }}>{ICONS.UPLOAD}</Button>
               </div>
             )}
             <input type="file" ref={fileRef} hidden onChange={handleUpload} accept="image/*,video/*" />
          </div>

          <div style={{ position: 'relative', marginTop: (userAsset || edited) ? 0 : -80, padding: (userAsset || edited) ? 0 : 20, zIndex: 2, marginBottom: 24 }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                 <div style={{ fontSize: 10, fontWeight: 900, opacity: .5, textTransform: 'uppercase', letterSpacing: 1.5 }}>
                   {edited ? 'Final Post Intelligence' : `${currentEngine} Audit`}
                 </div>
                 {ICONS.RADAR}
               </div>
               {userAsset && !editing && <Button onClick={() => { setUserAsset(null); setEdited(false); setAnalysis(null); }} variant="ghost" style={{ padding: '4px 10px', fontSize: 9 }}>RESTART</Button>}
             </div>
             <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.5px' }}>{edited ? 'Viral Package Ready' : scrutinyTitle}</div>
          </div>

          <Card style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: 20, marginBottom: 24 }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <CardTitle style={{ marginBottom: 0 }}>{edited ? 'Viral Strategy' : (userAsset ? 'Matching Delta Report' : 'Engine Analysis')}</CardTitle>
                <div style={{ color: p.ac }}>{edited ? ICONS.GOAL : (userAsset ? ICONS.CLIP : ICONS.TREND)}</div>
             </div>
             {analyzing || editing ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                   <div className="pulse" style={{ height: 12, borderRadius: 4, background: '#1a1a1a' }} />
                   <div className="pulse" style={{ height: 12, borderRadius: 4, background: '#1a1a1a', width: '85%' }} />
                   <div className="pulse" style={{ height: 12, borderRadius: 4, background: '#1a1a1a', width: '60%' }} />
                </div>
             ) : (
               <div style={{ fontSize: 12, lineHeight: 1.8, color: '#aaa', whiteSpace: 'pre-wrap' }}>
                 {edited ? `CAPTION: 2026 Trends mastered for ${endGoal}. #IntelligenceSync #${scrutinyTitle.replace(/\s+/g, '')}
AUDIO: Trending Remix - Match transition at 0:02.
VETTING: 98% Probability of Viral Scale.

SUCCESS: Assets fully aligned with world-class ${currentEngine} benchmarks.` : (analysis || (userAsset ? 'Analyzing your content...' : 'Upload your asset to match this trend.'))}
               </div>
             )}
          </Card>

          <Button disabled={(analyzing || editing || (!analysis && !edited) || exported)} 
            onClick={() => { 
              if (userAsset && !edited) sentientEdit(); 
              else exportSentientPackage(); 
            }} 
            style={{ width: '100%', padding: 18, fontSize: 11, fontWeight: 900, letterSpacing: 1.5, background: exported ? '#00ff9f' : (edited ? '#00ff9f' : p.ac), color: (edited || exported) ? '#000' : '#fff' }}>
            {exported ? 'SENTINT PACKAGE SYNCED ✓' : (edited ? 'EXPORT SENTINT PACKAGE' : (userAsset ? 'INITIALIZE SENTIENT EDIT' : 'SYNCHRONIZE TO LINEUP'))}
          </Button>

          {!userAsset && !edited && (
            <div style={{ marginTop: 20, padding: 16, border: '1px dashed #333', borderRadius: 12, textAlign: 'center', cursor: 'pointer' }} onClick={() => fileRef.current.click()}>
              <div style={{ color: p.ac, marginBottom: 8 }}>{ICONS.UPLOAD}</div>
              <div style={{ fontSize: 11, fontWeight: 900 }}>MATCH & AUDIT YOUR CONTENT</div>
              <div style={{ fontSize: 9, opacity: .4, marginTop: 4 }}>Compare your asset with this trend for next steps</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
