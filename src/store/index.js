import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const PALETTES = [
  { name: 'VOID BLACK',    bg: '#080808', bg2: '#111111', bg3: '#1a1a1a', tx: '#e8e8e8', ac: '#ffffff', br: '#1e1e1e' },
  { name: 'BLOOD SAMURAI', bg: '#0a0000', bg2: '#140808', bg3: '#1e0c0c', tx: '#f0e0e0', ac: '#e63946', br: '#2a0808' },
  { name: 'NEON PULSE',    bg: '#000d0a', bg2: '#001410', bg3: '#001e18', tx: '#d0f0e8', ac: '#00ff9f', br: '#003322' },
  { name: 'GOLD CIRCUIT',  bg: '#09080a', bg2: '#120f14', bg3: '#1c1510', tx: '#eedfc8', ac: '#f5a623', br: '#241a0a' },
  { name: 'COBALT NIGHT',  bg: '#00070f', bg2: '#000e1a', bg3: '#001226', tx: '#c8d8f0', ac: '#3b82f6', br: '#001530' },
  { name: 'ABSINTHE',      bg: '#040a04', bg2: '#081008', bg3: '#0d1a0d', tx: '#d4e8d0', ac: '#7fff00', br: '#102010' },
  { name: 'CHROME ROSE',   bg: '#0a060c', bg2: '#140a18', bg3: '#1e0f24', tx: '#e8d0f0', ac: '#d946ef', br: '#200830' },
  { name: 'COPPER FORGE',  bg: '#0a0804', bg2: '#141008', bg3: '#1e1510', tx: '#f0e4d0', ac: '#ea580c', br: '#241808' },
]

const INITIAL_POSTS = [
  { id: 1, day: 'MON', platform: 'YT',  title: 'AI Explained in 5 min',      status: 'LIVE',  color: '#3b82f6', time: '14:00', tags: ['#AIExplained','#Tutorial'], views: 12400, likes: 890 },
  { id: 2, day: 'MON', platform: 'IG',  title: 'Morning aesthetic dump',     status: 'DONE',  color: '#d946ef', time: '09:00', tags: ['#MoodBoard','#SlowLiving'], views: 5200,  likes: 620 },
  { id: 3, day: 'TUE', platform: 'TT',  title: '#SkillUnlock hook video',    status: 'SCHED', color: '#00b894', time: '07:30', tags: ['#SkillUnlock','#POVtrend'],  views: 0,     likes: 0 },
  { id: 4, day: 'TUE', platform: 'X',   title: 'Hot take thread on AI tools', status: 'DRAFT', color: '#6366f1', time: '10:00', tags: ['#AINews','#DevLog'],        views: 0,     likes: 0 },
  { id: 5, day: 'WED', platform: 'YT',  title: 'Productivity vlog 2025',     status: 'DRAFT', color: '#3b82f6', time: '15:00', tags: ['#ProductivityHacks'],        views: 0,     likes: 0 },
  { id: 6, day: 'THU', platform: 'IG',  title: 'Carousel: 10 creator tips',  status: 'SCHED', color: '#d946ef', time: '11:00', tags: ['#CarouselDump','#MicroBlog'],views: 0,     likes: 0 },
  { id: 7, day: 'THU', platform: 'TT',  title: 'POV series episode 3',       status: 'SCHED', color: '#00b894', time: '19:00', tags: ['#POVtrend','#SilentVlog'],   views: 0,     likes: 0 },
  { id: 8, day: 'FRI', platform: 'X',   title: 'Dev log weekly update',      status: 'IDEA',  color: '#6366f1', time: '08:00', tags: ['#DevLog','#BuildInPublic'],  views: 0,     likes: 0 },
  { id: 9, day: 'FRI', platform: 'YT',  title: 'Live stream Q&A',            status: 'IDEA',  color: '#3b82f6', time: '20:00', tags: ['#LiveStream'],               views: 0,     likes: 0 },
  { id:10, day: 'SAT', platform: 'IG',  title: 'Weekend photo dump',         status: 'DRAFT', color: '#d946ef', time: '12:00', tags: ['#BeforeAfter','#MoodBoard'], views: 0,     likes: 0 },
  { id:11, day: 'SUN', platform: 'TT',  title: 'Trend reaction video',       status: 'IDEA',  color: '#00b894', time: '18:00', tags: ['#RatioCheck'],               views: 0,     likes: 0 },
]

