package controller

import (
   "net/http"
   "github.com/Rezlick/SA_Project_Member/config"
   "github.com/Rezlick/SA_Project_Member/entity"
   "github.com/gin-gonic/gin"
)

func GetRanks(c *gin.Context) {
   var ranks []entity.Rank

   db := config.DB()
   db.Find(&ranks)
   c.JSON(http.StatusOK, &ranks)
}