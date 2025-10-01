package repositories

import (
	"github.com/RicardoMC310/SaaS-Control-Of-Stock/internal/connection"
	"gorm.io/gorm"
)

type userPostgresRepository struct {
	db *gorm.DB
}

func NewUserPostgresRepository() *userPostgresRepository {

	db, err := connection.Connect()
	if err != nil {
		panic(err.Error())
	}

	return &userPostgresRepository{db: db}
}