package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/RicardoMC310/SaaS-Control-Of-Stock/utils"
	"github.com/gin-gonic/gin"
)

func main() {
	os.Setenv("DEVELOPMENT", "TRUE")

	router := gin.Default()

	router.GET("/healthy", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"sucess": true, "message": "API response correctly"})
	})

	UserRouter(router)
	AuthRouter(router)

	port, err := utils.GetEnv("PORT")
	if err != nil || port == "" {
		port = "8080"
	}

	router.Run(fmt.Sprintf(":%s", port))
}
