export const bugService = {
  query,
  getById,
  remove,
  save,
  getEmptyBug,
  getDefaultFilter,
}

const BASE_URL = '/api/bug/'

function query(filterBy = {}) {
  return axios
    .get(BASE_URL)
    .then((res) => res.data)
    .then((bugs) => {
      if (filterBy.title) {
        const regExp = new RegExp(filterBy.title, 'i')
        bugs = bugs.filter((bug) => regExp.test(bug.title))
      }
      if (filterBy.minSeverity) {
        bugs = bugs.filter((bug) => bug.severity >= filterBy.minSeverity)
      }
      return bugs
    })
}

function getById(bugId) {
  return axios.get(BASE_URL + bugId).then((res) => res.data)
}

function remove(bugId) {
  return axios.get(BASE_URL + bugId + '/remove').then((res) => res.data)
}

function save(bug) {
  var queryParams = `save?title=${bug.title}&severity=${bug.severity}`
  if (bug._id) queryParams += `&id=${bug._id}`

  return axios.get(BASE_URL + queryParams).then((res) => res.data)
}

function getEmptyBug(title = '', severity = '') {
  return { title, severity }
}

function getDefaultFilter() {
  return { title: '', minSeverity: '' }
}
