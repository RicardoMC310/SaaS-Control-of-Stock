package main

import (
	authControllers "github.com/RicardoMC310/SaaS-Control-Of-Stock/cmd/controllers/AuthControllers"
	controllers "github.com/RicardoMC310/SaaS-Control-Of-Stock/cmd/controllers/userControllers"
	"github.com/RicardoMC310/SaaS-Control-Of-Stock/internal/entities"
	"github.com/RicardoMC310/SaaS-Control-Of-Stock/internal/repositories"
	"github.com/gin-gonic/gin"
)

func UserRouter(router *gin.Engine) {
	userRouterGroup := router.Group("/user")

	repo := repositories.NewUserPostgresRepository(&entities.User{})

	userRouterGroup.POST("/", func(ctx *gin.Context) {
		controllers.UserCreateController(ctx, repo)
	})

	userRouterGroup.POST("/findByEmail", func(ctx *gin.Context) {
		controllers.UserFindByEmailController(ctx, repo)
	})
}

func AuthRouter(router *gin.Engine) {
	authRouterGroup := router.Group("/auth")

	repo := repositories.NewUserPostgresRepository(&entities.User{})

	authRouterGroup.POST("/login", func(ctx *gin.Context) {
		authControllers.AuthLoginController(ctx, repo)
	})
}
