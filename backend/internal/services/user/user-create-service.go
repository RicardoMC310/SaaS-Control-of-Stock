package services

import (
	"github.com/RicardoMC310/SaaS-Control-Of-Stock/internal/entities"
	"github.com/RicardoMC310/SaaS-Control-Of-Stock/internal/repositories"
	"golang.org/x/crypto/bcrypt"
)

type userCreateService struct {
	repo repositories.IUserRepository
}

func (u *userCreateService) Execute(user *entities.User) error {
	err := user.IsValid()
	if err != nil {
		return err
	}

	hasedPassword, err := bcrypt.GenerateFromPassword(
		[]byte(user.Password),
		bcrypt.DefaultCost,
	)
	if err != nil {
		return err
	}

	user.Password = string(hasedPassword)

	err = u.repo.Save(user)
	if err != nil {
		return err
	}

	return nil
}

func NewUserCreateService(repo repositories.IUserRepository) *userCreateService {
	return &userCreateService{repo: repo}
}
