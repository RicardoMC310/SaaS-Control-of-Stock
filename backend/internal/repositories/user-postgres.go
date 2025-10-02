package repositories

import (
	"github.com/RicardoMC310/SaaS-Control-Of-Stock/internal/connection"
	"github.com/RicardoMC310/SaaS-Control-Of-Stock/internal/entities"
	"gorm.io/gorm"
)

type userPostgresRepository struct {
	db *gorm.DB
}

func (u *userPostgresRepository) Save(user *entities.User) error {

	result := u.db.Save(user)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func NewUserPostgresRepository(data ...interface{}) *userPostgresRepository {

	db, err := connection.Connect()
	if err != nil {
		panic(err.Error())
	}

	err = db.AutoMigrate(data...)
	if err != nil {
		panic(err.Error())
	}

	return &userPostgresRepository{db: db}
}
