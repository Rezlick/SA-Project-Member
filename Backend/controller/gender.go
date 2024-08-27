package controller

import (
   "net/http"
   "github.com/Rezlick/SA_Project_Member/config"
   "github.com/Rezlick/SA_Project_Member/entity"
   "github.com/gin-gonic/gin"
)

func GetGenders(c *gin.Context) {
   var genders []entity.Gender

   db := config.DB()
   db.Find(&genders)
   c.JSON(http.StatusOK, &genders)
}