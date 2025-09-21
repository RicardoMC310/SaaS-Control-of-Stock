package utils

import (
	"os"

	"github.com/joho/godotenv"
)

func GetEnv(key string) string {

	if os.Getenv("DEPLOY") == "" {
		err := godotenv.Load()

		if err != nil {
			panic(err.Error())
		}
	}

	return os.Getenv(key)

}