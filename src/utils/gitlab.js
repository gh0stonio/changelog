import fetch from 'node-fetch'
import config from '../../config.json'

const getMergeRequestData = (id, project) => fetch(`http://git.vpgrp.io/api/v4/projects/${project.id}/merge_requests/${id}?private_token=${config.gitlabToken}`).then(res => res.json())
const getProjectData = () => fetch(`http://git.vpgrp.io/api/v4/projects?private_token=${config.gitlabToken}&search=${config.projectName}&simple=true`)
  .then(res => res.json())
  .then(body => body.filter(project => project.web_url === config.projectUrl)[0])

export const getPullRequestData = id => getProjectData().then(project => getMergeRequestData(id, project))
