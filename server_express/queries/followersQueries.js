const query = {
    getFollowersCount: () => `SELECT count(*) AS followersCount from followers where vacationID = ? `,
    checkFollowersStatus: () => `SELECT * FROM followers WHERE userID = ? AND vacationID = ? `,
    insertFollow: () => `INSERT INTO followers (userID , vacationID) VALUES( ? , ? ) `,
    deleteFollow: () => `DELETE FROM followers WHERE userID = ? AND vacationID = ? `,
}
module.exports = query;