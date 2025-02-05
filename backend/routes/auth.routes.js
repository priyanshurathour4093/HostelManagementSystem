const express = require('express');
const { signUp, login, logout, emailVerification, otpcheck, forgotpassword, ResetPassword, uploadProfile, fetchUserProfile } = require('../controllers/auth.controller');
const Complaint = require('./complaintRoute');
const menu = require('../controllers/Messmenu');
const { getMenu, handletRebate } = require('../controllers/GetMenu');
const { getallhostels, addHostel, gethostel } = require('../controllers/Hostelscontroller'); // Import getallhostels directly
const createAnnouncement = require('../controllers/CreateAnnouncement');
const getAnnouncements = require('../controllers/GetAnnouncement');
const getStudent = require('../controllers/GetStudent');
const updateStudent = require('../controllers/UpdateStudent');
const createMessage = require('../controllers/SendMessage');
const getGroupMessage = require('../controllers/GetGroupMessage');
const createGroup = require('../controllers/CreateGroup');
const {getGroups, getusergroup} = require('../controllers/GetGroup');
const getComplaint = require('../controllers/GetComplaints');
const createWorker = require('../controllers/CreateWorker');
const getWorker = require('../controllers/GetWorkers');
const { braintreeTokenController, braintreePaymentController, formTransaction } = require('../controllers/payment');
const updateUserPaid = require('../controllers/UpdateUserPaid');
const createAccount = require('../controllers/CreateAccount');
const getUserDues = require('../controllers/GetUserDues');
const updateUserDues = require('../controllers/UpdateUserDues');
const getTransactions = require('../controllers/GetTransaction');
const {getTransactionshostel,getTransactionscfhostel} = require('../controllers/GetTransactionHostel');
const updateTransactionStatus = require('../controllers/ChangeStatusTransaction');
const getHostelAccount = require('../controllers/GetHostelAccount');
const getStudentroom = require('../controllers/GetStudentRoom');
const joinGroup = require('../controllers/JoinGroup');
const { uploadMiddleware } = require('../controllers/uploadMiddleware');

const multer = require("multer");
const getStudentsAccounts = require('../controllers/GetStudentsAccounts');
// const { uploadMiddleware } = require("../controllers/uploadMiddleware");
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();
router.post("/emailverification", emailVerification);
router.post("/reset-password", ResetPassword);
router.post("/otpcheck", otpcheck);
router.post("/profileupload", upload.single("profile"), uploadMiddleware,uploadProfile)

router.get("/profile/:userId", fetchUserProfile);

router.post("/signup",signUp);
router.post("/forgotpassword",forgotpassword);
router.post("/login", login);
router.post("/logout", logout);
router.post("/complaint", Complaint);
router.get("/getallcomplaints", getComplaint.getAllComplaint);
router.post("/getcomplaint", getComplaint.getComplaint);
router.post("/setmenu", menu);
router.post("/getmenu", getMenu);
router.post("/rebate", handletRebate);
router.post("/addhostel", addHostel);
router.post("/createworker", createWorker);
router.post("/getworker", getWorker);
router.get("/getallstudent", getStudent);
router.put("/updateStudent", updateStudent);
router.post("/createannouncement", createAnnouncement);
router.post('/getannouncements', getAnnouncements);
router.post('/send', createMessage);
router.post('/createGroup', createGroup);
router.post('/userpaid', updateUserPaid);
router.get('/getgroup', getGroups);
router.get('/getusergroups/:user_id', getusergroup);
router.get('/getstudentsaccounts/:hostel_no',getStudentsAccounts);
router.post('/joingroup',joinGroup);
router.post('/formtransaction', formTransaction);
router.post('/updatetransactionstatus',updateTransactionStatus);
router.get('/gettransactionshostel/:hostel_no', getTransactionshostel);
router.get('/gettransactionshostel', getTransactionscfhostel);
router.get('/transactions/:user_id', getTransactions);
router.post('/roomNumber',getStudentroom);
router.get('/gethostelaccount/:hostel_no', getHostelAccount);
router.post('/createaccount', createAccount);
router.get('/getgroupmessages/:group_id', getGroupMessage);
router.get('/getuserdues/:user_id', getUserDues);
router.post('/updateuserdues', updateUserDues);
router.get('/braintree/token', braintreeTokenController);
router.post('/braintree/payment', braintreePaymentController);

router.get('/getallhostels', getallhostels); // Use getallhostels directly
router.post('/gethostel', gethostel); // Use getallhostels directly
module.exports = router;
