// File System module ----------------------------------------------------------------------------------
const fs = require('fs');
const path = require('path');

// MySql database Modal --------------------------------------------------------------------------------
const mysql2 = require('../services/mysql2')
const query = require('../queries/vacationsQueries')

// Img server path
const imgPath = 'images/';
const imgEmptyIcon = 'Folder Empty.ico';

// Multer Upload Form with Image -----------------------------------------------------------------------
var img;
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/' + imgPath);
    },
    filename: function (req, file, cb) {
        img = Date.now() + '-' + file.originalname;
        cb(null, img)
    }
})
var upload = multer({ storage: storage }).single('file');

// -----------------------------------------------------------------------------------------------------
// Vacations Controller 
// -----------------------------------------------------------------------------------------------------
class VacationsController {

    static async getAll(req, res, next) {
        try {

            const { userID } = req.params
            const [followedVacations] = await mysql2.execute(query.getFollowedVacations(), [imgPath, true, userID])
            const [unFollowedVacations] = await mysql2.execute(query.getUnFollowedVacations(), [imgPath, false, userID])
            const vacations = [...followedVacations, ...unFollowedVacations];

            res.json({ ststus: 'ok', title: 'GET all vacations.', vacations });

        } catch (error) {
            console.log(error);
            res.json({ ststus: 'error', title: 'GET all vacations.', vacations: [] });
        }
    }
    static async getFollowdvacationsForReports(req, res, next) {
        try {
            const [followedVavations] = await mysql2.execute(query.getFollowdvacationsForReports())
            res.json({ ststus: 'ok', title: 'GET only followed vacations.', followedVavations });
        } catch (error) {
            console.log(error);
            res.json({ ststus: 'error', title: 'GET only followed vacations.', followedVavations: [] });
        }
    }
    static async getSingleVacation(req, res, next) {
        try {
            const { id } = req.params
            const [single] = await mysql2.execute(query.getSingleVacation(), [imgPath, id])
            res.json({ ststus: 'ok', title: 'GET single vacation.', single });
        } catch (error) {
            console.log(error);
            res.json({ ststus: 'error', title: 'GET single vacation.', single: {} });
        }
    }
    static add(req, res, next) {
        try {
            img = imgEmptyIcon;
            upload(req, res, async function (err) {
                try {
                    const { place, description, dateFrom, dateTo, price } = req.body

                    if (err instanceof multer.MulterError) {
                        return res.status(500).json(err)
                    } else if (err) {
                        return res.status(500).json(err)
                    }
                    if (img == "undefined") { img = imgEmptyIcon }

                    const [result] = await mysql2.execute(query.addNewVacation(), [description, place, img, dateFrom, dateTo, price])
                    const id = result.insertId
                    const [response] = await mysql2.execute(query.getSingleVacation(), [imgPath, id])
                    const [vacation] = response

                    return res.status(200).json({ title: 'Add successfully', vacation, status: 'ok' });
                } catch (error) {
                    console.log(error);
                    return res.status(200).json({ title: 'Add error.', res: {}, status: 'err' });
                }
            })
        } catch (error) {
            console.log(error);
            res.json({ ststus: 'error', title: 'Add vacation.', });
        }
    }
    static update(req, res, next) {
        try {
            img = imgEmptyIcon;

            upload(req, res, async function (err) {
                try {
                    const { id, place, description, dateFrom, dateTo, price } = req.body
                    const time = new Date().toJSON().slice(0, 19).replace('T', ' ');

                    // Delete Old Img
                    const [rows] = await mysql2.execute(query.getVacationImg(), [id])
                    deleteOldImgFromServer(rows[0].img, imgEmptyIcon, imgPath)

                    if (err instanceof multer.MulterError) {
                        return res.status(500).json(err)
                    } else if (err) {
                        return res.status(500).json(err)
                    }
                    // undefined - Blank Field - Delete Image 
                    if (img == "undefined") { img = imgEmptyIcon }

                    await mysql2.execute(query.updateVacation(), [description, place, img, dateFrom, dateTo, price, time, id])
                    const [response] = await mysql2.execute(query.getSingleVacation(), [imgPath, id])
                    const [vacation] = response

                    return res.status(200).json({ status: 'ok', title: 'Updated successfully.', vacation });
                } catch (error) {
                    console.log(error);
                    return res.status(200).json({ status: 'error', title: 'Updated error.', res: {} });
                }
            })
        } catch (error) {
            console.log(error);
            res.json({ ststus: 'error', title: 'Update vacation.', });
        }
    }
    static async delete(req, res, next) {
        try {
            const { id } = req.params;

            // Delete Old Img
            const [rows] = await mysql2.execute(query.getVacationImg(), [id])
            deleteOldImgFromServer(rows[0].img, imgEmptyIcon, imgPath)

            // Delete from mysql Tables
            await mysql2.execute(query.deleteFromVacations(), [id])
            const [delFollowers] = await mysql2.execute(query.deleteFromfollowers(), [id])

            res.json({ status: 'ok', title: 'DELETE vacation.', deletedFollowers: delFollowers.affectedRows });
        } catch (error) {
            console.log(error);
            res.json({ status: 'error', title: 'DELETE vacation.', deletedFollowers: null });
        }
    }
}

function deleteOldImgFromServer(oldImg, imgEmptyIcon, imgPath) {
    try {
        if (oldImg !== imgEmptyIcon) {
            fs.unlinkSync(path.join("public", imgPath + oldImg))
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = VacationsController;
