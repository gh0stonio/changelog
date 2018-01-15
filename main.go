package main

import (
	"os"

	"github.com/gh0stonio/changelog/commands"
	"github.com/gh0stonio/changelog/utils"
)

func main() {
	updateCommand := commands.UpdateCommand()
	releaseCommand := commands.ReleaseCommand()

	// Verify that a subcommand has been provided
	if len(os.Args) < 2 {
		utils.PrintGeneralHelp()
		os.Exit(1)
	}

	// Switch on the subcommand
	switch os.Args[1] {
	default:
	case updateCommand.GetName():
		updateCommand.Run()
	case releaseCommand.GetName():
		releaseCommand.Run()
	}
}
