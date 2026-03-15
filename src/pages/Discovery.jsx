import React from 'react'
import useStore from '../store'
import { Card, CardTitle, Button, Grid, Input, Pill, StatBar } from '../components/UI'

const EXPLORE_DATA = [
  { id: 1, platform: 'TikTok', title: 'The "Silent Vlog" Boom', eng: '12.4%', views: '2.4M', tag: '#SilentVlog', reason: 'High retention due to ASMR elements', color: '#00b894' },
  { id: 2, platform: 'Instagram', title: 'Geometric Minimalist Reels', eng: '8.2%', views: '840K', tag: '#Minimalist', reason: 'Strong visual hook in first 0.5s', color: '#d946ef' },
  { id: 3, platform: 'YouTube', title: 'Setup "Deep Dives"', eng: '15.1%', views: '1.2M', tag: '#DeskSetup', reason: 'High search intent for gear specs', color: '#3b82f6' },
  { id: 4, platform: 'TikTok', title: 'POV: You are the AI', eng: '18.7%', views: '5.1M', tag: '#AITrend', reason: 'Algorithm pushing first-person narratives', color: '#00b894' },
  { id: 5, platform: 'Instagram', title: 'AI-Enhanced Carousels', eng: '9.4%', views: '320K', tag: '#Creators', reason: 'Saves are 3x higher than single posts', color: '#d946ef' },
]

export default function Discovery() {
  const { palette:p, addPost } = useStore()
  const [tab, setTab] = React.useState('All')
  const [loading, setLoading] = React.useState(false)
  const [scrutinyTitle, setScrutinyTitle] = React.useState('')
  const [analysis, setAnalysis] = React.useState(null)
  const [analyzing, setAnalyzing] = React.useState(false)

  const platforms = ['All', 'TikTok', 'Instagram', 'YouTube']
  const filtered = tab === 'All' ? EXPLORE_DATA : EXPLORE_DATA.filter(d => d.platform === tab)

  async function scrutinizeContent() {
    if (!scrutinyTitle) return
    setAnalyzing(true)
    setAnalysis(null)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          system: 'You are a professional social media editor. Scrutinize the content idea. Provide: 1. Niche, 2. Edited Feedback, 3. TikTok Caption/Audio Strategy, 4. Instagram Strategy. Keep it punchy and professional.',
          messages: [{ role: 'user', content: `Analyze this content idea: ${scrutinyTitle}` }]
        })
      })
      const data = await res.json()
      const text = data.content?.[0]?.text || ''
      setAnalysis(text)
    } catch (e) {
      setAnalysis('Failed to scrutinize content. Try again later.')
    }
    setAnalyzing(false)
  }

  return (
    <div className="animate-up" style={{ display: 'flex', gap: 20, height: 'calc(100vh - 100px)' }}>
      {/* Main Content Area */}
      <div style={{ flex: 1, overflowY: 'auto', paddingRight: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <CardTitle>Global Explore Hub</CardTitle>
            <div style={{ fontSize: 12, opacity: .5 }}>Trending across all platforms via F8 Engine</div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {platforms.map(plt => (
              <button key={plt} onClick={() => setTab(plt)}
                style={{ background: tab === plt ? p.ac + '22' : 'transparent', border: `1px solid ${tab === plt ? p.ac : p.br}`, borderRadius: 20, padding: '5px 12px', fontSize: 11, cursor: 'pointer', color: tab === plt ? p.ac : p.tx, transition: 'all .2s' }}>
                {plt}
              </button>
            ))}
          </div>
        </div>

        <Grid cols={2} gap={14}>
          {filtered.map(item => (
            <Card key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: item.color }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Pill type="default" style={{ color: item.color, borderColor: item.color + '33' }}>{item.platform}</Pill>
                <div style={{ fontSize: 10, opacity: .4, fontWeight: 700 }}>ENG: {item.eng}</div>
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontSize: 11, color: p.ac, fontFamily: "'Space Mono', monospace" }}>{item.tag}</div>
              </div>
              <div style={{ fontSize: 12, opacity: .7, lineHeight: 1.5 }}>{item.reason}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 700 }}>{item.views} views</span>
                <Button variant="ghost" style={{ fontSize: 10, padding: '4px 10px' }} onClick={() => setScrutinyTitle(item.title)}>Replicate ↴</Button>
              </div>
            </Card>
          ))}
        </Grid>
      </div>

      {/* AI Scrutinizer Sidebar */}
      <div style={{ width: 320, flexShrink: 0 }}>
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', background: p.bg2 + 'cc', backdropFilter: 'blur(20px)', border: `1px solid ${p.ac}11` }}>
          <CardTitle style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 16 }}>🔍</span> AI Scrutinizer
          </CardTitle>
          <div style={{ fontSize: 11, opacity: .5, marginBottom: 16 }}>Drop an idea or image link to get pro-grade feedback.</div>
          
          <div style={{ marginBottom: 16 }}>
            <Input 
              value={scrutinyTitle} 
              onChange={e => setScrutinyTitle(e.target.value)} 
              placeholder="Enter content idea or paste link..."
              style={{ background: p.bg, border: `1px solid ${p.br}`, fontSize: 11 }}
            />
            <Button 
              onClick={scrutinizeContent} 
              disabled={analyzing || !scrutinyTitle} 
              style={{ width: '100%', marginTop: 8, background: p.ac, color: p.bg }}>
              {analyzing ? 'Scrutinizing...' : 'Scrutinize Content'}
            </Button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', background: p.bg + '66', borderRadius: 12, padding: 12, border: `1px solid ${p.br}` }}>
            {analysis ? (
              <div className="animate-up" style={{ fontSize: 12, lineHeight: 1.6 }}>
                <div style={{ whiteSpace: 'pre-wrap' }}>{analysis}</div>
              </div>
            ) : analyzing ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="pulse" style={{ height: 14, background: p.br, borderRadius: 4, width: i === 4 ? '60%' : '100%' }} />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', marginTop: 40, opacity: .3 }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>⚡</div>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }}>Waiting for Input</div>
              </div>
            )}
          </div>

          {analysis && (
            <Button variant="ghost" style={{ width: '100%', marginTop: 12, fontSize: 10 }} onClick={() => {
              addPost({ title: scrutinyTitle, platform: 'TT', day: 'MON', status: 'IDEA', time: '12:00', tags: ['#Scrutinized'], color: '#00b894' })
              alert('Added to Lineup as a DRAFT!')
            }}>
              Send Report to Lineup
            </Button>
          )}
        </Card>
      </div>
    </div>
  )
}
