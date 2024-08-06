package entity

import(
	"gorm.io/gorm"
) 

type Rank struct{
	gorm.Model
	RankName 	string	`json:"rank_name"`
	Discount	float32	`json:"discount"`
}