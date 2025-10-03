package repositories

import "github.com/RicardoMC310/SaaS-Control-Of-Stock/internal/entities"

type IUserRepository interface {
	Save(user *entities.User) error
	FindByEmail(email string) (*entities.User, error)
}
