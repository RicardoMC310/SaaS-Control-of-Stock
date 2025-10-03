package services

import (
	"time"

	"github.com/RicardoMC310/SaaS-Control-Of-Stock/internal/repositories"
	"github.com/RicardoMC310/SaaS-Control-Of-Stock/utils"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

type authLoginService struct {
	repo repositories.IUserRepository
}

func (a *authLoginService) Execute(email string, password string) (string, error) {

	user, err := a.repo.FindByEmail(email)
	if err != nil {
		return "", err
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return "", err
	}

	secretStr, err := utils.GetEnv("JWT_STRING")
	if err != nil {
		return "", err
	}

	secret := []byte(secretStr)

	claims := jwt.MapClaims{
		"id": user.ID,
		"name": user.Name,
		"email": user.Email,
		"exp": time.Now().Unix(),
		"iat": time.Now().Add(time.Hour * 16).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenStr, err := token.SignedString(secret)
	if err != nil {
		return "", err
	}

	return tokenStr, nil
}

func NewAuthLoginService(repo repositories.IUserRepository) *authLoginService {
	return &authLoginService{repo: repo}
}