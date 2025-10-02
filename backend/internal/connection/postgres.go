package connection

import (
	"fmt"

	"github.com/RicardoMC310/SaaS-Control-Of-Stock/utils"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Connect() (*gorm.DB, error) {
	dsn, err := utils.GetEnv("DSN_POSTGRES")
	if err != nil {
		return nil, fmt.Errorf("DSN_POSTGRES not found in environment variables")
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("database connection error: %s", err.Error())
	}

	return db, nil
}
