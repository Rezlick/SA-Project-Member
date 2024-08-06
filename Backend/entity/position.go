package entity

import(
	"gorm.io/gorm"
) 

type Position struct{
	gorm.Model
	PositionName 		string		`json:"position_name"`

	Employee 		[]Employee 	`gorm:"foreignKey:position_id"`
}