import fs from 'fs'
import { intersection } from 'lodash'

import config from '../../config.json'
import { printError, printSuccess } from '../utils/print'
import { getLastCommit } from '../utils/git'
import { getPullRequestData } from '../utils/gitlab'

const getMergeRequestId = (message) => {
  const inlinedMessage = message.replace(/(?:\r\n|\r|\n)/g, '_')
  const matches = inlinedMessage.match(/Merge branch .*!([\d]*)/)

  return matches[1]
}

export default () => {
  const changelogPath = 'CHANGELOG.md'
  const unreleasedTitle = '## Unreleased'

  getLastCommit()
    .then(getMergeRequestId)
    .then(getPullRequestData)
    .then((mergeRequest) => {
      const title = mergeRequest.title[0].toUpperCase() + mergeRequest.title.substring(1)
      const labels = intersection(mergeRequest.labels, config.availableTags).join(' ')

      return `* [${labels}] ${title} ([@${mergeRequest.author.username}](${config.gitlabUrl}/${mergeRequest.author.username}) in [#${mergeRequest.iid}](${config.mergeRequestsUrl}/${mergeRequest.iid}))\n`
    })
    .then(content => new Promise((resolve, reject) => {
      fs.exists(changelogPath, (exists) => {
        let changelogContent = []

        if (exists) {
          changelogContent = fs.readFileSync(changelogPath).toString().split('\n')
        }

        if (changelogContent[0] !== unreleasedTitle) {
          changelogContent.splice(0, 0, unreleasedTitle)
        }

        changelogContent.splice(1, 0, content)

        fs.writeFile(changelogPath, changelogContent.join('\n'), (err) => {
          if (err) {
            reject(`Error occured when writing file, ${err}`)
          }

          resolve()
        })
      })
    }))
    .then(() => printSuccess('Changelog updated with new entry'))
    .catch((err) => {
      printError(err)
      process.exit(1)
    })
}
