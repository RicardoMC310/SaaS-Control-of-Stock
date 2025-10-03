package userControllers

import (
	"net/http"

	"github.com/RicardoMC310/SaaS-Control-Of-Stock/internal/entities"
	"github.com/RicardoMC310/SaaS-Control-Of-Stock/internal/repositories"
	"github.com/RicardoMC310/SaaS-Control-Of-Stock/internal/services/user"
	"github.com/gin-gonic/gin"
)

type userCreateInput struct {
	Name     string `json:"name" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

func UserCreateController(ctx *gin.Context, repo repositories.IUserRepository) {
	var body userCreateInput

	if err := ctx.ShouldBindJSON(&body); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"sucess": false,
			"error":  err.Error(),
		})

		return
	}

	var user entities.User

	user.Name = body.Name
	user.Email = body.Email
	user.Password = body.Password

	userCreateService := services.NewUserCreateService(repo)

	err := userCreateService.Execute(&user)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"sucess": false,
			"error":  err.Error(),
		})

		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"sucess": true,
		"message": "User created with sucess",
	})
}
