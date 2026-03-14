export const PLATFORMS = {
  youtube:   { label:'YouTube',     color:'#3b82f6', short:'YT' },
  tiktok:    { label:'TikTok',      color:'#00b894', short:'TT' },
  instagram: { label:'Instagram',   color:'#d946ef', short:'IG' },
  x:         { label:'X / Twitter', color:'#6366f1', short:'X'  },
}

export const TRENDS = {
  youtube: [
    { tag:'#AIExplained',      score:94, vol:'8.2M', change:'+18%', velocity:'Rising fast',  window:'48h',
      history:[55,62,70,74,80,88,94],
      desc:'AI tutorial content is surging with beginner-friendly explainer formats getting the most traction. Channels using screen recording + face cam see 3x more watch time.',
      topContent:['Beginners guide to AI','How LLMs actually work','Build your first AI app'],
      bestTime:'2-4pm weekdays', avgViews:'142K', engRate:'6.8%' },
    { tag:'#ProductivityHacks', score:89, vol:'5.7M', change:'+12%', velocity:'Steady climb', window:'72h',
      history:[65,68,72,75,79,84,89],
      desc:'Productivity content peaks on Monday mornings as viewers plan their week. Listicle formats dominate CTR.',
      topContent:['My morning routine','Notion setup tour','Focus techniques'],
      bestTime:'Mon 7-9am', avgViews:'98K', engRate:'5.2%' },
    { tag:'#DayInMyLife',      score:85, vol:'4.1M', change:'+9%',  velocity:'Stable',       window:'96h',
      history:[70,72,74,76,78,81,85],
      desc:'Lifestyle vlogs thrive with authentic, unscripted content. Creators showing real struggles outperform polished versions by 40%.',
      topContent:['Day in my life NYC','Work from home vlog','Entrepreneur daily'],
      bestTime:'Fri 4-6pm', avgViews:'67K', engRate:'4.9%' },
    { tag:'#LearnInPublic',    score:81, vol:'3.6M', change:'+7%',  velocity:'Growing',      window:'5d',
      history:[60,63,67,70,73,77,81],
      desc:'Build-in-public content is forming niche communities with high retention and strong subscriber conversion.',
      topContent:['Week 1 learning to code','My startup journey','Design progress'],
      bestTime:'Wed 6-8pm', avgViews:'54K', engRate:'7.1%' },
    { tag:'#BuildInPublic',    score:77, vol:'2.9M', change:'+5%',  velocity:'Emerging',     window:'7d',
      history:[55,58,62,65,68,72,77],
      desc:'Founders documenting their process are finding loyal audiences. Transparency drives 2x more comments than polished content.',
      topContent:['Month 1 revenue reveal','How I built my SaaS','My first 1000 users'],
      bestTime:'Thu 5-7pm', avgViews:'41K', engRate:'8.3%' },
  ],
  tiktok: [
    { tag:'#SkillUnlock',  score:97, vol:'22M',  change:'+34%', velocity:'Viral now',    window:'18h',
      history:[40,52,65,75,82,90,97],
      desc:'#SkillUnlock is the hottest format right now — before/after skill transformation in under 30 seconds. POV-style hooks performing best.',
      topContent:['POV: you finally learned X','Before/after skill reveal','Day 1 vs Day 100'],
      bestTime:'7-9am & 7-9pm', avgViews:'2.1M', engRate:'11.4%' },
    { tag:'#POVtrend',     score:92, vol:'18M',  change:'+28%', velocity:'Accelerating', window:'24h',
      history:[50,60,68,75,82,87,92],
      desc:'POV storytelling dominates FYP. First-person narratives see 4x more shares than third-person content.',
      topContent:['POV youre new at work','POV first day in NYC','POV becoming rich'],
      bestTime:'12-2pm', avgViews:'1.8M', engRate:'9.7%' },
    { tag:'#RatioCheck',   score:88, vol:'14M',  change:'+21%', velocity:'Rising fast',  window:'36h',
      history:[45,55,64,70,77,83,88],
      desc:'Ratio content is driving comment section engagement. Controversial questions generate the most velocity signals.',
      topContent:['Drop your ratio','Comment if you agree','Fight in the comments'],
      bestTime:'8-10pm', avgViews:'1.4M', engRate:'14.2%' },
    { tag:'#NightRoutine', score:83, vol:'11M',  change:'+16%', velocity:'Steady climb', window:'48h',
      history:[55,60,65,70,74,79,83],
      desc:'Evening routine content peaks 9-11pm local time. GRWB (Get Ready With Bed) format seeing major wellness growth.',
      topContent:['My 10pm routine','Quiet night routine','Skincare bedtime ritual'],
      bestTime:'9-11pm', avgViews:'980K', engRate:'7.8%' },
    { tag:'#SilentVlog',   score:79, vol:'8.5M', change:'+11%', velocity:'Growing',      window:'60h',
      history:[50,55,60,64,68,74,79],
      desc:'Silent/ambient vlog content is finding an audience seeking calm. No talking, just aesthetic footage.',
      topContent:['Silent study with me','Quiet morning routine','No talking day in life'],
      bestTime:'10pm-midnight', avgViews:'720K', engRate:'6.1%' },
  ],
  instagram: [
    { tag:'#CarouselDump', score:91, vol:'9.4M', change:'+22%', velocity:'Rising fast',  window:'30h',
      history:[48,57,66,73,80,86,91],
      desc:'Carousel posts receive 3x more saves than single images. The photo dump format (10 images, casual) beats polished editorial.',
      topContent:['Weekend dump','Places this month','Random photos lately'],
      bestTime:'Tue-Thu 9-11am', avgViews:'890K', engRate:'8.4%' },
    { tag:'#MoodBoard',    score:86, vol:'7.1M', change:'+15%', velocity:'Accelerating', window:'40h',
      history:[55,60,66,70,76,81,86],
      desc:'Aesthetic moodboard carousels for seasonal vibes drive massive saves. Saves signal quality to IG algorithm more than likes.',
      topContent:['March aesthetic','Autumn moodboard','Dark academia vibes'],
      bestTime:'Sat-Sun 10am-12pm', avgViews:'710K', engRate:'7.2%' },
    { tag:'#SlowLiving',   score:82, vol:'5.8M', change:'+11%', velocity:'Stable',       window:'5d',
      history:[60,64,68,71,74,78,82],
      desc:'Slow living is a counter-trend to hustle culture. Quiet, intentional content grows loyal audiences that save and return.',
      topContent:['Slow morning routine','Simple living tips','Minimalist lifestyle'],
      bestTime:'Sun 8-10am', avgViews:'540K', engRate:'6.9%' },
    { tag:'#BeforeAfter',  score:78, vol:'4.2M', change:'+8%',  velocity:'Steady',       window:'6d',
      history:[55,58,62,65,69,73,78],
      desc:'Transformation content remains evergreen. Side-by-side format in Reels getting 40% more reach than carousels.',
      topContent:['Room transformation','Fitness 3 month progress','Skill before/after'],
      bestTime:'Mon 12-2pm', avgViews:'380K', engRate:'5.8%' },
    { tag:'#MicroBlog',    score:74, vol:'3.3M', change:'+6%',  velocity:'Emerging',     window:'7d',
      history:[48,52,56,60,64,69,74],
      desc:'Long-form text carousels are replacing blogging for Gen Z. Slide-based essays on niche topics build authority audiences.',
      topContent:['Things I wish I knew','My financial mistakes','Lessons from therapy'],
      bestTime:'Wed-Thu 7-9pm', avgViews:'290K', engRate:'9.1%' },
  ],
  x: [
    { tag:'#AINews',     score:96, vol:'31M',  change:'+41%', velocity:'Viral now',    window:'12h',
      history:[38,52,65,75,84,91,96],
      desc:'AI news is the #1 topic on X. Thought leadership threads and breakdown threads of new models are getting massive reach.',
      topContent:['Thread: GPT-5 analysis','Hot take on AI regulation','My prediction thread'],
      bestTime:'8-10am & 2-4pm', avgViews:'4.2M', engRate:'3.8%' },
    { tag:'#DevLog',     score:87, vol:'12M',  change:'+19%', velocity:'Rising fast',  window:'36h',
      history:[52,58,65,70,76,82,87],
      desc:'Developer build logs drive highest-quality engagement on X. Dev audience converts to follows at 3x the rate of general content.',
      topContent:['Day 30 building in public','Shipped my SaaS today','What I learned this week'],
      bestTime:'Mon-Fri 9-11am', avgViews:'1.1M', engRate:'5.4%' },
    { tag:'#TakeHot',    score:82, vol:'8.7M', change:'+14%', velocity:'Accelerating', window:'24h',
      history:[45,52,60,66,72,78,82],
      desc:'Controversial takes drive massive reply engagement. The ratio game signals virality to X algorithm.',
      topContent:['Unpopular opinion:','Hot take but','Nobody wants to hear this'],
      bestTime:'Tue-Thu 6-9pm', avgViews:'870K', engRate:'7.2%' },
    { tag:'#OpenSource',  score:76, vol:'5.2M', change:'+9%',  velocity:'Steady',       window:'5d',
      history:[54,58,61,65,68,72,76],
      desc:'Open source launches and GitHub threads get sustained organic reach. Demo GIFs outperform text-only by 6x.',
      topContent:['Just open-sourced my tool','GitHub repo tour','Free tool I built'],
      bestTime:'Wed 10am-12pm', avgViews:'520K', engRate:'4.9%' },
    { tag:'#ThreadDrop',  score:71, vol:'3.9M', change:'+6%',  velocity:'Growing',      window:'7d',
      history:[44,48,53,57,61,66,71],
      desc:'Long educational threads on niche expertise build follower bases fast. Threads under 12 tweets perform best.',
      topContent:['Thread: everything I know','I studied X for 100hrs','Breakdown thread:'],
      bestTime:'Tue & Thu 7-9am', avgViews:'390K', engRate:'6.8%' },
  ],
}

