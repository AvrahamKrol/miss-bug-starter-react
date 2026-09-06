import fs from 'fs'
import { utilService } from './util.service.js'

export const bugService = {
  query,
  getById,
  remove,
  save,
  getDefaultFilter,
}

let bugs = [
  {
    title: 'Infinite Loop Detected',
    severity: 4,
    _id: '1NF1N1T3',
  },
  {
    title: 'Keyboard Not Found',
    severity: 3,
    _id: 'K3YB0RD',
  },
  {
    title: '404 Coffee Not Found',
    severity: 2,
    _id: 'C0FF33',
  },
  {
    title: 'Unexpected Response',
    severity: 1,
    _id: 'G0053',
  },
]

const path = './data/bug.json'
_createBugs()

function query() {
  return Promise.resolve(bugs)
}

function getById(bugId) {
  const bug = bugs.find((bug) => bug._id === bugId)
  return Promise.resolve(bug)
}

function remove(bugId) {
  const idx = bugs.findIndex((bug) => bug._id === bugId)
  bugs.splice(idx, 1)
  return _saveBugs()
}

function save(bugToSave) {
  if (bugToSave._id) {
    const idx = bugs.findIndex((bug) => bug._id === bugToSave._id)
    bugs.splice(idx, 1, bugToSave)
  } else {
    bugToSave._id = utilService.makeId()
    bugToSave.createdAt = Date.now()
    bugs.unshift(bugToSave)
  }

  return _saveBugs().then(() => bugToSave)
}

function _saveBugs() {
  return utilService.writeJsonFile(path, bugs)
}

function _createBugs() {
  if (fs.existsSync(path)) {
    bugs = utilService.readJsonFile(path)
  } else {
    bugs = bugs.map((bug) => ({ ...bug, createdAt: Date.now() }))
    _saveBugs()
  }
}

function getDefaultFilter() {
  return { title: '', minSeverity: 0 }
}
