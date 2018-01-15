package commands

import (
	"fmt"
)

// UpdateCommand create a new update sub command
func UpdateCommand() Command {
	config := CommandConfig{Name: "update", HelpText: "Update command help", Task: func() error {
		fmt.Printf("update CHANGELOG.md")

		return nil
	}}

	return NewCommand(config)
}
