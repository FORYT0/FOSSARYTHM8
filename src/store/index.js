import { create } from 'zustand'

const PALETTES = [
  { name:'VOID BLACK',    bg:'#080808',bg2:'#111111',bg3:'#1a1a1a',tx:'#e8e8e8',ac:'#ffffff',br:'#1e1e1e' },
  { name:'BLOOD SAMURAI', bg:'#0a0000',bg2:'#140808',bg3:'#1e0c0c',tx:'#f0e0e0',ac:'#e63946',br:'#2a0808' },
  { name:'NEON PULSE',    bg:'#000d0a',bg2:'#001410',bg3:'#001e18',tx:'#d0f0e8',ac:'#00ff9f',br:'#003322' },
  { name:'GOLD CIRCUIT',  bg:'#09080a',bg2:'#120f14',bg3:'#1c1510',tx:'#eedfc8',ac:'#f5a623',br:'#241a0a' },
  { name:'COBALT NIGHT',  bg:'#00070f',bg2:'#000e1a',bg3:'#001226',tx:'#c8d8f0',ac:'#3b82f6',br:'#001530' },
  { name:'ABSINTHE',      bg:'#040a04',bg2:'#081008',bg3:'#0d1a0d',tx:'#d4e8d0',ac:'#7fff00',br:'#102010' },
  { name:'CHROME ROSE',   bg:'#0a060c',bg2:'#140a18',bg3:'#1e0f24',tx:'#e8d0f0',ac:'#d946ef',br:'#200830' },
  { name:'COPPER FORGE',  bg:'#0a0804',bg2:'#141008',bg3:'#1e1510',tx:'#f0e4d0',ac:'#ea580c',br:'#241808' },
]

const POSTS = [
  {id:1, day:'MON',platform:'YT', title:'AI Explained in 5 min',      status:'LIVE', color:'#3b82f6',time:'14:00',tags:['#AIExplained'],  views:12400,likes:890},
  {id:2, day:'MON',platform:'IG', title:'Morning aesthetic dump',      status:'DONE', color:'#d946ef',time:'09:00',tags:['#MoodBoard'],    views:5200, likes:620},
  {id:3, day:'TUE',platform:'TT', title:'#SkillUnlock hook video',     status:'SCHED',color:'#00b894',time:'07:30',tags:['#SkillUnlock'],  views:0,    likes:0},
  {id:4, day:'TUE',platform:'X',  title:'Hot take thread on AI tools', status:'DRAFT',color:'#6366f1',time:'10:00',tags:['#AINews'],       views:0,    likes:0},
  {id:5, day:'WED',platform:'YT', title:'Productivity vlog 2025',      status:'DRAFT',color:'#3b82f6',time:'15:00',tags:['#Productivity'], views:0,    likes:0},
  {id:6, day:'THU',platform:'IG', title:'Carousel: 10 creator tips',   status:'SCHED',color:'#d946ef',time:'11:00',tags:['#Carousel'],    views:0,    likes:0},
  {id:7, day:'THU',platform:'TT', title:'POV series episode 3',        status:'SCHED',color:'#00b894',time:'19:00',tags:['#POVtrend'],     views:0,    likes:0},
  {id:8, day:'FRI',platform:'X',  title:'Dev log weekly update',       status:'IDEA', color:'#6366f1',time:'08:00',tags:['#DevLog'],       views:0,    likes:0},
  {id:9, day:'SAT',platform:'IG', title:'Weekend photo dump',          status:'DRAFT',color:'#d946ef',time:'12:00',tags:['#BeforeAfter'],  views:0,    likes:0},
  {id:10,day:'SUN',platform:'TT', title:'Trend reaction video',        status:'IDEA', color:'#00b894',time:'18:00',tags:['#RatioCheck'],   views:0,    likes:0},
]

