package controller

import (

   "net/http"
   "github.com/gin-gonic/gin"
   "golang.org/x/crypto/bcrypt"

   "github.com/Rezlick/SA_Project_Member/config"
   "github.com/Rezlick/SA_Project_Member/entity"
   "github.com/Rezlick/SA_Project_Member/services"
)

type (
   Authen struct {
       Email string 
       Password string 
   }
)

func SignIn(c *gin.Context) {
   var payload Authen
   var employee entity.Employee

   if err := c.ShouldBindJSON(&payload); err != nil {
       c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
       return
   }

   // ค้นหา user ด้วย Username ที่ผู้ใช้กรอกเข้ามา
   if err := config.DB().Raw("SELECT * FROM employees WHERE email = ?", payload.Email).Scan(&employee).Error; err != nil {
       c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
       return
   }

   // ตรวจสอบรหัสผ่าน
   err := bcrypt.CompareHashAndPassword([]byte(employee.Password), []byte(payload.Password))
   if err != nil {
       c.JSON(http.StatusBadRequest, gin.H{"error": "password is incerrect"})
       return
   }

   jwtWrapper := services.JwtWrapper{
       SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
       Issuer:          "AuthService",
       ExpirationHours: 24,
   }

   signedToken, err := jwtWrapper.GenerateToken(employee.Email)
   if err != nil {
       c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
       return
   }
   c.JSON(http.StatusOK, gin.H{"token_type": "Bearer", "token": signedToken, "id": employee.ID})
}