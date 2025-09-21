package main

import (
	"fmt"

	"github.com/RicardoMC310/SaaS-Control-Of-Stock/utils"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	
	port := utils.GetEnv("PORT")
	router.Run(fmt.Sprintf(":%s", port))
}