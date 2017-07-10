import childProcess from 'child_process'

const gitExec = (command, args) => new Promise((resolve, reject) => {
  childProcess.exec(`git ${command} ${args}`, (error, stdout, stderr) => {
    if (error) {
      return reject(stderr)
    }

    resolve(stdout.trim())
  })
})


export const getLastCommit = () => gitExec('log', '-1 --stat')
