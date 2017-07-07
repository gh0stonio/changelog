import fs from 'fs'
import path from 'path'
import moment from 'moment'

import { printError, printSuccess } from '../utils/print'

export default () => {
  const changelogPath = 'CHANGELOG.md'
  const unreleasedTitle = '## Unreleased'

  const pkgPath = path.join(process.cwd(), '/package.json')
  const pkg = require(pkgPath) // eslint-disable-line import/no-dynamic-require

  fs.exists(changelogPath, (exists) => {
    if (!exists) {
      printError('No changelog file')
      process.exit(1)
    }

    const changelogContent = fs.readFileSync(changelogPath).toString().split('\n')

    if (changelogContent[0] !== unreleasedTitle) {
      printError('No unrelease content')
      process.exit(1)
    }

    changelogContent.splice(0, 1, `## ${pkg.version} (${moment().format('DD/MM/YYYY')})`)

    fs.writeFile(changelogPath, changelogContent.join('\n'), (err) => {
      if (err) {
        printError(`Error occured when writing file, ${err}`)
        process.exit(1)
      }

      printSuccess('Changelog updated with new release')
    })
  })
}
