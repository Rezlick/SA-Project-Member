package controller

import (
   "net/http"
   "github.com/Rezlick/SA_Project_Member/config"
   "github.com/Rezlick/SA_Project_Member/entity"
   "github.com/gin-gonic/gin"
)

func GetPositions(c *gin.Context) {
   var positions []entity.Position
   
   db := config.DB()
   db.Find(&positions)
   c.JSON(http.StatusOK, &positions)
}