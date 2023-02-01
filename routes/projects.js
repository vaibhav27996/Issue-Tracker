const express=require('express');
const router=express.Router();
const projectcontroller=require('../controllers/projects_controller');

//create new project
router.post('/create-project',projectcontroller.createProject);

//delete the project
router.get('/delete-project/:id',projectcontroller.deleteProject);

//project issues page
router.get('/project-issue/:id',projectcontroller.projectIssuePage);

//the issue is pending or resolved
router.get('/resolve/:id',projectcontroller.resolveIssue);

//create new project issue
router.post('/create-issue',projectcontroller.createIssue);

//delete project issue
router.get('/delete-project-issue/:id',projectcontroller.deleteProjectIssue);

module.exports = router;