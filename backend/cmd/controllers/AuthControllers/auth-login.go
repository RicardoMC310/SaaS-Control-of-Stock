package authControllers

import (
	"net/http"

	"github.com/RicardoMC310/SaaS-Control-Of-Stock/internal/repositories"
	services "github.com/RicardoMC310/SaaS-Control-Of-Stock/internal/services/auth"
	"github.com/gin-gonic/gin"
)

type authLoginInput struct {
	Email string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

func AuthLoginController(ctx *gin.Context, repo repositories.IUserRepository) {
	var body authLoginInput

	if err := ctx.ShouldBindJSON(&body); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"sucess": false,
			"error": err.Error(),
		})

		return
	}

	authService := services.NewAuthLoginService(repo)

	token, err := authService.Execute(body.Email, body.Password)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"sucess": false,
			"error": err.Error(),
		})

		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"sucess": true,
		"token": token,
	})
}