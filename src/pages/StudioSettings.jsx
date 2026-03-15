import React from 'react'
import useStore from '../store'
import { Card, CardTitle, Grid, Button, Input } from '../components/UI'

const STEPS=[
  {title:'Color Grade',desc:'Boost shadows +15, saturation +10. TikTok: high contrast. IG: muted tones. YouTube: punchy but natural.'},
  {title:'Crop & Frame',desc:'Rule of thirds. TikTok 9:16 — avoid top/bottom 15%. YouTube thumbnail 16:9 — faces left 40%.'},
  {title:'Text Overlay',desc:'Max 5 words. Bold weight. White + 2px black stroke. Center or bottom third. Min 48pt export size.'},
  {title:'Caption Formula',desc:'Hook → Value → CTA. 150 chars max on X. Pinned comment for TikTok long copy. 3-5 niche hashtags IG.'},
  {title:'Audio Layer',desc:'Music 15-20% volume. Voice 80-85%. Trending audio +40% reach. Source: Epidemic Sound or Artlist.'},
  {title:'Export & Post',desc:'TikTok: 7-9am, 12-3pm, 7-11pm. IG: Tue-Thu 9am-12pm. YT: 2-4pm weekdays. Schedule 3-5 min before peak.'},
]

export function Studio() {
  const { palette:p } = useStore()
  const [activeStep, setActiveStep] = React.useState(0)
  return (
    <div className="animate-up">
      <Grid cols={2} gap={10}>
        <Card>
          <CardTitle>Editing Workflow</CardTitle>
          {STEPS.map((s,i)=>(
            <div key={i} style={{ display:'flex', gap:10, cursor:'pointer' }} onClick={()=>setActiveStep(i)}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                <div style={{ width:28, height:28, borderRadius:'50%', background:i===activeStep?p.ac+'33':p.ac+'11', border:`1px solid ${i===activeStep?p.ac:p.ac+'33'}`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, color:i===activeStep?p.ac:p.tx, flexShrink:0, transition:'all .2s' }}>{i+1}</div>
                {i<STEPS.length-1&&<div style={{ width:1, background:p.ac+'22', margin:'0 auto', flex:1, minHeight:10 }} />}
              </div>
              <div style={{ paddingBottom:i<STEPS.length-1?10:0, paddingTop:4 }}>
                <div style={{ fontSize:12, fontWeight:600, marginBottom:3, color:i===activeStep?p.ac:p.tx, transition:'color .2s' }}>{s.title}</div>
                <div style={{ fontSize:11, opacity:.55, lineHeight:1.5 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </Card>
        <div>
          <Card style={{ marginBottom:10 }}>
            <CardTitle>Format Specs</CardTitle>
            <Grid cols={2} gap={6}>
              {[['TikTok','9:16 · 1080×1920 · 60s max'],['Instagram','4:5 · 1080×1350 · 2200 chars'],['YouTube','16:9 · 1920×1080 · 15min+'],['X / Twitter','16:9 · 1280×720 · 140 chars']].map(([pl,spec])=>(
                <div key={pl} style={{ padding:10, borderRadius:8, background:p.bg, border:`1px solid ${p.br}` }}>
                  <div style={{ fontSize:11, fontWeight:700, color:p.ac, marginBottom:4 }}>{pl}</div>
                  <div style={{ fontSize:10, opacity:.5, lineHeight:1.4 }}>{spec}</div>
                </div>
              ))}
            </Grid>
          </Card>
          <Card>
            <CardTitle>Hook Templates</CardTitle>
            {['"Nobody talks about this trick..."','"I tried this for 30 days. Here\'s what happened."','"Stop doing this. Do this instead."','"The algorithm is pushing this right now."','"POV: You finally understand this"'].map((hook,i)=>(
              <div key={i} style={{ padding:'8px 10px', borderRadius:8, border:`1px solid ${p.br}`, marginBottom:6, fontSize:11, opacity:.8, cursor:'pointer', transition:'all .2s', background:p.bg }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor=p.ac+'44'; e.currentTarget.style.opacity='1' }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor=p.br; e.currentTarget.style.opacity='.8' }}>{hook}</div>
            ))}
          </Card>
        </div>
      </Grid>
    </div>
  )
}

export function Settings() {
  const { palette:p } = useStore()
  const [tog, setTog] = React.useState({trends:true,reminders:true,insights:false,warnings:true,auto:false,optimal:true})
  const T = ({k}) => {
    const on=tog[k]
    return <div onClick={()=>setTog(t=>({...t,[k]:!t[k]}))} style={{ width:32, height:18, borderRadius:9, background:on?p.ac:p.br, position:'relative', cursor:'pointer', transition:'background .2s', flexShrink:0 }}><div style={{ width:14, height:14, borderRadius:'50%', background:'#fff', position:'absolute', top:2, transition:'all .2s', left:on?'auto':2, right:on?2:'auto' }} /></div>
  }
  return (
    <div className="animate-up">
      <Grid cols={2} gap={10}>
        <div>
          <Card style={{ marginBottom:10 }}>
            <CardTitle>Connected Accounts</CardTitle>
            {[['YT','YouTube','@creator_channel','#3b82f6',true],['TT','TikTok','@fossarythm8','#00b894',true],['IG','Instagram','@fossarythm8','#d946ef',true],['X','X / Twitter','@fossarythm8_','#6366f1',false]].map(([ic,n,h,c,conn])=>(
              <div key={n} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 0', borderBottom:`1px solid ${p.br}` }}>
                <div style={{ width:30, height:30, borderRadius:7, background:c+'22', border:`1px solid ${c}44`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, fontWeight:700, color:c, fontFamily:"'Space Mono',monospace", flexShrink:0 }}>{ic}</div>
                <div style={{ flex:1 }}><div style={{ fontSize:12, fontWeight:600 }}>{n}</div><div style={{ fontSize:10, opacity:.4 }}>{h}</div></div>
                <span style={{ display:'inline-flex', padding:'2px 8px', borderRadius:20, fontSize:10, fontWeight:600, border:`1px solid ${conn?'#22c55e44':'#f59e0b44'}`, background:conn?'#22c55e11':'#f59e0b11', color:conn?'#22c55e':'#f59e0b' }}>{conn?'Connected':'Reconnect'}</span>
              </div>
            ))}
          </Card>
          <Card>
            <CardTitle>AI Model</CardTitle>
            {[['Fast','gemini-2.0-flash','Fastest, lower cost'],['Balanced','gemini-2.0-flash-lite','Efficient & fast'],['Max','gemini-2.0-pro','Highest quality']].map(([tier,model,desc],i)=>(
              <div key={tier} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 0', borderBottom:i<2?`1px solid ${p.br}`:'none' }}>
                <div style={{ flex:1 }}><div style={{ fontSize:12, fontWeight:600 }}>{tier} <span style={{ fontSize:10, opacity:.4, fontFamily:"'Space Mono',monospace" }}>· {model}</span></div><div style={{ fontSize:10, opacity:.4, marginTop:2 }}>{desc}</div></div>
                <div style={{ width:16, height:16, borderRadius:'50%', border:`2px solid ${p.ac}`, background:i===1?p.ac:'transparent', flexShrink:0, cursor:'pointer' }} />
              </div>
            ))}
          </Card>
        </div>
        <div>
          <Card style={{ marginBottom:10 }}>
            <CardTitle>Notifications</CardTitle>
            {[['trends','Trend alerts','Notify when a hashtag spikes'],['reminders','Post reminders','Alert before optimal windows'],['insights','AI insights','Daily performance digest'],['warnings','Auto-post warnings','Alert before posts fire']].map(([k,title,desc])=>(
              <div key={k} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 0', borderBottom:`1px solid ${p.br}` }}>
                <div style={{ flex:1 }}><div style={{ fontSize:12, fontWeight:600 }}>{title}</div><div style={{ fontSize:10, opacity:.4 }}>{desc}</div></div>
                <T k={k} />
              </div>
            ))}
          </Card>
          <Card>
            <CardTitle>Auto-Posting</CardTitle>
            {[['auto','Auto-schedule mode','Automatically queue at optimal times (BETA)'],['optimal','Optimal time selection','Override manual times with AI windows']].map(([k,title,desc])=>(
              <div key={k} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 0', borderBottom:`1px solid ${p.br}` }}>
                <div style={{ flex:1 }}><div style={{ fontSize:12, fontWeight:600 }}>{title}</div><div style={{ fontSize:10, opacity:.4 }}>{desc}</div></div>
                <T k={k} />
              </div>
            ))}
            <div style={{ marginTop:14, padding:10, borderRadius:8, background:p.ac+'0d', border:`1px solid ${p.ac}22`, fontSize:11, opacity:.7 }}>FOSSARYTHM8 v1.0.0 · Open source · MIT License</div>
          </Card>
        </div>
      </Grid>
    </div>
  )
}
