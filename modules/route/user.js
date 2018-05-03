'use strict';

var express = require('express');  

let reqUser = {
                'email':'test@gmail.com', 
                'password':'1111'
            };

var userCtrl = {

	userLogin: function(req, res, next){
		  let options = req.body || {};  
          for(let k in options){
            if(!options[k]){
                let errMsg = k+ ' is required';
                return res.status(400).json({'status':0, 'msg':errMsg});
            };
          };
          let emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
          let validEmailPttrn = options.email.match(emailPattern);

          if(!validEmailPttrn)  return res.status(422).json({'status':0, 'msg':'Invalid email format '});

        if((options.email === reqUser.email)&&(options.password === reqUser.password)){ 
            res.json({'status':1, 'msg':'Successfull Loggedin'});
        }else{
            res.status(400).json({'status':0, 'msg':'Invalid email & password '});
        }
	}
};

module.exports = userCtrl;