const TRENDS_DATA = {
  youtube: [
    { tag: '#AIExplained',      score: 94, vol: '8.2M', delta: '+18%', growth: [40,45,52,61,70,80,94], posts: 142000, engagement: '7.2%', peakTime: '2-4pm weekdays', desc: 'AI tutorial content is dominating YouTube right now. Viewers want digestible breakdowns of complex tools. Videos under 12 minutes with strong thumbnails are outperforming long-form 3:1.' },
    { tag: '#ProductivityHacks', score: 89, vol: '5.7M', delta: '+12%', growth: [60,62,68,72,78,84,89], posts: 98000,  engagement: '6.1%', peakTime: '7-9am weekdays', desc: 'Productivity content sees evergreen growth. Morning commute viewers drive the most engagement. Listicle format (5 hacks, 10 tips) gets 40% higher CTR than general titles.' },
    { tag: '#DayInMyLife',       score: 85, vol: '4.1M', delta: '+9%',  growth: [55,58,62,68,74,80,85], posts: 76000,  engagement: '5.8%', peakTime: '12-2pm weekends', desc: 'Vlog-style content is rebounding after a dip. Authenticity over production quality is the current viewer preference. B-roll heavy edits are performing better than talking head.' },
    { tag: '#LearnInPublic',     score: 81, vol: '3.6M', delta: '+7%',  growth: [50,54,60,65,70,76,81], posts: 61000,  engagement: '5.3%', peakTime: '6-8pm weekdays', desc: 'Documenting a skill journey resonates deeply. First-person growth narratives create a parasocial loop that drives subscribers. Pair with community posts for 2x retention.' },
    { tag: '#BuildInPublic',     score: 77, vol: '2.9M', delta: '+5%',  growth: [48,52,57,62,67,72,77], posts: 48000,  engagement: '4.9%', peakTime: '10am-12pm',     desc: 'Indie makers and solopreneurs are the core audience here. Revenue reveals and milestone posts get disproportionate shares. Works best combined with #AITools content.' },
  ],
  tiktok: [
    { tag: '#SkillUnlock',  score: 97, vol: '22M',  delta: '+34%', growth: [30,40,55,67,78,88,97], posts: 380000, engagement: '11.4%', peakTime: '7-9am & 7-11pm', desc: 'Hottest tag on TikTok right now with an 18-hour peak window remaining. The format is a rapid before/after skill demonstration — keep it under 30 seconds. Stitch this tag for 2x the viral coefficient. Algorithm is actively pushing this to For You pages globally.' },
    { tag: '#POVtrend',     score: 92, vol: '18M',  delta: '+28%', growth: [45,52,60,70,78,85,92], posts: 290000, engagement: '9.8%',  peakTime: '12-3pm daily',   desc: 'First-person perspective content is getting heavy algorithmic boost. The key is an unexpected or emotionally resonant scenario in the first 2 frames. No text intros — cut straight to the scene.' },
    { tag: '#RatioCheck',   score: 88, vol: '14M',  delta: '+21%', growth: [40,48,58,68,76,82,88], posts: 220000, engagement: '8.7%',  peakTime: '6-10pm',         desc: 'Community engagement trend where creators challenge each other. Drives comment section activity which is a primary TikTok ranking signal. Works best for creators with existing audiences over 10K.' },
    { tag: '#NightRoutine', score: 83, vol: '11M',  delta: '+16%', growth: [50,55,62,68,74,79,83], posts: 175000, engagement: '7.2%',  peakTime: '9-11pm',         desc: 'Lifestyle content with high retention. Viewers watch complete videos due to ASMR-adjacent pacing. Trending audio pairing with lo-fi beats amplifies reach by 30% in this category.' },
    { tag: '#SilentVlog',   score: 79, vol: '8.5M', delta: '+11%', growth: [42,48,55,62,69,74,79], posts: 130000, engagement: '6.5%',  peakTime: '7-9am',          desc: 'No-talking content is growing as viewers use TikTok as ambient background media. High production value B-roll with on-screen captions only. Morning posting hits peak commute consumption.' },
  ],
  instagram: [
    { tag: '#CarouselDump',  score: 91, vol: '9.4M', delta: '+22%', growth: [42,50,60,70,78,85,91], posts: 160000, engagement: '8.9%', peakTime: 'Tue-Thu 9am-12pm', desc: 'Carousel posts are getting 3x the saves of single images right now. Instagram is heavily promoting the format. 10-slide carousels with a hook on slide 1 and a CTA on slide 10 are seeing the highest share rates. Keep text minimal — let visuals carry.' },
    { tag: '#MoodBoard',     score: 86, vol: '7.1M', delta: '+15%', growth: [50,56,63,70,76,81,86], posts: 122000, engagement: '7.4%', peakTime: 'Sat-Sun 10am-2pm', desc: 'Aesthetic curation content is thriving in the Explore tab. Consistent color grading across all 10 slides is the differentiator. This tag is being used by brands too — organic creators can ride that SEO boost.' },
    { tag: '#SlowLiving',    score: 82, vol: '5.8M', delta: '+11%', growth: [48,54,60,66,72,77,82], posts: 98000,  engagement: '6.8%', peakTime: 'Weekend mornings', desc: 'Counter-culture wellness aesthetic gaining traction. Muted tones, minimal captions, no hard sells. Audience is highly engaged and has strong purchase intent for lifestyle products.' },
    { tag: '#BeforeAfter',   score: 78, vol: '4.2M', delta: '+8%',  growth: [44,50,56,62,68,73,78], posts: 74000,  engagement: '6.1%', peakTime: 'Thu-Fri 6-8pm',   desc: 'Transformation content drives massive save rates — people bookmark these for reference. Works across fitness, interior design, editing tutorials, and productivity setups. Reels format outperforms static 2:1.' },
    { tag: '#MicroBlog',     score: 74, vol: '3.3M', delta: '+6%',  growth: [40,46,52,58,63,69,74], posts: 55000,  engagement: '5.6%', peakTime: 'Mon-Wed 8-10am',  desc: 'Long-form text on Instagram is a rising format as the algorithm tests Twitter-style content. Carousel text posts with bold opening lines are performing surprisingly well in the Explore tab.' },
  ],
  x: [
    { tag: '#AINews',       score: 96, vol: '31M',  delta: '+41%', growth: [25,35,50,65,78,88,96], posts: 520000, engagement: '12.1%', peakTime: '8-10am & 6-8pm', desc: 'Biggest trending topic on X right now. News aggregation threads and hot takes on AI developments are getting massive quote-tweet velocity. First-mover advantage is critical — jump within 30 minutes of a news break. Thought leadership angle outperforms pure news reporting.' },
    { tag: '#DevLog',       score: 87, vol: '12M',  delta: '+19%', growth: [50,56,63,70,76,82,87], posts: 198000, engagement: '8.8%',  peakTime: 'Mon-Fri 9am-11am', desc: 'Developer community content is highly engaged and shares within tight networks. Weekly dev log threads get bookmarked heavily. Pair with code screenshots for 40% higher engagement than text-only.' },
    { tag: '#TakeHot',      score: 82, vol: '8.7M', delta: '+14%', growth: [45,52,59,65,71,77,82], posts: 145000, engagement: '7.6%',  peakTime: 'Evenings 6-10pm',  desc: 'Contrarian opinion content drives the highest reply rates on X, which boosts algorithmic distribution. The key is a defensible but surprising position — not pure rage-bait. Threads outperform single posts 4:1 in this category.' },
    { tag: '#OpenSource',   score: 76, vol: '5.2M', delta: '+9%',  growth: [42,48,54,60,66,71,76], posts: 88000,  engagement: '6.3%',  peakTime: 'Weekday mornings', desc: 'Technical community with high signal-to-noise ratio. Announcement posts about new repos or releases get disproportionate RT velocity. GitHub link posts perform better here than on any other platform.' },
    { tag: '#ThreadDrop',   score: 71, vol: '3.9M', delta: '+6%',  growth: [38,44,50,56,61,66,71], posts: 65000,  engagement: '5.4%',  peakTime: 'Thu-Fri 7-9pm',   desc: 'Scheduled thread releases are building anticipation loops. Creators who announce a thread 30 minutes before posting see 60% more first-hour engagement. Works best for educational or narrative content.' },
  ],
}