export const ALGO_TIPS = {
  youtube: [
    'Post 2-3x/week consistently — compounding reach starts at week 6',
    'Thumbnail CTR benchmark: 10%+ — test face-cam vs text-heavy formats',
    "Hook must deliver on title's promise within the first 30 seconds",
    'Add chapters — they boost watch time and search indexing simultaneously',
    'End screen + card placement at 85% of video duration is optimal',
    'Replies to comments in the first 2hrs boost distribution by ~15%',
  ],
  tiktok: [
    'Post 3-4x/day across different time zones to maximize FYP distribution',
    'Trending audio boosts reach by up to 40% — check Creative Center daily',
    'Hook must land in first 3 seconds — no intros, no preamble, ever',
    'Reply to every comment within 1hr of posting to boost velocity signals',
    'Duet or stitch trending content to inherit their audience momentum',
    'Going live 2x/week lifts regular content performance by 20-30%',
  ],
  instagram: [
    'Carousels get 3x more saves than single images — prioritize this format',
    'Reels under 60s hit peak algorithmic distribution window',
    'Mix 3 niche + 2 trending hashtags — more than 10 hurts reach',
    'Stories maintain existing follower relationships — post 3-5/day',
    'Alt text and first-line caption keywords feed Instagram search',
    'Collab posts with micro-creators (10K-100K) show to both audiences',
  ],
  x: [
    'Text-only threads outperform link posts — move URLs to replies',
    'Quote-tweet established accounts immediately for instant visibility',
    'B2B audience peaks 8-10am; consumer content peaks evenings 6-8pm',
    'Bookmark rates now outweigh likes as quality signal to the algorithm',
    'Jump on trending threads within the first 2 hours — relevancy decays fast',
    'Spaces appearances create a 48hr visibility window for your profile',
  ],
}

