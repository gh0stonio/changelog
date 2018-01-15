package commands

import (
	"flag"
	"fmt"
	"os"
)

// CustomFlag custom API based on flagSet
type CustomFlag interface {
	Parse() error
}

type customFlag struct {
	flagSet *flag.FlagSet
}

// NewFlagSet create a new flagSet
func NewFlagSet(name, helpText string) CustomFlag {
	flagSet := flag.NewFlagSet(name, flag.ExitOnError)

	flagSet.Usage = func() {
		fmt.Printf("%s\n", helpText)
		flagSet.PrintDefaults()
	}

	return customFlag{flagSet: flagSet}
}

// Parse the flagSet
func (c customFlag) Parse() error {
	err := c.flagSet.Parse(os.Args[2:])

	if err != nil {
		return err
	}

	return nil
}
