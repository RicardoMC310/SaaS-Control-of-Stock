package main

import (
	controllers "github.com/RicardoMC310/SaaS-Control-Of-Stock/cmd/controllers/user"
	"github.com/RicardoMC310/SaaS-Control-Of-Stock/internal/entities"
	"github.com/RicardoMC310/SaaS-Control-Of-Stock/internal/repositories"
	"github.com/gin-gonic/gin"
)

func UserRouter(router *gin.Engine) {
	userRouterGroup := router.Group("/user")

	repo := repositories.NewUserPostgresRepository(&entities.User{})

	userRouterGroup.POST("/", func (ctx *gin.Context) {
		controllers.UserCreateController(ctx, repo)
	})
}