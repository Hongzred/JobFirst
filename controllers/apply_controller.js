const express = require('express');
const bodyParser = require('body-parser');

module.exports = (connection) => {


    return (req, res) => {
        console.log(req.session);
        let application_ID = Math.floor(Math.random() * 1000000000);
        let user_ID = req.session.user.user_ID;
        let applied_jobID = req.params.job_id;
        let date = new Date().toISOString();
        console.log('date is: ', date)
        let query = 'INSERT INTO Applied(applicant_ID, applied_jobID, application_ID) VALUE('
                     +user_ID + ',' + applied_jobID + ',' + application_ID + ');'
                     
        let query2 = 'INSERT INTO Application(application_ID, created_on, applicant_ID, applied_jobID) VALUES ('
                    + application_ID + ',' +'"' + date + '",' +user_ID + ',' + applied_jobID + ');'
        
        console.log("applicationID: ", application_ID);
        console.log("userID: ", user_ID);
        console.log("jobApplied: ", applied_jobID);
        console.log("params: ", req.params);
        console.log("Job Applied")

        if(user_ID == undefined){
            res.redirect('/login')
        }  else{
            connection.query(
                query2,
                (error,results, field) => {
                    if(error){
                        console.log(error)
                        //res.json(error)
                        res.redirect('/')
                    }
                }
            );
            connection.query(
                query,
                (error, results, field) => {
                    if(error){
                        console.log(error)
                        // res.json(error)
                        res.redirect('/')
                    } else{
                        res.redirect('/')
                    }
                }
            );
        }          

        
        
    };

}