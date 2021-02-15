var express = require('express');
var router = express.Router();
const axios=require('axios')

router.get('/',function(req, res, next) {
  
    res.json({data:"web-rtc page"})
    return res.status(400);
      
    }) 
    
module.exports = router;
