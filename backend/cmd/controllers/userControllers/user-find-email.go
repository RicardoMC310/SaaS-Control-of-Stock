package userControllers

import (
	"net/http"

	"github.com/RicardoMC310/SaaS-Control-Of-Stock/internal/repositories"
	services "github.com/RicardoMC310/SaaS-Control-Of-Stock/internal/services/user"
	"github.com/gin-gonic/gin"
)

type userEmailInput struct {
	Email string `json:"email" binding:"required,email"`
}

func UserFindByEmailController(ctx *gin.Context, repo repositories.IUserRepository) {
	var body userEmailInput

	if err := ctx.ShouldBindJSON(&body); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"sucess": true,
			"error": err.Error(),
		})

		return
	}

	userService := services.NewUserFindByEmailService(repo)

	user, err := userService.Execute(body.Email)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"sucess": true,
			"error": err.Error(),
		})

		return
	}

	ctx.JSON(http.StatusOK, gin.H{"sucess": true, "user": user})
}