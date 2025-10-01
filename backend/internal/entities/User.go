package entities

import (
	"fmt"
	"net/mail"
	"strconv"

	"github.com/RicardoMC310/SaaS-Control-Of-Stock/utils"
	"github.com/wagslane/go-password-validator"
)

type User struct {
	ID    uint   `json:"id" gorm:"primaryKey;autoIncrement"`
	Name  string `json:"name" gorm:"size:50;not null"`
	Email string `json:"email" gorm:"not null"`
	Password string `json:"-" gorm:"not null"`
}

func getEntropyMinimum() (float64, error) {
	minEntropyStr, err := utils.GetEnv("MIN_ENTROPY")
	if err != nil {
		return 0, fmt.Errorf("minimum entropy not found in environment variables")
	}

	minEntropy, err := strconv.ParseFloat(minEntropyStr, 64)
	if err != nil {
		return 0, fmt.Errorf("invalid minimum entropy, got %s", minEntropyStr)
	}

	return minEntropy, nil
}

func (u *User) IsValid() error {

	if len(u.Name) < 3 {
		return fmt.Errorf("name must be longer than 3 characters, got %d", len(u.Name))
	}

	_, err := mail.ParseAddress(u.Email)
	if err != nil {
		return fmt.Errorf("email must be valid, got email invalid %s", u.Email)
	}

	minEntropy, err := getEntropyMinimum()
	if err != nil {
		return err
	}

	err = passwordvalidator.Validate(u.Password, minEntropy)
	if err != nil {
		return fmt.Errorf("password must be strong")
	}

	return nil
}

func NewUserEntity() *User {
	return &User{}
}
