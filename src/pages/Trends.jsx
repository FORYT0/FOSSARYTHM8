import React from 'react'
import { useStore } from '../store'
import { Card, CardTitle, Grid, Modal, Button, TrendSparkline } from '../components/UI'

const PLATFORMS = ['tiktok', 'youtube', 'instagram', 'x']
const PLATFORM_LABELS = { tiktok: 'TikTok', youtube: 'YouTube', instagram: 'Instagram', x: 'X / Twitter' }
const PLATFORM_COLORS = { tiktok: '#00b894', youtube: '#3b82f6', instagram: '#d946ef', x: '#6366f1' }

const ALG_TIPS = {
  youtube:   ['Post 2-3x/week for compounding reach — consistency is the #1 signal','Thumbnail CTR target: 10%+. Test faces vs text-heavy designs A/B','Hook must deliver on title promise in first 30 seconds','Chapters boost watch time and search indexing dramatically','End screen + cards placed at 85% retention point drives subs'],
  tiktok:    ['Post 3-4x/day across different time zones for global reach','Trending audio boosts reach by up to 40% — check Creative Center daily','Hook must land in first 3 seconds — zero intros, zero name drops','Reply to every comment within 1hr to boost engagement velocity','Duet or stitch trending content to borrow audience momentum'],
  instagram: ['Carousels get 3x more saves than single images right now','Reels under 60s hit optimal algorithmic distribution','Mix 3 niche + 2 trending hashtags per post for best reach','Stories keep you in followers daily feed — post daily','Alt text and caption keywords feed Instagram growing search'],
  x:         ['Text-only threads outperform link posts — put URLs in replies only','Quote-tweet established accounts for immediate visibility boost','B2B peaks 8-10am, consumer content peaks 6-8pm','Bookmarks now signal content quality to the algorithm strongly','Jump on trending threads within the first 2 hours for lift'],
}

