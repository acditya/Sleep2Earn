//Client ID: 799826603408-p1qnvvdbtgjn7qd64f4sc3pf9dlok643.apps.googleusercontent.com
//Client Secret: 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

const express = require("express");
const app = express();
const port = 1234;
const {google} = require("googleapis");
const request = require("request");
const cors = require("cors");
const urlParse = require("url-parse");
const queryParse = require("query-string");
const bodyParser = require("body-parser");
const axios = require("axios");

app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get("/getURLTing", (req, res) => {
    const oauth2Client = new google.auth.OAuth2(
        //Client ID
        "799826603408-p1qnvvdbtgjn7qd64f4sc3pf9dlok643.apps.googleusercontent.com",
        //Client Secret
        "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",
        //URL to Redirect To (localhost was for testing purposes *CHANGE LATER*)
        "http://localhost:1234"
    )
        //[IN ORDER] Reading Email Data, Reading Activity (Steps) Data, Reading Sleep Data
        const scopes = ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/fitness.activity.read", "https://www.googleapis.com/auth/fitness.sleep.read"]

        const url = oauth2Client.generateAuthUrl({
            access_type: "offline",
            scope: scopes,
            state: JSON.stringify({
                callbackUrl: req.body.callbackUrl,
                suerID: req.body.userid
            })
        });

        //Request Function w/ Error StackTrace Printing
        request(url, (error, response, body) => {
            console.log("The Following Error Has Occurred: ", error);
            console.log("statusCode: ", response && response.statusCode);
            res.send({url});
        })
});

//Get Step Count
app.get ("/steps", async (req, res) => {
    const queryURL = new urlParse(req.url);
    const authCode = queryParse.parse(queryURL.query).authCode;
    const oauth2Client = new google.auth.OAuth2(
        //Client ID
        "799826603408-p1qnvvdbtgjn7qd64f4sc3pf9dlok643.apps.googleusercontent.com",
        //Client Secret
        "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",
        //URL to Redirect To (localhost was for testing purposes *CHANGE LATER*)
        "http://localhost:1234/steps"
    )

    const tokens = await oauth2Client.getToken(authCode);
    let stepArray = [];

    try{
        const stepsResult = await axios({
            method: "POST",
            headers: {
                authorization: "Bearer " + tokens.tokens.access_token
            },
            "Content-Type": "application/json",
            url: 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
            data: {
                aggregateBy: [
                    {
                        dataTypeName: "com.google.step_count.delta",
                        dataSourceId: "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
                    }
                ],
                //UNIX Time (bucket in 24 hr intervals)
                bucketBytime: {durationMillis: 86400000},
                //insert desired start time here
                startTimeMillis: 0,
                //insert desired end time here
                endTimeMillis: 1
            },
        });

        //Test Print-to-Console Step Data
        console.log(stepsResult);
        //Populate Steps Array
        stepsArray = result.data.bucket;

    }   catch(Error){
            console.log(Error)
    }
});

//Get Sleep Count
app.get ("/sleep", async (req, res) => {
    const queryURL = new urlParse(req.url);
    const authCode = queryParse.parse(queryURL.query).authCode;
    const oauth2Client = new google.auth.OAuth2(
        //Client ID
        "799826603408-p1qnvvdbtgjn7qd64f4sc3pf9dlok643.apps.googleusercontent.com",
        //Client Secret
        "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",
        //URL to Redirect To (localhost was for testing purposes *CHANGE LATER*)
        "http://localhost:1234/sleep"
    )

    const tokens = await oauth2Client.getToken(authCode);
    let sleepArray = [];

    try{
        const sleepResult = await axios({
            method: "POST",
            headers: {
                authorization: "Bearer " + tokens.tokens.access_token
            },
            "Content-Type": "application/json",
            url: 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
            data: {
                aggregateBy: [
                    {
                        dataTypeName: "com.google.step_count.delta",
                        dataSourceId: "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
                    }
                ],
                //UNIX Time (bucket in 24 hr intervals)
                bucketBytime: {durationMillis: 86400000},
                //insert desired start time here
                startTimeMillis: 0,
                //insert desired end time here
                endTimeMillis: 1
            },
        });

        //Test Print-to-Console Sleep Data
        console.log(sleepResult);
        //Populate Sleep Array
        sleepArray = result.data.bucket;

    }   catch(Error){
            console.log(Error)
    }
});

app.listen(port, () => console.log('Google Fit is Active on Port ${port}'));
