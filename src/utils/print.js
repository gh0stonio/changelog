import chalk from 'chalk'

const _error = chalk.bold.red
const _warning = chalk.keyword('orange')
const _success = chalk.keyword('green')

export const printSuccess = text => process.stdout.write(_success(`${text}\n`))
export const printWarning = text => process.stdout.write(_warning(`${text}\n`))
export const printError = text => process.stderr.write(_error(`${text}\n`))
