class Query {
    static getFollowedVacations() {
        return `
            SELECT DISTINCT vacation.id, vacation.place, vacation.description, 
                    vacation.dateFrom, vacation.dateTo, vacation.price, 
                    CONCAT( ? , vacation.img) AS img, ? as followed, 
                    (SELECT count(*) from followers where vacationID = vacation.id) AS followersCount
            FROM 
                vacation 
            LEFT JOIN 
                followers
            ON 
                vacation.id = followers.vacationID
            WHERE 
                followers.userID = ? `
    }
    static getUnFollowedVacations() {
        return `
            SELECT DISTINCT vacation.id, vacation.place, vacation.description, 
                    vacation.dateFrom, vacation.dateTo, vacation.price, 
                    CONCAT( ? , vacation.img) AS img, ? as followed, 
                    (SELECT count(*) from followers where vacationID = vacation.id) AS followersCount
            FROM 
                vacation 
            where 
                vacation.id not in (
                    SELECT DISTINCT 
                        vacation.id
                    FROM 
                        vacation 
                    LEFT JOIN 
                        followers
                    ON 
                        vacation.id = followers.vacationID
                    WHERE 
                        followers.userID = ? )`
    }
    static getFollowdvacationsForReports() {
        return `
            SELECT 
                COUNT(userID) AS followersCount, vacationID as ID
            FROM
                VacationDB.followers
            GROUP BY vacationID `
    }
    static getSingleVacation() {
        return `
            SELECT 
                vacation.id, vacation.place, vacation.description, 
                vacation.dateFrom, vacation.dateTo, vacation.price, 
                CONCAT( ? , vacation.img) AS img 
            FROM 
                vacation 
            WHERE 
                id = ? `
    }
    static addNewVacation() {
        return `
            INSERT INTO 
                vacation (description, place, img, dateFrom, dateTo, price) 
                VALUES ( ? , ? , ? , ? , ? , ? )`
    }
    static updateVacation() {
        return `
            UPDATE vacation 
                SET description = ? , place = ? , img = ? , dateFrom = ? , 
                    dateTo = ? , price = ? , updateDate = ? 
                WHERE id = ? `
    }
    static getVacationImg() { return `SELECT img FROM vacation WHERE id = ? ` }
    static deleteFromVacations() { return `DELETE FROM vacation WHERE id = ? ` }
    static deleteFromfollowers() { return `DELETE FROM followers WHERE vacationID = ? ` }
}

module.exports = Query;