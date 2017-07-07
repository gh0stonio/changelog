import fs from 'fs'
import { printError, printSuccess } from '../utils/print'

export default () => {
  const changelogPath = 'CHANGELOG.md'
  const unreleasedTitle = '## Unreleased'
  const entryTemplate = '- [LABEL] titlefdesz ([PR](url))'

  fs.exists(changelogPath, (exists) => {
    let changelogContent = []

    if (exists) {
      changelogContent = fs.readFileSync(changelogPath).toString().split('\n')
    }

    if (changelogContent[0] !== unreleasedTitle) {
      changelogContent.splice(0, 0, unreleasedTitle)
    }

    changelogContent.splice(1, 0, entryTemplate)

    fs.writeFile(changelogPath, changelogContent.join('\n'), (err) => {
      if (err) {
        printError(`Error occured when writing file, ${err}`)
        process.exit(1)
      }

      printSuccess('Changelog updated with new entry')
    })
  })
}
