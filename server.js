import express from 'express'
import { bugService } from './services/bug.service.js'
const app = express()

app.get('/', (req, res) => res.send('Hello there'))

app.get('/api/bug', (req, res) => {
  bugService
    .query()
    .then((bugs) => {
      console.log(bugs)
      return bugs
    })
    .then((bugs) => res.send(bugs))
})

app.get('/api/bug/save', (req, res) => {
  const { id: _id, title, severity } = req.query
  const bugToSave = { _id, title, severity: +severity }
  console.log(bugToSave)

  bugService.save(bugToSave).then((savedBug) => res.send(savedBug))
})

app.get('/api/bug/:id', (req, res) => {
  const { id: bugId } = req.params

  bugService.getById(bugId).then((bug) => res.send(bug))
})

app.get('/api/bug/:id/remove', (req, res) => {
  const { id: bugId } = req.params
  bugService.remove(bugId).then(() => res.send('OK'))
})

app.listen(3030, () => console.log('Server ready at port 3030'))
