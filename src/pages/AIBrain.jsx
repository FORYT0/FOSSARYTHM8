import React, { useRef, useEffect } from 'react'
import useStore from '../store'
import { Card, CardTitle, Button, Input, Spinner, Grid } from '../components/UI'

const SYS = `You are FOSSARYTHM8's AI content intelligence engine — a sharp, data-driven social media strategist specializing in YouTube, TikTok, Instagram, and X/Twitter algorithms. Give specific, actionable advice. Be concise. Max 4 sentences unless asked for more.`
const QUICK = ['Best hook structure for TikTok in 2025?','Score my idea: daily AI news roundup on YouTube','Instagram carousel vs Reel — which wins right now?','How do I go viral on YouTube Shorts?','Best hashtags for a productivity video?','Best time to post on X for tech audience?']

export default function AIBrain() {
  const { palette:p, chatHistory, addChatMessage, clearChat } = useStore()
  const [input, setInput] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [scoreInput, setScoreInput] = React.useState('')
  const [scoreResult, setScoreResult] = React.useState('')
  const [scoreLoading, setScoreLoading] = React.useState(false)
  const [capTopic, setCapTopic] = React.useState('')
  const [capPlatform, setCapPlatform] = React.useState('TikTok')
  const [capType, setCapType] = React.useState('Vlog')
  const [capResult, setCapResult] = React.useState('')
  const [capLoading, setCapLoading] = React.useState(false)
  const msgsRef = useRef(null)

  useEffect(() => { if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight }, [chatHistory, loading])

  async function callAPI(messages) {
    const res = await fetch('/api/generate', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ model:'llama-3.3-70b-versatile', max_tokens:1000, system:SYS, messages }),
    })
    const data = await res.json()
    if (data.error) return `Error: ${data.error}`
    return data.content?.[0]?.text || 'No response received.'
  }

  async function sendMessage() {
    const msg = input.trim(); if (!msg||loading) return
    setInput(''); addChatMessage({role:'user',content:msg}); setLoading(true)
    try { const reply = await callAPI([...chatHistory,{role:'user',content:msg}]); addChatMessage({role:'assistant',content:reply}) }
    catch { addChatMessage({role:'assistant',content:'Connection error — make sure ANTHROPIC_API_KEY is set in Vercel environment variables.'}) }
    setLoading(false)
  }

  async function scoreIdea() {
    if (!scoreInput.trim()||scoreLoading) return
    setScoreLoading(true); setScoreResult('')
    try { setScoreResult(await callAPI([{role:'user',content:`Score this content idea out of 100 for viral potential and give 2 specific improvement bullets:\n\n"${scoreInput}"\n\nFormat:\nSCORE: XX/100 — [VERDICT]\n• [improvement 1]\n• [improvement 2]`}])) }
    catch { setScoreResult('Error — check API key in Vercel settings.') }
    setScoreLoading(false)
  }

  async function genCaption() {
    if (!capTopic.trim()||capLoading) return
    setCapLoading(true); setCapResult('')
    try { setCapResult(await callAPI([{role:'user',content:`Generate a ${capType} caption for ${capPlatform} about: "${capTopic}".\n\nFormat:\nHOOK: [first line]\nBODY: [2-3 sentences]\nCTA: [call to action]\nHASHTAGS: [3-5 tags]`}])) }
    catch { setCapResult('Error — check API key in Vercel settings.') }
    setCapLoading(false)
  }

  return (
    <div className="animate-up">
      <Grid cols={2} gap={10}>
        <div style={{ display:'flex', flexDirection:'column', height:580 }}>
          <Card style={{ flex:1, display:'flex', flexDirection:'column', height:'100%' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
              <CardTitle>AI Content Brain</CardTitle>
              {chatHistory.length>0 && <button onClick={clearChat} style={{ fontSize:10, opacity:.4, background:'none', border:'none', color:p.tx, cursor:'pointer' }}>Clear</button>}
            </div>
            <div ref={msgsRef} style={{ flex:1, overflowY:'auto', display:'flex', flexDirection:'column', gap:8, paddingRight:4, minHeight:0 }}>
              {chatHistory.length===0 && <div style={{ padding:'10px 13px', borderRadius:10, fontSize:12, lineHeight:1.6, background:p.bg, border:`1px solid ${p.br}`, alignSelf:'flex-start', maxWidth:'88%' }}>Hey — I'm FOSSARYTHM8's AI engine. I analyze platform algorithms, score ideas, and build strategies in real time. What are we working on?</div>}
              {chatHistory.map((msg,i) => (
                <div key={i} style={{ padding:'10px 13px', borderRadius:10, fontSize:12, lineHeight:1.6, alignSelf:msg.role==='user'?'flex-end':'flex-start', maxWidth:'88%', background:msg.role==='user'?p.ac+'22':p.bg, border:`1px solid ${msg.role==='user'?p.ac+'33':p.br}`, whiteSpace:'pre-wrap', animation:'slideUp .2s ease' }}>{msg.content}</div>
              ))}
              {loading && <div style={{ padding:'10px 13px', borderRadius:10, background:p.bg, border:`1px solid ${p.br}`, alignSelf:'flex-start', display:'flex', alignItems:'center', gap:8 }}><Spinner /><span style={{ fontSize:11, opacity:.5 }}>Analyzing...</span></div>}
            </div>
            <div style={{ marginTop:10, display:'flex', gap:6 }}>
              <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMessage()} }}
                placeholder="Ask about trends, algorithms, caption ideas... (Enter to send)"
                style={{ flex:1, background:p.bg, border:`1px solid ${p.br}`, borderRadius:10, padding:'9px 13px', fontSize:12, color:p.tx, fontFamily:'inherit', outline:'none', resize:'none', height:42, transition:'border-color .2s' }}
                onFocus={e=>e.target.style.borderColor=p.ac+'66'} onBlur={e=>e.target.style.borderColor=p.br} />
              <Button onClick={sendMessage} disabled={loading||!input.trim()}>SEND</Button>
            </div>
          </Card>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          <Card>
            <CardTitle>Quick Prompts</CardTitle>
            {QUICK.map(q => (
              <button key={q} onClick={()=>setInput(q)} style={{ textAlign:'left', padding:'8px 10px', borderRadius:8, border:`1px solid ${p.br}`, background:p.bg, color:p.tx, fontSize:11, cursor:'pointer', transition:'all .2s', width:'100%', marginBottom:5, display:'block' }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor=p.ac+'55'; e.currentTarget.style.background=p.ac+'0d' }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor=p.br; e.currentTarget.style.background=p.bg }}>{q}</button>
            ))}
          </Card>
          <Card>
            <CardTitle>Content Idea Scorer</CardTitle>
            <Input value={scoreInput} onChange={e=>setScoreInput(e.target.value)} placeholder="Describe your content idea..." multiline style={{ height:52, marginBottom:8 }} />
            <Button onClick={scoreIdea} variant="ghost" disabled={scoreLoading||!scoreInput.trim()} style={{ width:'100%', marginBottom:scoreResult?10:0 }}>{scoreLoading?'Scoring...':'Score This Idea'}</Button>
            {scoreResult && <div style={{ padding:10, borderRadius:8, background:p.ac+'0d', border:`1px solid ${p.ac}22`, fontSize:11, lineHeight:1.7, whiteSpace:'pre-wrap', animation:'slideUp .2s ease' }}>{scoreResult}</div>}
          </Card>
          <Card>
            <CardTitle>Caption Generator</CardTitle>
            <div style={{ display:'flex', gap:6, marginBottom:8 }}>
              {[['capPlt',['TikTok','Instagram','YouTube','X'],capPlatform,setCapPlatform],['capTyp',['Vlog','Tutorial','Trend','Motivational','Product'],capType,setCapType]].map(([k,opts,val,setter])=>(
                <select key={k} value={val} onChange={e=>setter(e.target.value)} style={{ flex:1, background:p.bg, color:p.tx, border:`1px solid ${p.br}`, borderRadius:6, padding:'6px 8px', fontSize:11, outline:'none' }}>
                  {opts.map(x=><option key={x}>{x}</option>)}
                </select>
              ))}
            </div>
            <Input value={capTopic} onChange={e=>setCapTopic(e.target.value)} placeholder="Topic..." style={{ marginBottom:8 }} />
            <Button onClick={genCaption} disabled={capLoading||!capTopic.trim()} style={{ width:'100%', marginBottom:capResult?10:0 }}>{capLoading?'Generating...':'Generate Caption'}</Button>
            {capResult && <div style={{ padding:10, borderRadius:8, background:p.bg, border:`1px solid ${p.br}`, fontSize:11, lineHeight:1.7, whiteSpace:'pre-wrap', animation:'slideUp .2s ease' }}>{capResult}</div>}
          </Card>
        </div>
      </Grid>
    </div>
  )
}
