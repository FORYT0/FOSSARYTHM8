import React from 'react'
import useStore from '../store'
import { Card, CardTitle, Button, Grid, Input, Pill } from '../components/UI'

const CASE_STUDIES = [
  { id:1, title: 'The 7-Second Educational Hook', niche: 'Tech', goal: 'Reach', platform: 'TT', desc: 'A rapid-fire text overlay technique that drives 80% more retention in the first 3 seconds.', steps: ['Record 3 clips of your desk', 'Add text: "Stop doing X"', 'Overlay trending lofi track'] },
  { id:2, title: 'Product Launch Story Loop', niche: 'Brand', goal: 'Sales', platform: 'IG', desc: 'A 4-part story sequence designed to build tension and release with a CTA.', steps: ['Ask a pain point question', 'Show the product result', 'Add a 24h countdown sticker'] },
  { id:3, title: 'Newsletter growth carousel', niche: 'Lifestyle', goal: 'Growth', platform: 'LI', desc: '10-slide text-heavy carousel that converts cold reach into email subs.', steps: ['Identify a common myth', 'Debunk with 3 proofs', 'Slide 10: "Link in bio"'] },
  { id:4, title: 'Contrarian Opinion Thread', niche: 'Tech', goal: 'Authority', platform: 'X', desc: 'Increase your industry authority by challenging a common belief.', steps: ['State the hot take', 'Provide 3 data points', 'Ask for counter-opinions'] },
]

