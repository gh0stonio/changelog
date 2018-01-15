package commands

import "fmt"

// CommandConfig is the minimum config required to create a command
type CommandConfig struct {
	Name     string
	HelpText string
	Task     func() error
}

// Command is a runnable sub-command of a CLI.
type Command interface {
	GetName() string
	Run() error
}

type command struct {
	name     string
	helpText string
	task     func() error
	flag     CustomFlag
}

func (c command) GetName() string {
	return c.name
}

func (c command) Run() error {
	err := c.flag.Parse()
	if err != nil {
		return fmt.Errorf("an error occured during args parsing")
	}

	fmt.Printf("running command %s", c.name)

	if c.task == nil {
		return fmt.Errorf("missing task to run")
	}

	err = c.task()
	if err != nil {
		return fmt.Errorf("an error occured when executing the task")
	}

	return nil
}

// NewCommand create a new subCommand
func NewCommand(config CommandConfig) Command {
	command := command{name: config.Name, helpText: config.HelpText, task: config.Task}
	command.flag = NewFlagSet(command.name, command.helpText)

	return command
}