const ANALYTICS = {
  weekly: [
    { day: 'Mon', reach: 42000, eng: 2940, follows: 180 },
    { day: 'Tue', reach: 58000, eng: 4060, follows: 260 },
    { day: 'Wed', reach: 35000, eng: 2450, follows: 140 },
    { day: 'Thu', reach: 67000, eng: 4690, follows: 310 },
    { day: 'Fri', reach: 89000, eng: 6230, follows: 420 },
    { day: 'Sat', reach: 52000, eng: 3640, follows: 220 },
    { day: 'Sun', reach: 74000, eng: 5180, follows: 340 },
  ],
  monthly: [
    { day: 'W1', reach: 312000, eng: 21840, follows: 1480 },
    { day: 'W2', reach: 418000, eng: 29260, follows: 1920 },
    { day: 'W3', reach: 376000, eng: 26320, follows: 1710 },
    { day: 'W4', reach: 502000, eng: 35140, follows: 2340 },
  ],
  platforms: [
    { name: 'YouTube',   color: '#3b82f6', reach: 1200000, eng: '6.2%', follows: 12400, posts: 18, topPost: 'AI Explained in 5 min' },
    { name: 'TikTok',    color: '#00b894', reach: 840000,  eng: '9.8%', follows: 8400,  posts: 28, topPost: '#SkillUnlock hook video' },
    { name: 'Instagram', color: '#d946ef', reach: 320000,  eng: '7.4%', follows: 3200,  posts: 22, topPost: 'Carousel: 10 creator tips' },
    { name: 'X',         color: '#6366f1', reach: 88000,   eng: '5.1%', follows: 880,   posts: 45, topPost: 'Hot take thread on AI tools' },
  ],
  growth6m: [
    { month: 'Oct', subs: 22000 },
    { month: 'Nov', subs: 28000 },
    { month: 'Dec', subs: 35000 },
    { month: 'Jan', subs: 41000 },
    { month: 'Feb', subs: 38000 },
    { month: 'Mar', subs: 52000 },
  ],
}

