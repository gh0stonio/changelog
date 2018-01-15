package commands

import (
	"fmt"
)

// ReleaseCommand create a new update sub command
func ReleaseCommand() Command {
	config := CommandConfig{Name: "release", HelpText: "Release command help", Task: func() error {
		fmt.Printf("bump to a new release on CHANGELOG.md")

		return nil
	}}

	return NewCommand(config)
}
