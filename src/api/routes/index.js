const express = require('express');
const router = express.Router();

const AdminRoute = require('./admin.routes');
const userRoute = require('./user.routes');
const familyRoute = require('./family.routes');
const attendanceRoute = require('./attendance.routes');
const educationRoute = require('./education.routes');
const professionalRoute = require('./professional.routes');
const TaskListRoute = require('./taskList.routes');
const TimeSheetRoute = require('./timeSheet.routes');
const RegularizationRoute = require('./regularization.routes');
const LeaveStatusRoute = require('./leaveStatus.routes');
const ProjectRoute = require('./project.routes');
const PersonalRoute = require('./personal.routes');
const WorkRoute = require('./workExperience.routes');
const BankRoute = require('./bank.routes');

router.use('/user', userRoute);
router.use('/admin', AdminRoute);
router.use('/family', familyRoute);
router.use('/attendance', attendanceRoute);
router.use('/education', educationRoute);
router.use('/professional', professionalRoute);
router.use('/taskList', TaskListRoute);
router.use('/timeSheet', TimeSheetRoute);
router.use('/regularization', RegularizationRoute);
router.use('/leaveStatus', LeaveStatusRoute);
router.use('/project', ProjectRoute);
router.use('/personal', PersonalRoute);
router.use('/work', WorkRoute);
router.use('/bank', BankRoute);

module.exports = router;