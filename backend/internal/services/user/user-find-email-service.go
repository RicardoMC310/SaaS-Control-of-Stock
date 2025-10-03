package services

import (
	"github.com/RicardoMC310/SaaS-Control-Of-Stock/internal/entities"
	"github.com/RicardoMC310/SaaS-Control-Of-Stock/internal/repositories"
)

type userFindByEmailService struct {
	repo repositories.IUserRepository
}

func (u *userFindByEmailService) Execute(email string) (*entities.User, error) {
	user, err := u.repo.FindByEmail(email)

	if err != nil {
		return nil, err
	}

	return user, nil
}

func NewUserFindByEmailService(repo repositories.IUserRepository) *userFindByEmailService {
	return &userFindByEmailService{repo: repo}
}