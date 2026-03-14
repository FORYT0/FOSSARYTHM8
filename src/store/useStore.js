import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { INITIAL_POSTS } from '../data/appData'

const PALETTES = [
  { name:'VOID BLACK',    bg:'#080808', bg2:'#111111', tx:'#e8e8e8', ac:'#ffffff', br:'#1e1e1e' },
  { name:'BLOOD SAMURAI', bg:'#0a0000', bg2:'#140808', tx:'#f0e0e0', ac:'#e63946', br:'#2a0808' },
  { name:'NEON PULSE',    bg:'#000d0a', bg2:'#001410', tx:'#d0f0e8', ac:'#00ff9f', br:'#003322' },
  { name:'GOLD CIRCUIT',  bg:'#09080a', bg2:'#120f14', tx:'#eedfc8', ac:'#f5a623', br:'#241a0a' },
  { name:'COBALT NIGHT',  bg:'#00070f', bg2:'#000e1a', tx:'#c8d8f0', ac:'#3b82f6', br:'#001530' },
  { name:'ABSINTHE',      bg:'#040a04', bg2:'#081008', tx:'#d4e8d0', ac:'#7fff00', br:'#102010' },
  { name:'CHROME ROSE',   bg:'#0a060c', bg2:'#140a18', tx:'#e8d0f0', ac:'#d946ef', br:'#200830' },
  { name:'COPPER FORGE',  bg:'#0a0804', bg2:'#141008', tx:'#f0e4d0', ac:'#ea580c', br:'#241808' },
]

const useStore = create(
  persist(
    (set, get) => ({
      paletteIdx: 0,
      palettes: PALETTES,
      palette: PALETTES[0],
      cyclePalette: () => {
        const idx = (get().paletteIdx + 1) % PALETTES.length
        set({ paletteIdx: idx, palette: PALETTES[idx] })
      },

      posts: INITIAL_POSTS,
      addPost: (post) => set(s => ({ posts: [...s.posts, { ...post, id: Date.now() }] })),
      updatePost: (id, updates) => set(s => ({ posts: s.posts.map(p => p.id === id ? { ...p, ...updates } : p) })),
      deletePost: (id) => set(s => ({ posts: s.posts.filter(p => p.id !== id) })),

      chatHistory: [],
      addChatMessage: (msg) => set(s => ({ chatHistory: [...s.chatHistory, msg] })),
      clearChat: () => set({ chatHistory: [] }),

      analyticsRange: '7d',
      setAnalyticsRange: (r) => set({ analyticsRange: r }),

      activePlatform: 'tiktok',
      setActivePlatform: (p) => set({ activePlatform: p }),

      notifications: [
        { id:1, type:'hot',  msg:'TikTok #SkillUnlock spiking — 18hr window remaining',  read:false, time:'2m ago' },
        { id:2, type:'warn', msg:'IG engagement dip — pivot to carousel format today',    read:false, time:'14m ago' },
        { id:3, type:'up',   msg:'YT watch time up 22% — hook is working',                read:true,  time:'1h ago' },
        { id:4, type:'hot',  msg:'#AINews trending on X — post thought leadership now',   read:false, time:'2h ago' },
      ],
      markAllRead: () => set(s => ({ notifications: s.notifications.map(n => ({ ...n, read:true })) })),
    }),
    {
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

export default useStore