const today = new Date()
const wd = today.getDay()
const monday = new Date(today)
monday.setDate(today.getDate() - (wd === 0 ? 6 : wd - 1))

function dayOffset(d) {
  const date = new Date(monday)
  date.setDate(monday.getDate() + d)
  return date.toISOString().split('T')[0]
}

export const INITIAL_POSTS = [
  { id:1,  date:dayOffset(0), platform:'youtube',   title:'AI Explained for Beginners',  status:'live',  type:'Video',    tags:['#AIExplained'],      notes:'Strong hook, 3-act structure. Check analytics at 6hrs.' },
  { id:2,  date:dayOffset(0), platform:'instagram', title:'Morning aesthetic dump',       status:'done',  type:'Carousel', tags:['#CarouselDump'],     notes:'10 slides, muted palette.' },
  { id:3,  date:dayOffset(1), platform:'tiktok',    title:'#SkillUnlock hook reel',       status:'sched', type:'Reel',     tags:['#SkillUnlock'],      notes:'Post exactly at 8am for peak FYP. Use trending audio.' },
  { id:4,  date:dayOffset(1), platform:'x',         title:'Hot take: AI will replace X',  status:'draft', type:'Thread',   tags:['#AINews'],           notes:'5 tweet thread. Controversial opener needed.' },
  { id:5,  date:dayOffset(2), platform:'youtube',   title:'Productivity system tour',     status:'draft', type:'Video',    tags:['#ProductivityHacks'],notes:'B-roll of desk setup. 8-12 min target.' },
  { id:6,  date:dayOffset(3), platform:'instagram', title:'10 habits carousel',           status:'sched', type:'Carousel', tags:['#MicroBlog'],        notes:'Typography slides. Strong CTA on last slide.' },
  { id:7,  date:dayOffset(3), platform:'tiktok',    title:'POV series episode 3',         status:'sched', type:'Reel',     tags:['#POVtrend'],         notes:'Part 3 of viral POV series.' },
  { id:8,  date:dayOffset(4), platform:'x',         title:'DevLog week 4 update',         status:'idea',  type:'Thread',   tags:['#DevLog'],           notes:'Include metrics. Community loves numbers.' },
  { id:9,  date:dayOffset(4), platform:'youtube',   title:'Monthly live stream',          status:'idea',  type:'Live',     tags:['#LearnInPublic'],    notes:'QA format. Promote 48hrs before.' },
  { id:10, date:dayOffset(5), platform:'instagram', title:'Weekend photo dump',           status:'draft', type:'Carousel', tags:['#CarouselDump'],     notes:'Raw, casual aesthetic. 6-8 images.' },
  { id:11, date:dayOffset(6), platform:'tiktok',    title:'Trending sound reaction',      status:'idea',  type:'Reel',     tags:['#RatioCheck'],       notes:'React to #1 trending sound of the week.' },
]