const TRENDS = {
  youtube:[
    {tag:'#AIExplained',      score:94,vol:'8.2M', delta:'+18%',growth:[40,45,52,61,70,80,94],engagement:'7.2%',peakTime:'2-4pm weekdays',  desc:'AI tutorial content dominating YouTube. Videos under 12 mins with strong thumbnails outperform long-form 3:1.'},
    {tag:'#ProductivityHacks',score:89,vol:'5.7M', delta:'+12%',growth:[60,62,68,72,78,84,89],engagement:'6.1%',peakTime:'7-9am weekdays',  desc:'Productivity content sees evergreen growth. Listicle format gets 40% higher CTR than general titles.'},
    {tag:'#DayInMyLife',      score:85,vol:'4.1M', delta:'+9%', growth:[55,58,62,68,74,80,85],engagement:'5.8%',peakTime:'12-2pm weekends', desc:'Vlog-style content rebounding. Authenticity over production quality is the current viewer preference.'},
    {tag:'#LearnInPublic',    score:81,vol:'3.6M', delta:'+7%', growth:[50,54,60,65,70,76,81],engagement:'5.3%',peakTime:'6-8pm weekdays',  desc:'Documenting a skill journey resonates deeply. First-person growth narratives drive subscribers.'},
    {tag:'#BuildInPublic',    score:77,vol:'2.9M', delta:'+5%', growth:[48,52,57,62,67,72,77],engagement:'4.9%',peakTime:'10am-12pm',       desc:'Indie makers are the core audience. Revenue reveals and milestone posts get disproportionate shares.'},
  ],
  tiktok:[
    {tag:'#SkillUnlock', score:97,vol:'22M', delta:'+34%',growth:[30,40,55,67,78,88,97],engagement:'11.4%',peakTime:'7-9am & 7-11pm', desc:'Hottest tag on TikTok right now. 18-hour peak window remaining. Rapid before/after skill demo under 30s.'},
    {tag:'#POVtrend',    score:92,vol:'18M', delta:'+28%',growth:[45,52,60,70,78,85,92],engagement:'9.8%', peakTime:'12-3pm daily',    desc:'First-person perspective getting heavy algorithmic boost. Unexpected scenario in first 2 frames.'},
    {tag:'#RatioCheck',  score:88,vol:'14M', delta:'+21%',growth:[40,48,58,68,76,82,88],engagement:'8.7%', peakTime:'6-10pm',          desc:'Community engagement trend. Drives comment activity which is a primary TikTok ranking signal.'},
    {tag:'#NightRoutine',score:83,vol:'11M', delta:'+16%',growth:[50,55,62,68,74,79,83],engagement:'7.2%', peakTime:'9-11pm',          desc:'Lifestyle content with high retention. Lo-fi beat pairings amplify reach by 30%.'},
    {tag:'#SilentVlog',  score:79,vol:'8.5M',delta:'+11%',growth:[42,48,55,62,69,74,79],engagement:'6.5%', peakTime:'7-9am',           desc:'No-talking content growing as viewers use TikTok as ambient background media.'},
  ],
  instagram:[
    {tag:'#CarouselDump',score:91,vol:'9.4M',delta:'+22%',growth:[42,50,60,70,78,85,91],engagement:'8.9%',peakTime:'Tue-Thu 9am-12pm', desc:'Carousel posts getting 3x saves of single images. 10-slide carousels with hook on slide 1 performing best.'},
    {tag:'#MoodBoard',   score:86,vol:'7.1M',delta:'+15%',growth:[50,56,63,70,76,81,86],engagement:'7.4%',peakTime:'Sat-Sun 10am-2pm', desc:'Aesthetic curation thriving in Explore tab. Consistent color grading across all slides is the differentiator.'},
    {tag:'#SlowLiving',  score:82,vol:'5.8M',delta:'+11%',growth:[48,54,60,66,72,77,82],engagement:'6.8%',peakTime:'Weekend mornings',  desc:'Counter-culture wellness aesthetic gaining traction. Audience has strong purchase intent.'},
    {tag:'#BeforeAfter', score:78,vol:'4.2M',delta:'+8%', growth:[44,50,56,62,68,73,78],engagement:'6.1%',peakTime:'Thu-Fri 6-8pm',    desc:'Transformation content drives massive save rates. Reels format outperforms static 2:1.'},
    {tag:'#MicroBlog',   score:74,vol:'3.3M',delta:'+6%', growth:[40,46,52,58,63,69,74],engagement:'5.6%',peakTime:'Mon-Wed 8-10am',   desc:'Long-form text on Instagram rising. Carousel text posts performing well in Explore tab.'},
  ],
  x:[
    {tag:'#AINews',    score:96,vol:'31M', delta:'+41%',growth:[25,35,50,65,78,88,96],engagement:'12.1%',peakTime:'8-10am & 6-8pm',  desc:'Biggest trending topic on X. News aggregation threads get massive quote-tweet velocity.'},
    {tag:'#DevLog',    score:87,vol:'12M', delta:'+19%',growth:[50,56,63,70,76,82,87],engagement:'8.8%', peakTime:'Mon-Fri 9am-11am',desc:'Developer community highly engaged. Weekly dev log threads get bookmarked heavily.'},
    {tag:'#TakeHot',   score:82,vol:'8.7M',delta:'+14%',growth:[45,52,59,65,71,77,82],engagement:'7.6%', peakTime:'Evenings 6-10pm', desc:'Contrarian opinion content drives highest reply rates. Threads outperform single posts 4:1.'},
    {tag:'#OpenSource',score:76,vol:'5.2M',delta:'+9%', growth:[42,48,54,60,66,71,76],engagement:'6.3%', peakTime:'Weekday mornings',desc:'Technical community with high signal. GitHub link posts perform better here than anywhere.'},
    {tag:'#ThreadDrop',score:71,vol:'3.9M',delta:'+6%', growth:[38,44,50,56,61,66,71],engagement:'5.4%', peakTime:'Thu-Fri 7-9pm',  desc:'Scheduled thread releases building anticipation loops. Announce 30 min before for 60% more first-hour eng.'},
  ],
}

