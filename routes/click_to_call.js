var express = require('express');
var router = express.Router();
const axios=require('axios')

router.get('/',function(req, res, next) {
    // http://localhost:3000/click_to_call?client_number=972548591810&business_number=972583262226
    
    let snumber = req.query.client_number
    let cnumber = req.query.business_number
    let callerid1=cnumber;
    let callerid2=snumber;
    
    axios.get(`https://www.omega-telecom.net/api/json/calls/make/?auth_username=${process.env.ENSWITCH_USER};auth_password=${process.env.ENSWITCH_PASSWORD};stype=;snumber=${snumber};cnumber=${cnumber};callerid1=${callerid1};callerid2=${callerid2}`)
    .then((response)=>{
        console.log("response",response.data)
        res.json({data:response.data})
    })
    .catch((err)=>{
        console.log(err);
        res.json(err);
        return res.status(500);

    });
    return res.status(204);
}) 

module.exports = router;
