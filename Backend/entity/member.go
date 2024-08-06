package entity

import(
	"time"
	"gorm.io/gorm"
) 

type Member struct{
	MemberID  	string 			`gorm:"primarykey" json:"member_id"`
	FirstName	string			`json:"first_name"`
	Lastname	string			`json:"last_name"`
	PhoneNumber	string			`json:"phone_number"`
	Point 		int			`json:"point"`
	RegiterDate	time.Time 		`json:"register_date"`

	// FK from Rank
	RankID		uint			`json:"rank_id"`
	Rank		*Rank			`gorm:"foreignKey: rank_id" json:"rank"`
	
	// FK from Employee
	EmployeeID	*string			
	Employee	*Employee		`gorm:"foreignKey: employee_id" json:"employee"`

	CreatedAt 	time.Time
	UpdatedAt 	time.Time
	DeletedAt 	gorm.DeletedAt 		`gorm:"index"`
}