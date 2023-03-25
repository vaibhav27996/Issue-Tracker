const Project=require('../models/project');
const ProjectIssue=require('../models/project_issue');
const issue_array_list=['UI','Documentation','Bug','Database','Css','Js','Github','File Upload'];

var projectIds;
//create new project
module.exports.createProject=async function(req,res){

    try{
        if(req.body){
            await Project.create({
                name:req.body.name_project,
                description:req.body.description_project,
                author:req.body.author_project
            });
        
    
            req.flash('success', 'Project has been successfully created');
            return res.redirect('/');
    
        }else{
            req.flash('error', 'Project not created! Please try again');
            return res.redirect('/');
        }

    }catch(err){
        req.flash('error', err);
        return res.redirect('/');
    }
    
}


//project issue function with so many filter and search fields
module.exports.projectIssuePage=async function(req,res){
        projectIds= req.params.id;
        let projectId = req.params.id;
        let issueArr=req.query.issue_search;
        let issueTitle=req.query.issue_title;
        var projectIssueList;
        let issueAuthor=req.query.issue_author;
       

        //if send the parames query
        if(issueArr || issueTitle || issueAuthor){

            if(issueTitle){
                var projectIssue=await ProjectIssue.find({
                                                    project_id:projectId,
                                                    issue_title:issueTitle
                                                }).populate('project_id');
                projectIssueList=projectIssue;

            }else if(issueAuthor){
                var projectIssue=await ProjectIssue.find({
                                                    project_id:projectId,
                                                    issue_author:issueAuthor
                                                }).populate('project_id');
                projectIssueList=projectIssue;

            }else if(!Array.isArray(issueArr)){
                var projectIssue=await ProjectIssue.find({
                                                    project_id:projectId,
                                                    issue_array:issueArr
                                                }).populate('project_id');
                projectIssueList=projectIssue;
            }else if( !Array.isArray(issueArr) || issueTitle || issueAuthor){
                var projectIssue=await ProjectIssue.find({
                                            project_id:projectId,
                                            issue_array:issueArr,
                                            issue_title:issueTitle,
                                            issue_author:issueAuthor}).populate('project_id');
               
                projectIssueList=projectIssue;
            }else{

                if(Array.isArray(issueArr) && issueTitle || issueAuthor){
                    var projectIssue=await ProjectIssue.find({
                                            project_id:projectId,
                                            issue_array:issueArr,
                                            issue_title:issueTitle,
                                            issue_author:issueAuthor}).populate('project_id');
                    projectIssueList=projectIssue;
                }else{

                    for(issue of issueArr){
                        var projectIssue=await ProjectIssue.find({project_id:projectId,issue_array:issue}).populate('project_id');
                        projectIssueList=projectIssue;
                    }

                }

            }
        }else{

            //otherwise show all issues
            var projectIssue=await ProjectIssue.find({project_id:projectId}).populate('project_id');
            projectIssueList=projectIssue;
        }

        var titleList=await ProjectIssue.find({project_id:projectId},{issue_title: 1});
        var authorList=await ProjectIssue.find({project_id:projectId},{issue_author: 1});
       
        var projectName=await Project.findById(projectId);
       

        

        return res.render('project_issue_page',{
            title:'Issue Page',
            projectId:projectId,
            issue_arr:issue_array_list,
            projectIssueList:projectIssueList,
            issueArr:issueArr,
            issueTitle:issueTitle,
            authorList:authorList,
            projectName:projectName.name
           
        });

}

//create new project issues
module.exports.createIssue=async function(req,res){

   let project =await Project.findById(req.body.project_id);
    
    try{

        if(project){

            if(req.body){

                await ProjectIssue.create({
                    project_id:req.body.project_id,
                    issue_title : req.body.title,
                    issue_description : req.body.descrption,
                    issue_author:req.body.author,
                    issue_array:req.body.issue,
                    issue_status:0
                });
                
                req.flash('success', 'Issued submitted Successfully!');
                return res.redirect('/projects/project-issue/'+req.body.project_id);
        
            }else{
                req.flash('error', 'Issued not submitted! Please try again');
                return res.redirect('/');
            }

        }else{
            req.flash('error', 'Project does not exist.Create new project');
            return res.redirect('/');
        }

        

    }catch(err){
        req.flash('error', err);
        return res.redirect('/');
    }
}

//chnaging the issue status with resolved
module.exports.resolveIssue=async function(req,res){
    
    if(req.params.id){
        let status= await ProjectIssue.findByIdAndUpdate(req.params.id,{issue_status:1});

        if (req.xhr){
            return res.status(200).json({
                data: {
                    issueStatus: status.issue_status,
                },
                message: "Issue resolved"
            });
        }
    }
}


//delete the project
module.exports.deleteProject=async function(req,res){

    try{

        if(req.params.id){
            let projectDetails= await Project.findById(req.params.id);
            projectDetails.remove();
            await ProjectIssue.deleteMany({project_id:req.params.id});

            req.flash('success', 'Project deleted Successfully');
            return res.redirect('/');
        }else{
            req.flash('error', 'Please try again later');
            return res.redirect('/');
        }

    }catch(err){
        req.flash('error', err);
        return res.redirect('/');
    }
    
}


//delete the project issue
module.exports.deleteProjectIssue=async function(req,res){

    try{

        if(req.params.id){
           
            let issue= await ProjectIssue.findByIdAndDelete({_id:req.params.id});
            issue.remove();
           

            req.flash('success', 'Project Issue deleted Successfully');
            return res.redirect('/projects/project-issue/'+projectIds);
        }else{
            req.flash('error', 'Please try again later');
            return res.redirect('/projects/project-issue/'+projectIds);
        }

    }catch(err){
        req.flash('error', err);
        return res.redirect('/projects/project-issue/'+projectIds);
    }
    
}