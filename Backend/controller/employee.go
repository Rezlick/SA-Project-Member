package controller

import (
	"net/http"
	"github.com/Rezlick/SA_Project_Member/config"
	"github.com/Rezlick/SA_Project_Member/entity"
	"github.com/gin-gonic/gin"
)

func CreateEmployee(c *gin.Context) {
    var employee entity.Employee
    
    // bind เข้าตัวแปร employee
    if err := c.ShouldBindJSON(&employee); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    db := config.DB()

    // ค้นหา gender ด้วย id
	var gender entity.Gender
	db.First(&gender, employee.GenderID)
	if gender.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "gender not found"})
		return
	}

    // ค้นหา position ด้วย id
    var position entity.Position
	db.First(&position, employee.PositionID)
	if position.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "position not found"})
		return
	}

    hashedPassword, _ := config.HashPassword(employee.Password)

	// สร้าง Employee
	e := entity.Employee{
		FirstName:  employee.FirstName, 
		LastName:   employee.LastName,  
		Email:      employee.Email,     
		Password:   hashedPassword,
		GenderID:   employee.GenderID,
		Gender:     gender,
        PositionID: employee.PositionID,
        Position:   position,
	}

    if err := db.Create(&e).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusCreated, gin.H{"message": "ลงทะเบียนพนักงานสำเร็จ"})
}

func GetEmployees(c *gin.Context) {
   var employees []entity.Employee

   db := config.DB()
   results := db.Preload("Gender").Preload("Position").Find(&employees)
   if results.Error != nil {
       c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
       return
   }
   c.JSON(http.StatusOK, employees)
}

func GetEmployeeByID(c *gin.Context) {
   ID := c.Param("id")
   var employee entity.Employee

   db := config.DB()
   results := db.Preload("Gender").Preload("Position").First(&employee, ID)
   if results.Error != nil {
       c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
       return
   }

   if employee.ID == 0 {
       c.JSON(http.StatusNoContent, gin.H{})
       return
   }
   c.JSON(http.StatusOK, employee)
}

func UpdateEmployee(c *gin.Context) {
   var employee entity.Employee
   employeeID := c.Param("id")

   db := config.DB()
   result := db.First(&employee, employeeID)
   if result.Error != nil {
       c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
       return
   }

   if err := c.ShouldBindJSON(&employee); err != nil {
       c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
       return
   }

   result = db.Save(&employee)
   if result.Error != nil {
       c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
       return
   }

   c.JSON(http.StatusOK, gin.H{"message": "แก้ไขข้อมูลสำเร็จ"})
}

func DeleteEmployee(c *gin.Context) {
   id := c.Param("id")

   db := config.DB()
   if tx := db.Exec("DELETE FROM employees WHERE id = ?", id); tx.RowsAffected == 0 {
       c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
       return
   }
   c.JSON(http.StatusOK, gin.H{"message": "ลบข้อมูลสำเร็จ"})
}