export default function Trends() {
  const { palette: p, trends, selectedTrend, setSelectedTrend } = useStore()
  const [activePlatform, setActivePlatform] = React.useState('tiktok')
  const [localSelected, setLocalSelected] = React.useState(null)

  React.useEffect(() => {
    if (selectedTrend) {
      const plat = Object.entries(trends).find(([, v]) => v.some(t => t.tag === selectedTrend.tag))?.[0]
      if (plat) setActivePlatform(plat)
      setLocalSelected(selectedTrend)
      setSelectedTrend(null)
    }
  }, [])

  const data = trends[activePlatform] || []
  const color = PLATFORM_COLORS[activePlatform]

  return (
    <div className="animate-up">
      <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
        {PLATFORMS.map(pl => (
          <button key={pl} onClick={() => setActivePlatform(pl)}
            style={{ padding: '6px 14px', borderRadius: 6, border: `1px solid ${activePlatform === pl ? PLATFORM_COLORS[pl] : p.br}`, background: activePlatform === pl ? PLATFORM_COLORS[pl] + '22' : 'transparent', color: activePlatform === pl ? PLATFORM_COLORS[pl] : p.tx, cursor: 'pointer', fontSize: 11, fontWeight: 600, transition: 'all .2s' }}>
            {PLATFORM_LABELS[pl]}
          </button>
        ))}
      </div>

      <Grid cols={2} gap={10}>
        <div>
          <Card>
            <CardTitle>Top Trending — Click to Deep Dive</CardTitle>
            {data.map((t, i) => (
              <div key={t.tag} onClick={() => setLocalSelected({ ...t, platform: activePlatform })}
                style={{ background: p.bg, borderRadius: 8, padding: '10px 12px', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 10, border: `1px solid ${p.br}`, transition: 'all .2s', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = color + '55'; e.currentTarget.style.transform = 'translateX(2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = p.br; e.currentTarget.style.transform = 'none' }}>
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, opacity: .3, width: 16, flexShrink: 0 }}>{i + 1}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: p.ac, marginBottom: 4 }}>{t.tag}</div>
                  <div style={{ height: 3, borderRadius: 3, background: p.br, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${t.score}%`, background: color, opacity: .7 }} />
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 11, fontFamily: "'Space Mono',monospace" }}>{t.vol}</div>
                  <div style={{ fontSize: 10, color: '#22c55e' }}>{t.delta}</div>
                </div>
                <TrendSparkline data={t.growth} color={color} height={28} />
              </div>
            ))}
          </Card>
        </div>

        <Card>
          <CardTitle>Algorithm Intelligence · {PLATFORM_LABELS[activePlatform]}</CardTitle>
          {(ALG_TIPS[activePlatform] || []).map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: p.ac, marginTop: 6, flexShrink: 0 }} />
              <span style={{ fontSize: 11, lineHeight: 1.6, opacity: .85 }}>{tip}</span>
            </div>
          ))}
          <div style={{ marginTop: 16, padding: 12, borderRadius: 8, background: color + '11', border: `1px solid ${color}33` }}>
            <div style={{ fontSize: 10, opacity: .5, fontFamily: "'Space Mono',monospace", marginBottom: 4 }}>PEAK WINDOW</div>
            <div style={{ fontSize: 12, fontWeight: 600, color }}>{data[0]?.peakTime || 'Check platform insights'}</div>
          </div>
        </Card>
      </Grid>

      <Modal open={!!localSelected} onClose={() => setLocalSelected(null)} title={`TREND ANALYSIS — ${localSelected?.tag}`} width={680}>
        {localSelected && (
          <div>
            <Grid cols={3} gap={8} style={{ marginBottom: 16 }}>
              {[['Trend Score', localSelected.score, p.ac], ['Volume', localSelected.vol, '#22c55e'], ['Growth', localSelected.delta, '#f59e0b']].map(([label, val, color]) => (
                <div key={label} style={{ padding: 12, borderRadius: 8, background: p.bg, border: `1px solid ${p.br}`, textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 20, fontWeight: 700, color }}>{val}</div>
                  <div style={{ fontSize: 10, opacity: .4, letterSpacing: 1, textTransform: 'uppercase', marginTop: 3 }}>{label}</div>
                </div>
              ))}
            </Grid>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10, opacity: .4, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8, fontFamily: "'Space Mono',monospace" }}>7-Day Trend</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 80 }}>
                {(localSelected.growth || []).map((v, i) => {
                  const max = Math.max(...localSelected.growth)
                  const h = Math.round((v / max) * 70)
                  return (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                      <div style={{ width: '100%', height: h, borderRadius: '3px 3px 0 0', background: PLATFORM_COLORS[localSelected.platform] || p.ac, opacity: i === 6 ? 1 : .45 }} />
                      <span style={{ fontSize: 8, opacity: .3, fontFamily: "'Space Mono',monospace" }}>D{i + 1}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div style={{ padding: 14, borderRadius: 10, background: p.bg, border: `1px solid ${p.br}`, marginBottom: 16 }}>
              <div style={{ fontSize: 11, lineHeight: 1.7, opacity: .85 }}>{localSelected.desc}</div>
            </div>

            <Grid cols={2} gap={10} style={{ marginBottom: 16 }}>
              <div style={{ padding: 12, borderRadius: 8, background: p.bg, border: `1px solid ${p.br}` }}>
                <div style={{ fontSize: 10, opacity: .4, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6, fontFamily: "'Space Mono',monospace" }}>Engagement Rate</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: p.ac, fontFamily: "'Space Mono',monospace" }}>{localSelected.engagement}</div>
              </div>
              <div style={{ padding: 12, borderRadius: 8, background: p.bg, border: `1px solid ${p.br}` }}>
                <div style={{ fontSize: 10, opacity: .4, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6, fontFamily: "'Space Mono',monospace" }}>Peak Post Time</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: p.ac }}>{localSelected.peakTime}</div>
              </div>
            </Grid>

            <Button onClick={() => setLocalSelected(null)} style={{ width: '100%' }}>Close</Button>
          </div>
        )}
      </Modal>
    </div>
  )
}
