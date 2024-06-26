const router = require('express').Router();
const AuthRoutes = require('./auth.route');
const UserRoutes = require('./user.routes');
const AddressRoutes = require('./address.routes');
const PersonalRoutes = require('./personal.routes');
const FamilyRoutes = require('./family.routes');
const AttendanceRoutes = require('./attendance.routes');
const ProfessionalRoutes = require('./professional.routes');
const WorkExperienceRoutes = require('./workExperience.routes');
const EducationRoutes = require('./education.routes');
const ProjectRoutes = require('./project.routes');
const BankRoutes = require('./bank.routes');
const TaskListRoutes = require('./taskList.routes');
const TimeSheetRoutes = require('./timeSheet.routes');
const RegularizationRoutes = require('./regularization.routes');

router.use('/auth', AuthRoutes);
router.use('/user', UserRoutes);
router.use('/address', AddressRoutes);
router.use('/personal', PersonalRoutes);
router.use('/family', FamilyRoutes);
router.use('/attendance', AttendanceRoutes);
router.use('/professional', ProfessionalRoutes);
router.use('/work', WorkExperienceRoutes);
router.use('/education', EducationRoutes);
router.use('/project', ProjectRoutes);
router.use('/bank', BankRoutes);
router.use('/taskList', TaskListRoutes);
router.use('/timeSheet', TimeSheetRoutes);
router.use('/regularization', RegularizationRoutes);

module.exports = router;