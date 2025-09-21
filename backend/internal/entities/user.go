package entities

import (
	"fmt"
	"net/mail"

	cpf "github.com/mvrilo/go-cpf"
)

type User struct {
	ID       int    `json:"id" gorm:"primaryKey;autoIncrement"`
	Name     string `json:"name" gorm:"not null;size:255"`
	Email    string `json:"email" gorm:"not null;uniqueIndex;size:255"`
	Password string `json:"-" gorm:"not null"`
	CPF      string `json:"cpf" gorm:"not null"`
}

func (u *User) IsValid() error {

	if (len(u.Name) < 3) {
		return fmt.Errorf("name precisa de no mínimo de 3 letras, recebido %d", len(u.Name))
	}

	ok, err := cpf.Valid(u.CPF)
	if !ok || err != nil {
		return fmt.Errorf("cpf recebido %s é inválido", u.CPF)
	}

	_, err = mail.ParseAddress(u.Email)
	if err != nil {
		return fmt.Errorf("email recebido %s inválido", u.Email)
	}

	return nil
}

func NewUser() *User {
	return &User{}
}

