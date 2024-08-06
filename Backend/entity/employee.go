package entity

import(
	"time"
	"gorm.io/gorm"
) 

type Employee struct{
	EmployeeID   	string 		`gorm:"primarykey" json:"employee_id"`
	FirstName	string		`json:"first_name"`
	LastName	string		`json:"last_name"`
	Username	string		`json:"username"`
	Password	string		`json:"password"`
	RegiterDate	time.Time	`json:"register_date"`

	// FK from Position
	PositionID	*uint
	Position	Position 	`gorm:"foreignKey: position_id"`

	// FK from Gender
	GenderID	*uint
	Gender		Gender 		`gorm:"foreignKey: gender_id"`

	CreatedAt 	time.Time
	UpdatedAt 	time.Time
	DeletedAt 	gorm.DeletedAt 	`gorm:"index"`
}