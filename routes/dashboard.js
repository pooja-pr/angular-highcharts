var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;


/* Get aggregated data. */
router.post('/branch', getGraphDataForBranch);
router.post('/user', getGraphDataForEmpId);

function getGraphDataForBranch(req, res, next) {
    MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
        var db = client.db('ikf');
        var matchConditions = {};
        var and_clauses = [];
        console.log('request..', req.body);
        if (req.body.enqAmount && (req.body.enqAmount).length > 0) {
            and_clauses.push({ enqAmount: req.body.enqAmount });
        }
        if (req.body.enqPurpose && (req.body.enqPurpose).length > 0) {
            and_clauses.push({ enqPurpose: req.body.enqPurpose });
        }
        if (req.body.scoreType && (req.body.scoreType).length > 0) {
            and_clauses.push({ scoreType: req.body.scoreType });
        }
        if (req.body.from && req.body.to) {
            and_clauses.push({ createdAt: { "$lte": req.body.from, "$gte": req.body.to } })
        }
        if (and_clauses.length > 0) {
            matchConditions['$and'] = and_clauses;
        }
        console.log('match condition', matchConditions)
        var cursor = db.collection('Cibil').aggregate([{
            $match: matchConditions
        }, {
            $group: { _id: '$customer.branch', count: { $sum: 1 } }
        }], { cursor: {} });

        cursor.toArray((err, data) => {
            var arr = [];
            console.log(err);
            if (data) {
                data.forEach(function (item) {
                    arr.push({ "name": item._id, "y": item.count });
                });
                res.json({ error: false, data: arr, message: "Success" });
            } else {
                res.json({ error: true, message: "No data found" })
            }
        });

    });
};

function getGraphDataForEmpId(req, res, next) {
    MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
        var db = client.db('ikf');
        var matchConditions = {};
        var and_clauses = [];
        if (req.body.enqAmount && (req.body.enqAmount).length > 0) {
            and_clauses.push({ enqAmount: { $in: req.body.enqAmount } });
        }
        if (req.body.enqPurpose && (req.body.enqPurpose).length > 0) {
            and_clauses.push({ enqPurpose: { $in: req.body.enqPurpose } });
        }
        if (req.body.scoreType && (req.body.scoreType).length > 0) {
            and_clauses.push({ scoreType: { $in: req.body.scoreType } });
        }
        if (req.body.from && req.body.to) {
            and_clauses.push({ createdAt: { "$lte": req.body.from, "$gte": req.body.to } })
        }
        if (and_clauses.length > 0) {
            matchConditions['$and'] = and_clauses;
        }
        var cursor = db.collection('Cibil').aggregate([{
            $match: matchConditions
        }, {
            $group: { _id: '$customer.userId', count: { $sum: 1 } }
        }], { cursor: {} })
        cursor.toArray((err, data) => {
            var arr = []
            data.forEach(function (item) {
                arr.push({ "name": item._id, "y": item.count });
            });
            res.json({ error: false, data: arr, message: "Success" });
        });
    });
};

module.exports = router;