package main

import (
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/RicardoMC310/SaaS-Control-Of-Stock/utils"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	os.Setenv("DEVELOPMENT", "TRUE")

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "DELETE", "PUT", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	router.OPTIONS("/*path", func(c *gin.Context) {
		c.Status(http.StatusOK)
	})

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
