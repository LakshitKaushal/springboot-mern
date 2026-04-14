import express from 'express'
import Course from '../models/Course.js'

const router = express.Router()

// GET /api/v1/courses
router.get('/', async (_req, res) => {
  try {
    const courses = await Course.find().lean()
    res.json(courses)
  } catch (err) {
    console.error('Get courses error', err)
    res.status(500).json({ msg: 'Failed to load courses' })
  }
})

// GET /api/v1/courses/search?query=
router.get('/search', async (req, res) => {
  try {
    const q = (req.query.query || '').toString().trim().toLowerCase()
    const all = await Course.find().lean()
    if (!q) return res.json(all)

    const filtered = all.filter(c => {
      const title = (c.title || '').toLowerCase()
      const desc = (c.description || '').toLowerCase()
      const provider = (c.provider || '').toLowerCase()
      const tags = (c.tags || []).map(t => (t || '').toLowerCase())
      if (q.startsWith('#')) {
        const tag = q.slice(1)
        return tags.some(t => t.includes(tag))
      }
      return (
        title.includes(q) ||
        desc.includes(q) ||
        provider.includes(q)
      )
    })
    res.json(filtered)
  } catch (err) {
    console.error('Search courses error', err)
    res.status(500).json({ msg: 'Failed to search courses' })
  }
})

export default router



