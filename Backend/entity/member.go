package entity

import(
	"gorm.io/gorm"
) 

type Member struct{
	gorm.Model
	FirstName		string			
	LastName		string			
	PhoneNumber		string		
	Point 			int	

	// FK from Rank
	RankID			uint
	Rank			Rank		`gorm:"foreignKey: rank_id"`
	// FK from Employee
	EmployeeID		uint		
	Employee		Employee	`gorm:"foreignKey: employee_id"`
}

func (m *Member) BeforeUpdate(tx *gorm.DB) (err error) {
    // Fetch the current rank
    var currentRank Rank
    if err := tx.First(&currentRank, m.RankID).Error; err != nil {
        return err
    }

    // Check if points exceed the current rank's PointToUpgrade
    if m.Point >= currentRank.PointToUpgrade {
        // Find the next rank
        var nextRank Rank
        if err := tx.Where("point_to_upgrade > ?", currentRank.PointToUpgrade).
            Order("point_to_upgrade ASC").
            First(&nextRank).Error; err != nil {
            if err == gorm.ErrRecordNotFound {
                // No higher rank found, member is at the highest rank
                return nil
            }
            return err
        }

        // Update the member's rank and adjust points
        m.RankID = nextRank.ID
        m.Point -= currentRank.PointToUpgrade

        // If points still exceed the new rank's PointToUpgrade, recursively call BeforeUpdate
        if m.Point >= nextRank.PointToUpgrade {
            return m.BeforeUpdate(tx)
        }
    }

    return nil
}