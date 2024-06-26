const express = require('express');
const mongoose = require('mongoose');
const models = require('../../../managers/models');
const { urlencoded } = require('body-parser');


module.exports = {

    //GET Add Address
    getAddAttendance: async (req, res) => {
        try {

            const user = req.user;
            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const userAll = await models.CustomerModel.User.find().exec();

            res.render('admin/attendance/add-attendance', {
                title: "TYS",
                user,
                userAll,
                error: "Add New Attendance"
            })
        } catch (err) {
            const user = req.user;
            res.render('admin/attendance/add-attendance', {
                title: "TYS",
                user,
                error: err
            })
        }
    },

    getAttendanceList: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const Attendance = await models.CustomerModel.Attendance.find().exec()
            // console.log("All Attendance: ", Attendance);

            res.render('admin/attendance/all-attendance', {
                title: "TYS",
                user,
                Attendance,
                error: "Add New Attendance"
            })
        } catch (err) {
            const user = req.user;
            res.render('admin/attendance/all-attendance', {
                title: "TYS",
                user,
                error: err
            })
        }
    },

    postAddAttendance: async (req, res) => {
        const referer = req.get('Referer');
        try {
            const user = req.user;
            if (!user) {
                return res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                });
            }

            const server = req.body;
            console.log(server)

            // Check if the email already exists
            // const CheckDate = await models.CustomerModel.Attendance.findOne({ date: server.date });
            // if (CheckDate) {
            //     const errorMsg = 'Today Attendance Already Completed!..';
            //     res.redirect(`/admin/user/add-user?error=${encodeURIComponent(errorMsg)}`);
            // }

            const UserData = new models.CustomerModel.Attendance({
                _id: new mongoose.Types.ObjectId(),
                email: server.email,
                check_in: server.check_in,
                check_out: server.check_out,
                total_hour: server.total_hour,
                day: server.day,
                date: server.date,
                location: server.location,
                status: server.status,
                holiday: server.holiday,
                comment: server.comment,
            });

            console.log(UserData)
            UserData.save();

            const successMsg = `${user.first_name} - ${UserData ? 'Updated' : 'Added'} Successfully`;
            res.redirect(`/admin/attendance/all-attendance?success=${encodeURIComponent(successMsg)}`);
        }
        catch (err) {
            console.error(err);
            const errorMsg = 'An error occurred while adding user';
            // res.redirect(`/admin/attendance/add-attendance?error=${encodeURIComponent(errorMsg)}`);
            res.redirect(`/admin/attendance/add-attendance?error=${encodeURIComponent(err)}`);
        }
    },

    getUpdateAttendance: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const attendance_id = req.params.attendance_id;
            const UpdateData = await models.CustomerModel.Attendance.findById(attendance_id);
            const Updatedemail = UpdateData.email;

            res.render('admin/attendance/edit-attendance', {
                title: "TYS",
                attendance_id,
                user,
                Updatedemail,
                UpdateData,
                error: "Update Attendance"
            })
        } catch (err) {
            console.log(err)
            res.redirect(`/admin/auth/dashboard?error=${encodeURIComponent(err)}`)
        }
    },

    postUpdateAttendance: async (req, res) => {
        try {
            const user = req.user;
            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const server = req.body;
            const attendance_id = req.params.attendance_id;
            console.log("Update Attendance: ", server);
            console.log("Attendance_id: ", attendance_id);
            const UpdateRecord = await models.CustomerModel.Attendance.findById(attendance_id);

            UpdateRecord.check_in = server.check_in;
            UpdateRecord.check_out = server.check_out;
            UpdateRecord.total_hour = server.total_hour;
            UpdateRecord.day = server.day;
            UpdateRecord.date = server.date;
            UpdateRecord.location = server.location;
            UpdateRecord.status = server.status;
            UpdateRecord.holiday = server.holiday;
            UpdateRecord.comment = server.comment;

            await UpdateRecord.save();

            const successMsg = `${user.first_name} -- Updated Successfully`;
            res.redirect(`/admin/attendance/all-attendance?success=${encodeURIComponent(successMsg)}`);
        } catch (err) {
            console.log(err)
            // Redirect to the edit user page with an error message
            console.log("Error: ", err);
            res.redirect(`/admin/attendance/edit-attendance?error=${encodeURIComponent(err)}`);

        }
    },

    deleteAttendance: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                return res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                });
            }

            const attendance_id = req.params.attendance_id;
            console.log("UserID: ", attendance_id);

            const UserRecord = await models.CustomerModel.Attendance.findByIdAndDelete({ _id: attendance_id });
            console.log("Deleted Record: ", UserRecord);

            const successMsg = `${UserRecord.first_name} -- Deleted Successfully`;
            return res.status(200).json({ success: successMsg });
        } catch (err) {
            console.error(err);
            const errorMsg = err.message || "Internal Server Error";
            return res.status(500).json({ error: errorMsg });
        }
    },

}