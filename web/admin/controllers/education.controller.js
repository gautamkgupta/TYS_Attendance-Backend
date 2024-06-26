const express = require('express');
const mongoose = require('mongoose');
const models = require('../../../managers/models');
const { urlencoded } = require('body-parser');


module.exports = {

    //GET Add Education
    getAddEducation: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const userAll = await models.CustomerModel.User.find().exec();

            res.render('admin/education/add-education', {
                title: "TYS",
                user,
                userAll,
                error: "Add New Education"
            })
        } catch (err) {
            const user = req.user;
            res.render('admin/education/add-education', {
                title: "TYS",
                user,
                error: err
            })
        }
    },

    getEducationList: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const Education = await models.CustomerModel.Education.find().exec()
            console.log("All WorkExperience: ", Education);
            console.log("User First Name: ", user.first_name);

            res.render('admin/education/all-education', {
                title: "TYS",
                user,
                Education,
                error: "Add New Education"
            })
        } catch (err) {
            const user = req.user;
            res.render('admin/education/all-education', {
                title: "TYS",
                user,
                error: err
            })
        }
    },

    postAddEducation: async (req, res) => {
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

            const EducationData = new models.CustomerModel.Education({
                _id: new mongoose.Types.ObjectId(),
                email: server.email,
                university_name: server.university_name,
                course_name: server.course_name,
                desc: server.desc,
                start_date: server.start_date,
                end_date: server.end_date,
            });

            console.log("Education Data: ", EducationData)
            EducationData.save();

            const successMsg = `${user.first_name} - ${EducationData ? 'Updated' : 'Added'} Successfully`;
            res.redirect(`/admin/education/all-education?success=${encodeURIComponent(successMsg)}`);

        }
        catch (err) {
            console.error(err);
            const errorMsg = 'An error occurred while adding user';
            res.redirect(`/admin/education/add-education?error=${encodeURIComponent(err)}`);
        }
    },

    getUpdateEducation: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const education_id = req.params.education_id;
            const UpdateData = await models.CustomerModel.Education.findById(education_id);
            const Updatedemail = UpdateData.email;

            res.render('admin/education/edit-education', {
                title: "TYS",
                education_id,
                user,
                Updatedemail,
                UpdateData,
                error: "Update Education"
            })
        } catch (err) {
            console.log(err)
            res.redirect(`/admin/auth/dashboard?error=${encodeURIComponent(err)}`)
        }
    },

    postUpdateEducation: async (req, res) => {
        try {
            const user = req.user;
            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const server = req.body;
            const education_id = req.params.education_id;
            console.log("Update Education: ", server);
            console.log("Education: ", education_id);
            const UpdateRecord = await models.CustomerModel.Education.findById(education_id);
            // console.log("Update Record: ", UpdateRecord);

            UpdateRecord.university_name = server.university_name;
            UpdateRecord.course_name = server.course_name;
            UpdateRecord.desc = server.desc;
            UpdateRecord.start_date = server.start_date;
            UpdateRecord.end_date = server.end_date;

            await UpdateRecord.save();

            const successMsg = `${user.first_name} -- Updated Successfully`;
            res.redirect(`/admin/education/all-education?success=${encodeURIComponent(successMsg)}`);
        } catch (err) {
            // console.log(err)
            // Redirect to the edit user page with an error message
            console.log("Error: ", err);
            res.redirect(`/admin/education/edit-education?error=${encodeURIComponent(err)}`);

        }
    },

    deleteEducation: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                return res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                });
            }

            const education_id = req.params.education_id;
            console.log("ID: ", education_id);

            const UserRecord = await models.CustomerModel.Education.findByIdAndDelete({ _id: education_id });
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

