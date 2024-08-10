package entity

import(
	"gorm.io/gorm"
) 

type Employee struct{
	gorm.Model
	FirstName		string		
	LastName		string		
	Username		string		
	Password		string		

	// FK from Gender
	GenderID		*uint
	Gender			Gender 		`gorm:"foreignKey: gender_id"`
	// FK from Position
	PositionID		*uint
	Position		Position 	`gorm:"foreignKey: position_id"`
}