package controller

import (
	"net/http"
	"github.com/Rezlick/SA_Project_Member/config"
	"github.com/Rezlick/SA_Project_Member/entity"
	"github.com/gin-gonic/gin"
)

func GetReceipts(c *gin.Context){
	var receipts []entity.Receipt
	db := config.DB()
	
	results := db.Preload("Member").
	Preload("Employee").
	Find(&receipts)
	if results.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        return
    }
	c.JSON(http.StatusOK, &receipts)
}