export default function Discovery() {
  const { palette:p } = useStore()
  const [step, setStep] = React.useState(0)
  const [survey, setSurvey] = React.useState({ niche: '', goal: '' })
  const [activeCase, setActiveCase] = React.useState(null)
  const [aiLoading, setAiLoading] = React.useState(false)
  const [aiGuide, setAiGuide] = React.useState(null)

  const niches = ['Tech', 'Fitness', 'Lifestyle', 'Brand', 'Creative']
  const goals = ['Sales', 'Reach', 'Growth', 'Authority']

  const filtered = CASE_STUDIES.filter(c => 
    (!survey.niche || c.niche === survey.niche) && 
    (!survey.goal || c.goal === survey.goal)
  )

  async function startCreation(study) {
    setActiveCase(study)
    setAiLoading(true)
    setAiGuide(null)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          system: 'You are a social media director. Create 3 personalized implementation steps for the user based on the case study provided.',
          messages: [{ role: 'user', content: `Case Study: ${study.title}. Niche: ${survey.niche || 'General'}. Goal: ${survey.goal || 'Reach'}.` }]
        })
      })
      const data = await res.json()
      setAiGuide(data.content?.[0]?.text || 'Follow the standard steps to replicate success.')
    } catch (e) {
      setAiGuide('AI guide temporarily offline. Use the standard steps below.')
    }
    setAiLoading(false)
  }

  if (step === 0) return (
    <div className="animate-up" style={{ maxWidth:600, margin:'40px auto' }}>
      <Card style={{ padding:30, textAlign:'center' }}>
        <div style={{ fontSize:32, marginBottom:20 }}>🎯</div>
        <CardTitle>Discovery Engine</CardTitle>
        <h2 style={{ marginBottom:10 }}>What's the end goal for today?</h2>
        <p style={{ opacity:.6, marginBottom:30, fontSize:14 }}>Answer 2 quick questions to find high-converting patterns tailored to your niche.</p>
        
        <div style={{ textAlign:'left', marginBottom:24 }}>
          <div style={{ fontSize:11, fontWeight:700, opacity:.4, marginBottom:8, textTransform:'uppercase' }}>Select your Niche</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {niches.map(n => (
              <Button key={n} variant={survey.niche===n?'primary':'ghost'} onClick={()=>setSurvey({...survey, niche:n})} style={{ fontSize:10 }}>{n}</Button>
            ))}
          </div>
        </div>

        <div style={{ textAlign:'left', marginBottom:30 }}>
          <div style={{ fontSize:11, fontWeight:700, opacity:.4, marginBottom:8, textTransform:'uppercase' }}>Select your Primary Goal</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {goals.map(g => (
              <Button key={g} variant={survey.goal===g?'primary':'ghost'} onClick={()=>setSurvey({...survey, goal:g})} style={{ fontSize:10 }}>{g}</Button>
            ))}
          </div>
        </div>

        <Button disabled={!survey.niche || !survey.goal} onClick={()=>setStep(1)} style={{ width:'100%', padding:14 }}>Find Patterns →</Button>
      </Card>
    </div>
  )

  return (
    <div className="animate-up">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
        <div>
          <CardTitle>Converting Patterns for {survey.niche}</CardTitle>
          <div style={{ fontSize:12, opacity:.6 }}>Target Goal: {survey.goal}</div>
        </div>
        <Button variant="ghost" onClick={()=>{setStep(0); setSurvey({niche:'',goal:''})}} style={{ fontSize:10 }}>Reset Survey</Button>
      </div>

      <Grid cols={2} gap={14}>
        {filtered.length > 0 ? filtered.map(item => (
          <Card key={item.id} style={{ display:'flex', flexDirection:'column', gap:12 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <Pill type="hot">{item.platform}</Pill>
              <div style={{ fontSize:10, opacity:.4, fontWeight:700 }}>{item.goal.toUpperCase()}</div>
            </div>
            <div style={{ fontSize:16, fontWeight:700 }}>{item.title}</div>
            <div style={{ fontSize:13, opacity:.7, lineHeight:1.5 }}>{item.desc}</div>
            <div style={{ flex:1 }} />
            <Button onClick={()=>startCreation(item)} style={{ width:'100%' }}>Start Creation</Button>
          </Card>
        )) : (
          <Card style={{ gridColumn:'1/-1', textAlign:'center', padding:40 }}>
            <div style={{ fontSize:20, opacity:.4 }}>No exact patterns found for this combo.</div>
            <Button variant="ghost" onClick={()=>setStep(0)} style={{ marginTop:20 }}>Try different goals</Button>
          </Card>
        )}
      </Grid>

      {activeCase && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.8)', backdropFilter:'blur(10px)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:20, animation:'fadeIn .3s' }}>
          <Card style={{ width:'100%', maxWidth:500, background:p.bg, border:`1px solid ${p.ac}33`, animation:'slideUp .4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
             <div style={{ display:'flex', justifyContent:'space-between', marginBottom:20 }}>
               <CardTitle>AI Guided Integration</CardTitle>
               <button onClick={()=>setActiveCase(null)} style={{ background:'none', border:'none', color:p.tx, cursor:'pointer', fontSize:20, opacity:.3 }}>✕</button>
             </div>
             
             <div style={{ marginBottom:20 }}>
               <div style={{ fontSize:18, fontWeight:700, color:p.ac, marginBottom:6 }}>{activeCase.title}</div>
               <div style={{ fontSize:12, opacity:.6 }}>Replicating this pattern for your {survey.niche} niche.</div>
             </div>

             <div style={{ background:p.bg2, borderRadius:12, padding:15, border:`1px solid ${p.br}`, marginBottom:20 }}>
               <div style={{ fontSize:10, fontWeight:700, opacity:.4, marginBottom:10, textTransform:'uppercase', letterSpacing:1 }}>AI Expert Strategy</div>
               {aiLoading ? (
                 <div className="pulse" style={{ fontSize:13, opacity:.8 }}>AI is architecting your workflow...</div>
               ) : (
                 <div style={{ fontSize:13, lineHeight:1.6, opacity:.9 }}>{aiGuide}</div>
               )}
             </div>

             <div style={{ marginBottom:24 }}>
               <div style={{ fontSize:10, fontWeight:700, opacity:.4, marginBottom:12, textTransform:'uppercase', letterSpacing:1 }}>Execution Steps</div>
               {activeCase.steps.map((s,i) => (
                 <div key={i} style={{ display:'flex', gap:10, marginBottom:8 }}>
                   <div style={{ width:18, height:18, borderRadius:'50%', background:p.ac, color:p.bg, fontSize:10, fontWeight:900, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{i+1}</div>
                   <div style={{ fontSize:12, opacity:.8 }}>{s}</div>
                 </div>
               ))}
             </div>

             <Button onClick={()=>setActiveCase(null)} style={{ width:'100%' }}>I'm On It</Button>
          </Card>
        </div>
      )}
    </div>
  )
}
