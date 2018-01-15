package utils

import "fmt"

func printSubCommandsDescriptions() {
	fmt.Printf("Commands:\n")
	fmt.Printf("  update     Update unreleased changelog with current merge request\n")
	fmt.Printf("  release    Finalize the release changelog\n")
}

// PrintVersion print the name and version of the cli
func PrintVersion() {
	fmt.Printf("%s (v%s)\n\n", Name, Version)
}

// PrintGeneralHelp print the global help
func PrintGeneralHelp() {
	PrintVersion()
	printSubCommandsDescriptions()
}