export const ANALYTICS_DATA = {
  '7d': {
    reach:     [42000,58000,35000,67000,89000,52000,74000],
    engagement:[2800, 3900, 2100, 4800, 6200, 3700, 5100],
    followers: [120,  180,  95,   220,  310,  175,  260],
    labels:    ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
  },
  '30d': {
    reach:     [210000,198000,245000,290000,310000,278000,330000,360000,290000,410000,380000,440000,310000,290000,350000,410000,460000,390000,430000,500000,460000,410000,380000,450000,520000,480000,510000,560000,490000,610000],
    engagement:[14000,13000,16500,19000,21000,18500,22000,24500,19000,28000,25000,30000,21000,19000,24000,28000,31000,26000,29000,34000,31000,28000,26000,30000,35000,32000,34000,38000,33000,41000],
    followers: [580,540,690,820,950,840,1010,1120,880,1300,1150,1380,960,890,1100,1280,1420,1190,1330,1540,1420,1280,1190,1380,1600,1470,1560,1740,1510,1870],
    labels:    Array.from({length:30},(_,i)=>`D${i+1}`),
  },
  '90d': {
    reach:     [280000,320000,295000,380000,410000,365000,420000,490000,445000,530000,510000,590000],
    engagement:[18000,22000,19500,26000,28000,24000,29000,34000,31000,37000,35000,41000],
    followers: [980,1150,1050,1380,1490,1320,1560,1820,1690,2010,1940,2280],
    labels:    ['W1','W2','W3','W4','W5','W6','W7','W8','W9','W10','W11','W12'],
  },
}

export const PLATFORM_STATS = {
  youtube:   { followers:'1.24M', reach:'820K',  eng:'6.8%',  growth:'+4.2%', color:'#3b82f6', pct:78 },
  tiktok:    { followers:'847K',  reach:'1.4M',  eng:'11.4%', growth:'+8.7%', color:'#00b894', pct:92 },
  instagram: { followers:'324K',  reach:'380K',  eng:'8.4%',  growth:'+3.1%', color:'#d946ef', pct:65 },
  x:         { followers:'89K',   reach:'1.1M',  eng:'3.8%',  growth:'+5.9%', color:'#6366f1', pct:84 },
}

export const POST_STATUSES = {
  live:  { label:'Live',      color:'#22c55e' },
  done:  { label:'Published', color:'#3b82f6' },
  sched: { label:'Scheduled', color:'#f59e0b' },
  draft: { label:'Draft',     color:'#888888' },
  idea:  { label:'Idea',      color:'#6366f1' },
}

export const EDITING_STEPS = [
  { title:'Color Grade',    desc:'Boost shadows +15, saturation +10. Match platform aesthetic (TikTok: high contrast / IG: muted tones).' },
  { title:'Crop & Frame',   desc:'Rule of thirds. Safe zones: TikTok 9:16 avoid top/bottom 15%. YouTube thumbnail 16:9 faces left 40%.' },
  { title:'Text Overlay',   desc:'Max 5 words. Bold weight. White + 2px black stroke. Center or bottom 1/3. Minimum 48pt at export.' },
  { title:'Caption Formula',desc:'Hook → Value → CTA. 150 chars max on X. Pinned comment for TikTok long copy. 3-5 niche hashtags on IG.' },
  { title:'Audio Layer',    desc:'Music 15-20% volume. Voice 80-85%. Trending audio +40% reach. Source: Epidemic Sound / Artlist.' },
  { title:'Export & Post',  desc:'TikTok: 7-9am, 12-3pm, 7-11pm. IG: Tue-Thu 9am-12pm. YouTube: 2-4pm weekdays. X: 8-10am.' },
]

export const FORMAT_SPECS = {
  tiktok:    { ratio:'9:16', res:'1080×1920', maxLen:'60s', chars:'2200 (pin as comment)', hashtags:'3-5 + trending sound' },
  instagram: { ratio:'4:5',  res:'1080×1350', maxLen:'90s Reel', chars:'2200', hashtags:'5-10 mixed niche/trending' },
  youtube:   { ratio:'16:9', res:'1920×1080', maxLen:'No limit', chars:'5000 desc', hashtags:'3 in title/desc' },
  x:         { ratio:'16:9', res:'1280×720',  maxLen:'2m20s', chars:'280', hashtags:'1-2 max' },
}