export const useStore = create(
  persist(
    (set, get) => ({
      paletteIdx: 0,
      palette: PALETTES[0],
      posts: INITIAL_POSTS,
      trends: TRENDS_DATA,
      analytics: ANALYTICS,
      chatHistory: [],
      selectedPost: null,
      selectedTrend: null,
      analyticsRange: 'weekly',
      notifications: [
        { id:1, type:'hot',  msg:'TikTok #SkillUnlock spiking — 18hr window remaining',  read:false, time:'2m ago' },
        { id:2, type:'warn', msg:'IG engagement dip — pivot to carousel format today',    read:false, time:'14m ago' },
        { id:3, type:'up',   msg:'YT watch time up 22% — hook is working',                read:true,  time:'1h ago' },
        { id:4, type:'hot',  msg:'#AINews trending on X — post thought leadership now',   read:false, time:'2h ago' },
      ],

      cyclePalette: () => {
        const next = (get().paletteIdx + 1) % PALETTES.length
        set({ paletteIdx: next, palette: PALETTES[next] })
      },

      addPost: (post) => set(s => ({
        posts: [...s.posts, { ...post, id: Date.now(), views: 0, likes: 0 }]
      })),

      updatePost: (id, updates) => set(s => ({
        posts: s.posts.map(p => p.id === id ? { ...p, ...updates } : p)
      })),

      deletePost: (id) => set(s => ({ posts: s.posts.filter(p => p.id !== id) })),

      setSelectedPost: (post) => set({ selectedPost: post }),

      setSelectedTrend: (trend) => set({ selectedTrend: trend }),

      setAnalyticsRange: (range) => set({ analyticsRange: range }),

      addChatMessage: (msg) => set(s => ({ chatHistory: [...s.chatHistory, msg] })),

      clearChat: () => set({ chatHistory: [] }),

      markAllRead: () => set(s => ({ notifications: s.notifications.map(n => ({ ...n, read:true })) })),
    }), {
      name: 'fossarythm8-v1',
      partialize: (s) => ({
        paletteIdx: s.paletteIdx,
        palette: s.palette,
        posts: s.posts,
        chatHistory: s.chatHistory,
      }),
    }
  )
)

export { PALETTES }
export default useStore
