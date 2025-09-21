package repositories

import (
	"github.com/RicardoMC310/SaaS-Control-Of-Stock/internal/entities"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type userPostgresRepository struct {
	DB *gorm.DB
}

func (u *userPostgresRepository) Save(user *entities.User) error {
	err := u.DB.Save(user).Error
	if err != nil {
		return err
	}

	return nil
}

func CreateUserpostgreRepository(dsn string) *userPostgresRepository {
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err.Error())
	}
	return &userPostgresRepository{DB: db}
}