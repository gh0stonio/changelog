import program from 'commander'

import { version } from '../package.json'
import { update, release } from './commands'

program
 .version(version)

program
 .command('update')
 .description('update unreleased changelog with current merge request')
 .action(update)

program
 .command('release')
 .description('finalize the release changelog')
 .action(release)

program
 .parse(process.argv)

if (!program.args.length) program.help()
