package entity

import(
	"gorm.io/gorm"
) 

type Level struct{
	gorm.Model
	Point 		int	`json:"point"`

	// FK from Rank
	RankID		*uint	
	Rank		Rank	`gorm:"foreignKey: rank_id"`

}