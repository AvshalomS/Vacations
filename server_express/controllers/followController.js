// MySql database Modal --------------------------------------------------------------------------------
const mysql2 = require('../services/mysql2')
const query = require('../queries/followersQueries')
// -----------------------------------------------------------------------------------------------------
// Follow Controller 
// -----------------------------------------------------------------------------------------------------
class FollowController {

    static async updateFollowerStatus(userId, vacationId) {
        try {
            // Get followers count and user follow status
            const [rows] = await mysql2.execute(query.getFollowersCount(), [vacationId])
            const { followersCount } = rows[0]
            const [isFollowed] = await mysql2.execute(query.checkFollowersStatus(), [userId, vacationId])

            if (!isFollowed.length) {
                mysql2.execute(query.insertFollow(), [userId, vacationId])
                return ({ ststus: 'ok', title: `user ${userId} follow y/n vacation ${vacationId}`, userId, vacationId, followed: true, followersCount: followersCount + 1 });
            } else {
                mysql2.execute(query.deleteFollow(), [userId, vacationId])
                return ({ ststus: 'ok', title: `user ${userId} follow y/n vacation ${vacationId}`, userId, vacationId, followed: false, followersCount: followersCount - 1 });
            }
        } catch (error) {
            console.log(error);
            return ({ ststus: 'error', title: `user ${userId} follow y/n vacation ${vacationId}`, userId: null, vacationId: null, followed: null, followersCount: null });
        }
    }
}

module.exports = FollowController;