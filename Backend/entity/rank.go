package entity

import(
	"gorm.io/gorm"
) 

type Rank struct{
	gorm.Model
	Name 		string		
	Discount	float64	

	Members 		[]Member 		`gorm:"foreignKey:rank_id"`
}