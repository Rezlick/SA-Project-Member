package entity

import(
	"gorm.io/gorm"
) 

type Rank struct{
	gorm.Model
	RankName 	string		`json:"rank_name"`
	Discount	float32		`json:"discount"`

	Member 		[]Member 	`gorm:"foreignKey:rank_id"`
	Level 		[]Level		`gorm:"foreignKey:rank_id"`
}