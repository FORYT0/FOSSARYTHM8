import React from 'react'
import { useStore } from '../store'
import { Card, CardTitle, Grid, Pill, Modal, Button, Input, Select } from '../components/UI'

const DAYS = ['MON','TUE','WED','THU','FRI','SAT','SUN']
const PLATFORMS = ['YT','TT','IG','X']
const STATUSES = ['IDEA','DRAFT','SCHED','LIVE','DONE']
const PLT_COLORS = { YT: '#3b82f6', TT: '#00b894', IG: '#d946ef', X: '#6366f1' }

function blankPost() {
  return { day: 'MON', platform: 'TT', title: '', status: 'IDEA', time: '12:00', tags: [], views: 0, likes: 0, color: '#00b894' }
}

export default function Lineup() {
  const { palette: p, posts, addPost, updatePost, deletePost } = useStore()
  const [selectedPost, setSelectedPost] = React.useState(null)
  const [editData, setEditData] = React.useState(null)
  const [addingNew, setAddingNew] = React.useState(false)
  const [newPost, setNewPost] = React.useState(blankPost())
  const [tagInput, setTagInput] = React.useState('')

  function openPost(post) { setSelectedPost(post); setEditData({ ...post }) }
  function closeModal() { setSelectedPost(null); setEditData(null) }
  function saveEdit() { if (!editData) return; updatePost(editData.id, editData); closeModal() }
  function handleDelete() { if (!selectedPost) return; deletePost(selectedPost.id); closeModal() }

  function handleAddPost() {
    addPost({ ...newPost, color: PLT_COLORS[newPost.platform] || '#888' })
    setAddingNew(false); setNewPost(blankPost()); setTagInput('')
  }

  function addTag(data, setData) {
    const t = tagInput.trim(); if (!t) return
    const tag = t.startsWith('#') ? t : `#${t}`
    setData(d => ({ ...d, tags: [...(d.tags || []), tag] })); setTagInput('')
  }

  const statusType = s => s === 'LIVE' ? 'hot' : s === 'DONE' ? 'up' : s === 'SCHED' ? 'warn' : 'default'
  const queueCounts = { Scheduled: posts.filter(x => x.status === 'SCHED').length, Draft: posts.filter(x => x.status === 'DRAFT').length, Ideas: posts.filter(x => x.status === 'IDEA').length, Live: posts.filter(x => x.status === 'LIVE').length }

  return (
    <div className="animate-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span style={{ fontSize: 11, opacity: .5 }}>{posts.length} posts · {queueCounts.Scheduled} scheduled</span>
        <Button onClick={() => setAddingNew(true)}>+ New Post</Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, marginBottom: 14 }}>
        {DAYS.map(day => {
          const dayPosts = posts.filter(x => x.day === day)
          return (
            <div key={day} style={{ border: `1px solid ${p.br}`, borderRadius: 8, padding: 8, minHeight: 90, background: p.bg, transition: 'border-color .2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = p.ac + '33'}
              onMouseLeave={e => e.currentTarget.style.borderColor = p.br}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', opacity: .4, marginBottom: 6, fontFamily: "'Space Mono',monospace" }}>{day}</div>
              {dayPosts.map(post => (
                <div key={post.id} onClick={() => openPost(post)}
                  style={{ padding: '3px 6px', borderRadius: 4, fontSize: 9, fontWeight: 600, marginBottom: 3, borderLeft: `2px solid ${post.color}`, background: post.color + '11', color: post.color, cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                  title={post.title}>
                  {post.platform} · {post.title}
                </div>
              ))}
              {dayPosts.length === 0 && (
                <div onClick={() => { setNewPost(b => ({ ...b, day })); setAddingNew(true) }}
                  style={{ fontSize: 9, opacity: .2, cursor: 'pointer', textAlign: 'center', marginTop: 10, fontFamily: "'Space Mono',monospace" }}>+ add</div>
              )}
            </div>
          )
        })}
      </div>

      <Grid cols={2} gap={10}>
        <Card>
          <CardTitle>Queue Status</CardTitle>
          {Object.entries(queueCounts).map(([label, count]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${p.br}` }}>
              <span style={{ fontSize: 12 }}>{label}</span>
              <Pill type={label === 'Live' ? 'hot' : label === 'Scheduled' ? 'warn' : 'default'}>{count} posts</Pill>
            </div>
          ))}
        </Card>
        <Card>
          <CardTitle>Best Post Windows</CardTitle>
          {[['TikTok','7-9am · 12-3pm · 7-11pm','#00b894'],['Instagram','Tue-Thu · 9am-12pm','#d946ef'],['YouTube','2-4pm weekdays','#3b82f6'],['X / Twitter','8-10am · 6-8pm','#6366f1']].map(([pl,t,c]) => (
            <div key={pl} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
              <div style={{ width: 3, height: 30, borderRadius: 2, background: c, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: c }}>{pl}</div>
                <div style={{ fontSize: 10, opacity: .5 }}>{t}</div>
              </div>
            </div>
          ))}
        </Card>
      </Grid>

      <Modal open={!!selectedPost} onClose={closeModal} title="POST DETAILS" width={520}>
        {editData && (
          <div>
            <Grid cols={2} gap={8} style={{ marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 10, opacity: .4, marginBottom: 5 }}>Platform</div>
                <Select value={editData.platform} onChange={e => setEditData(d => ({ ...d, platform: e.target.value, color: PLT_COLORS[e.target.value] || '#888' }))} options={PLATFORMS} />
              </div>
              <div>
                <div style={{ fontSize: 10, opacity: .4, marginBottom: 5 }}>Day</div>
                <Select value={editData.day} onChange={e => setEditData(d => ({ ...d, day: e.target.value }))} options={DAYS} />
              </div>
            </Grid>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 10, opacity: .4, marginBottom: 5 }}>Title</div>
              <Input value={editData.title} onChange={e => setEditData(d => ({ ...d, title: e.target.value }))} placeholder="Post title..." />
            </div>
            <Grid cols={2} gap={8} style={{ marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 10, opacity: .4, marginBottom: 5 }}>Time</div>
                <Input value={editData.time} onChange={e => setEditData(d => ({ ...d, time: e.target.value }))} placeholder="14:00" />
              </div>
              <div>
                <div style={{ fontSize: 10, opacity: .4, marginBottom: 5 }}>Status</div>
                <Select value={editData.status} onChange={e => setEditData(d => ({ ...d, status: e.target.value }))} options={STATUSES} />
              </div>
            </Grid>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 10, opacity: .4, marginBottom: 5 }}>Tags</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 8 }}>
                {(editData.tags || []).map((tag, i) => (
                  <span key={i} onClick={() => setEditData(d => ({ ...d, tags: d.tags.filter((_, j) => j !== i) }))}
                    style={{ padding: '2px 8px', borderRadius: 20, fontSize: 10, border: `1px solid ${p.ac}44`, color: p.ac, background: p.ac + '11', cursor: 'pointer' }}>{tag} ✕</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <Input value={tagInput} onChange={e => setTagInput(e.target.value)} placeholder="#hashtag" style={{ flex: 1 }} />
                <Button onClick={() => addTag(editData, setEditData)} variant="ghost">Add</Button>
              </div>
            </div>
            {(editData.views > 0 || editData.likes > 0) && (
              <Grid cols={2} gap={8} style={{ marginBottom: 12 }}>
                <div style={{ padding: 10, borderRadius: 8, background: p.bg, border: `1px solid ${p.br}`, textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 16, fontWeight: 700, color: p.ac }}>{editData.views.toLocaleString()}</div>
                  <div style={{ fontSize: 10, opacity: .4, marginTop: 2 }}>Views</div>
                </div>
                <div style={{ padding: 10, borderRadius: 8, background: p.bg, border: `1px solid ${p.br}`, textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 16, fontWeight: 700, color: '#22c55e' }}>{editData.likes.toLocaleString()}</div>
                  <div style={{ fontSize: 10, opacity: .4, marginTop: 2 }}>Likes</div>
                </div>
              </Grid>
            )}
            <div style={{ display: 'flex', gap: 8 }}>
              <Button onClick={handleDelete} variant="danger">Delete</Button>
              <Button onClick={closeModal} variant="ghost" style={{ flex: 1 }}>Cancel</Button>
              <Button onClick={saveEdit} style={{ flex: 1 }}>Save</Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={addingNew} onClose={() => setAddingNew(false)} title="NEW POST" width={460}>
        <div>
          <Grid cols={2} gap={8} style={{ marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 10, opacity: .4, marginBottom: 5 }}>Platform</div>
              <Select value={newPost.platform} onChange={e => setNewPost(d => ({ ...d, platform: e.target.value, color: PLT_COLORS[e.target.value] || '#888' }))} options={PLATFORMS} />
            </div>
            <div>
              <div style={{ fontSize: 10, opacity: .4, marginBottom: 5 }}>Day</div>
              <Select value={newPost.day} onChange={e => setNewPost(d => ({ ...d, day: e.target.value }))} options={DAYS} />
            </div>
          </Grid>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, opacity: .4, marginBottom: 5 }}>Title</div>
            <Input value={newPost.title} onChange={e => setNewPost(d => ({ ...d, title: e.target.value }))} placeholder="Post title..." />
          </div>
          <Grid cols={2} gap={8} style={{ marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 10, opacity: .4, marginBottom: 5 }}>Time</div>
              <Input value={newPost.time} onChange={e => setNewPost(d => ({ ...d, time: e.target.value }))} placeholder="14:00" />
            </div>
            <div>
              <div style={{ fontSize: 10, opacity: .4, marginBottom: 5 }}>Status</div>
              <Select value={newPost.status} onChange={e => setNewPost(d => ({ ...d, status: e.target.value }))} options={STATUSES} />
            </div>
          </Grid>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button onClick={() => setAddingNew(false)} variant="ghost" style={{ flex: 1 }}>Cancel</Button>
            <Button onClick={handleAddPost} style={{ flex: 1 }} disabled={!newPost.title}>Add to Lineup</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
