package utils

import (
	"os"

	"github.com/joho/godotenv"
)

func GetEnv(key string) (string, error) {

	if os.Getenv("DEVELOPMENT") != "" {
		err := godotenv.Load()

		if err != nil {
			return "", err
		}
	}

	return os.Getenv(key), nil
}