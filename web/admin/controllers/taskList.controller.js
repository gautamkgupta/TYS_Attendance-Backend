const express = require('express');
const mongoose = require('mongoose');
const models = require('../../../managers/models');
const { urlencoded } = require('body-parser');


module.exports = {

    //GET Add Education
    getAddTaskList: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            res.render('admin/taskList/add-taskList', {
                title: "TYS",
                user,
                error: "Add New TaskList"
            })
        } catch (err) {
            const user = req.user;
            res.render('admin/taskList/add-taskList', {
                title: "TYS",
                user,
                error: err
            })
        }
    },

    getTaskList: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const TaskList = await models.CustomerModel.TaskList.find().exec()
            // console.log("All TaskList: ", TaskList);
            // console.log("User First Name: ", user.first_name);

            res.render('admin/taskList/all-taskList', {
                title: "TYS",
                user,
                TaskList,
                error: "Add New TaskList"
            })
        } catch (err) {
            const user = req.user;
            res.render('admin/taskList/all-taskList', {
                title: "TYS",
                user,
                error: err
            })
        }
    },

    postAddTaskList: async (req, res) => {
        // const referer = req.get('Referer');
        try {
            const user = req.user;
            if (!user) {
                return res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                });
            }

            const server = req.body;
            // console.log(server);

            const RecordData = new models.CustomerModel.TaskList({
                _id: new mongoose.Types.ObjectId(),
                email: user.email,
                task: server.task,
                status: server.status,
                date: server.date,
                note: server.note,
            });

            console.log("TaskList Data: ", RecordData);
            RecordData.save();

            const successMsg = `${user.first_name} - ${RecordData ? 'Updated' : 'Added'} Successfully`;
            res.redirect(`/admin/taskList/all-taskList?success=${encodeURIComponent(successMsg)}`);

        }
        catch (err) {
            console.error(err);
            const errorMsg = 'An error occurred while adding user';
            res.redirect(`/admin/taskList/add-taskList?error=${encodeURIComponent(err)}`);
        }
    },

    getUpdateTaskList: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const TaskList_id = req.params.TaskList_id;
            const UpdateData = await models.CustomerModel.TaskList.findById(TaskList_id);

            res.render('admin/taskList/edit-taskList', {
                title: "TYS",
                TaskList_id,
                user,
                UpdateData,
                error: "Update TaskList"
            })
        } catch (err) {
            console.log(err)
            res.redirect(`/admin/auth/dashboard?error=${encodeURIComponent(err)}`)
        }
    },

    postUpdateTaskList: async (req, res) => {
        try {
            const user = req.user;
            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const server = req.body;
            const TaskList_id = req.params.TaskList_id;
            console.log("Update TaskList: ", server);
            console.log("TaskList: ", project_id);
            const UpdateRecord = await models.CustomerModel.TaskList.findById(TaskList_id);
            // console.log("Update Record: ", UpdateRecord);

            UpdateRecord.task = server.task;
            UpdateRecord.status = server.status;
            UpdateRecord.date = server.date;
            UpdateRecord.note = server.note;

            await UpdateRecord.save();

            const successMsg = `${user.first_name} -- Updated Successfully`;
            res.redirect(`/admin/taskList/all-taskList?success=${encodeURIComponent(successMsg)}`);
        } catch (err) {
            console.log(err)
            // Redirect to the edit user page with an error message
            console.log("Error: ", err);
            res.redirect(`/admin/taskList/edit-taskList?error=${encodeURIComponent(err)}`);

        }
    },


}