const ANALYTICS = {
  weekly:[
    {day:'Mon',reach:42000,eng:2940,follows:180},
    {day:'Tue',reach:58000,eng:4060,follows:260},
    {day:'Wed',reach:35000,eng:2450,follows:140},
    {day:'Thu',reach:67000,eng:4690,follows:310},
    {day:'Fri',reach:89000,eng:6230,follows:420},
    {day:'Sat',reach:52000,eng:3640,follows:220},
    {day:'Sun',reach:74000,eng:5180,follows:340},
  ],
  monthly:[
    {day:'W1',reach:312000,eng:21840,follows:1480},
    {day:'W2',reach:418000,eng:29260,follows:1920},
    {day:'W3',reach:376000,eng:26320,follows:1710},
    {day:'W4',reach:502000,eng:35140,follows:2340},
  ],
  platforms:[
    {name:'YouTube',  color:'#3b82f6',reach:1200000,eng:'6.2%',follows:12400,posts:18,topPost:'AI Explained in 5 min'},
    {name:'TikTok',   color:'#00b894',reach:840000, eng:'9.8%',follows:8400, posts:28,topPost:'#SkillUnlock hook video'},
    {name:'Instagram',color:'#d946ef',reach:320000, eng:'7.4%',follows:3200, posts:22,topPost:'Carousel: 10 creator tips'},
    {name:'X',        color:'#6366f1',reach:88000,  eng:'5.1%',follows:880,  posts:45,topPost:'Hot take thread on AI tools'},
  ],
  growth6m:[
    {month:'Oct',subs:22000},
    {month:'Nov',subs:28000},
    {month:'Dec',subs:35000},
    {month:'Jan',subs:41000},
    {month:'Feb',subs:38000},
    {month:'Mar',subs:52000},
  ],
}

const useStore = create((set, get) => ({
  paletteIdx: 0,
  palette: PALETTES[0],
  posts: POSTS,
  trends: TRENDS,
  analytics: ANALYTICS,
  chatHistory: [],
  selectedTrend: null,
  analyticsRange: 'weekly',
  settings: { trends:true, reminders:true, insights:false, warnings:true, auto:false, optimal:true },
  cyclePalette: () => { const n=(get().paletteIdx+1)%PALETTES.length; set({paletteIdx:n,palette:PALETTES[n]}) },
  addPost: (post) => set(s=>({posts:[...s.posts,{...post,id:Date.now(),views:0,likes:0}]})),
  updatePost: (id,u) => set(s=>({posts:s.posts.map(p=>p.id===id?{...p,...u}:p)})),
  deletePost: (id) => set(s=>({posts:s.posts.filter(p=>p.id!==id)})),
  setSelectedTrend: (t) => set({selectedTrend:t}),
  setAnalyticsRange: (r) => set({analyticsRange:r}),
  updateSetting: (k,v) => set(s=>({settings:{...s.settings,[k]:v}})),
  addChatMessage: (m) => set(s=>({chatHistory:[...s.chatHistory,m]})),
  clearChat: () => set({chatHistory:[]}),
}))

export { useStore }
export default useStore
