package config

import (
   "fmt"
   "github.com/Rezlick/SA_Project_Member/entity"
   "gorm.io/driver/sqlite"
   "gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
   return db
}

func ConnectionDB() {
   database, err := gorm.Open(sqlite.Open("Member.db?cache=shared"), &gorm.Config{})
   if err != nil {
       panic("failed to connect database")
   }
   fmt.Println("connected database")
   db = database
}

func SetupDatabase() {
	db.AutoMigrate(
		&entity.Member{},
		&entity.Employee{},
		&entity.Gender{},
		&entity.Rank{},
		&entity.Position{},
	)

   GenderMale := entity.Gender{Name: "Male"}
   GenderFemale := entity.Gender{Name: "Female"}

   PositionAdmin := entity.Position{Name: "Admin"}
   PositionManager := entity.Position{Name: "Manager"}

   RankBronze := entity.Rank{Name: "Bronze", Discount: 0.03}
   RankSilver := entity.Rank{Name: "Silver", Discount: 0.05}
   RankGold := entity.Rank{Name: "Gold", Discount: 0.07}

   db.FirstOrCreate(&RankBronze, &entity.Rank{Name: "Bronze", Discount: 0.03})
   db.FirstOrCreate(&RankSilver, &entity.Rank{Name: "Silver", Discount: 0.05})
   db.FirstOrCreate(&RankGold, &entity.Rank{Name: "Gold", Discount: 0.07})

   db.FirstOrCreate(&GenderMale, &entity.Gender{Name: "Male"})
   db.FirstOrCreate(&GenderFemale, &entity.Gender{Name: "Female"})

   db.FirstOrCreate(&PositionAdmin, &entity.Position{Name: "Admin"})
   db.FirstOrCreate(&PositionManager, &entity.Position{Name: "Manger"})

   hashedPassword, _ := HashPassword("12345")

   employee := &entity.Employee{
       FirstName: "Test",
       LastName:  "Admin",
       Email:  "admin@shabubuu.com",
       Password:  hashedPassword,
       GenderID: 1,
	    PositionID: 1,
   }

   db.FirstOrCreate(employee, &entity.Employee{
       Email: "admin@shabubuu.com",
   })
}