package main

import (
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

func main() {
	input := readInputFile()
	lines := strings.Split(input, "\n")

	sum := 0

	for _, line := range lines {
		value := restoreValue(line)
		fmt.Println(value, "from", line)
		sum += value
	}

	fmt.Println("RESULT:")
	fmt.Println(sum)
}

func restoreValue(entry string) int {
	r := regexp.MustCompile(`(\d)`)
	matches := r.FindAllString(entry, -1)

	if len(matches) > 0 {
		value, err1 := strconv.Atoi(matches[0] + matches[len(matches)-1])

		if err1 != nil {
			return 0
		}

		return value
	} else {
		return 0
	}
}

func readInputFile() string {
	data, err := os.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}

	return string(data)
}
