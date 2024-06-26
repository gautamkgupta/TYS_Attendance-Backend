const router = require('express').Router();
const models = require('../../../managers/models');
const mongoose = require('mongoose');

module.exports = {
    getTaskList: async (req, res) => {
        try {
            const record = await models.CustomerModel.TaskList.find();
            console.log(record);
            return res.status(200).json({
                message: "All TaskList Record!..",
                Data: record
            });
        }
        catch (err) {
            console.log(err);
            return res.json({
                message: "Error",
                Error: err,
            })
        }
    },

    postTaskList: async (req, res) => {
        try {

            const NewRecord = new models.CustomerModel.TaskList({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                task: req.body.task,
                note: req.body.note,
                date: req.body.date,
                status: req.body.status,
            });

            NewRecord.save().then(data => {
                console.log(data);
                res.status(200).json({
                    message: "New TaskList Record!..",
                    Data: data
                });
            })

        }
        catch (err) {
            console.log(err);
            return res.json({
                message: "Error",
                Error: err,
            })
        }
    },
}