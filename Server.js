//Infost 440x - nodejs server

//Email Settings
const emailHost = "smtp.email.com";
const emailPort = 587;
const emailSecure = false;
const emailUsername = "your_username";
const emailPassword = "your_password";
const emailFromAddr = "something@email.com";

//Server Settings
const port = 3000
const staticServerPort = 8000
const webSocketPort = 5000
const httpToHttpsRedirectPort = 8080

const resultsPerPage = 10

const siteResetUrl = 'https://127.0.0.1/#/reset_password'

const targetBaseUrl = 'https://127.0.0.1:8000';


var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	constants = require('constants'),
    https = require('https');

var caCrt = fs.readFileSync('/home/bitnami/127.0.0.1.com.ca-bundle').toString();

var sslOptions = {
  secureProtocol: 'SSLv23_method', //Poodlebleed Fix - Disables SSL 3.0
  secureOptions: constants.SSL_OP_NO_SSLv3,	//Poodlebleed Fix - Disables SSL 3.0
  key: fs.readFileSync('/home/bitnami/127.0.0.1.com.key').toString(),
  cert: fs.readFileSync('/home/bitnami/127.0.0.1.com.crt').toString(),
  ca: [caCrt],
  ciphers: 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384', //:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM
  honorCipherOrder: true,
  requestCert: false
};

var finalhandler = require('finalhandler')

var serveStatic = require('serve-static')

var generator = require('generate-password');

const express = require('express')

var jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const saltRounds = 10;

var mongoose = require('mongoose/');
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

var serveStatic = require('serve-static')

//var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();

var staticServer = express();


var bodyParser = require('body-parser');

'use strict';
const nodemailer = require('nodemailer');


var jwtKey = "bv971d9+1c7e0L9e2e89d238f8CX43XM35&572X2I4ab8985J65053da9eda3edb!632a4Fa8dGOe59c6c8N4Z643X8p30c1d1H072f3zcG65a1fa54a85fc0d4be9090591c7)4He1efYN094~8q4q71A848b3a27f62cd8e1Yl0+ef473a2$#2b3873lE04Xdg05f73i0zT5Fe0d2V8[43bN258ND,965K95d3d961ae=c(RM#b687c7371fd7";
var authKey = "2~FB{H~T9T<5&(kPRU_Wk|JSC^o1k8q&)Q(\.&;RM],oP@m~L9q>2%.-[!H:y;gj";

//Start of DB Schema

var db = mongoose.connect('mongodb://localhost/infost440x_db', { useNewUrlParser: true });
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  CreatedOn: Date,
  socketID: String,
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  email: String,
  resetKey: String
});


var BookmarkSchema = new Schema({
  CreatedOn: Date,
  name: String,
  url: String,
  username: String
});


/*
var MessageSchema = new Schema({
  GmtTime: Date,
  message: String,
  username: String
});



'use strict';
const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: 'bar@example.com, baz@example.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});
*/


mongoose.model('User', UserSchema);
mongoose.model('Bookmark', BookmarkSchema);
//mongoose.model('Message', MessageSchema);


var UserModel = mongoose.model('User');
var BookmarkModel = mongoose.model('Bookmark');
//var MessageModel = mongoose.model('Message');


//End of DB Schema


//Start of Socket IO

/*
var app2 = require('express')();
var server2 = require('http').Server(app2);
var io = require('socket.io')(server2);

server.listen(webSocketPort);
// WARNING: app.listen(80) will NOT work here!


app2.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

*/


var app2 = https.createServer(sslOptions, function (request, response) {

}).listen(webSocketPort);


var io = require('socket.io').listen(app2);
//End of Declare Server

//Start of App WebSockets

io.sockets.on('connection', function(socket) {

//get socket ip address - method below for 1.0.4:
   var clientIp = socket.request.connection.remoteAddress;


io.to(socket.id).emit("socketID",{ socketID: socket.id, ip: clientIp});

    console.log(clientIp);

		//Start of auth and handshake
		socket.on('joinJob', function(data) {

		socket.join(data["jobID"]);



			console.log( data["jobID"]);

		});

    //Update socketID
    socket.on('updateSession', function(data) {

      console.log("updateSession: " + JSON.stringify(data))


      jwt.verify(data["jwt"], jwtKey, function(err, decoded) {
      console.log(JSON.stringify(decoded)) // bar

      if (!err && decoded.authKey ===  authKey) {

        var token = jwt.sign({ authKey: authKey, username: decoded.username  }, jwtKey, {expiresIn: 86400, issuer: "tonet_INFOST440x"});

console.log(token);

    UserModel.updateOne({ username: data['username'] }, { $set: { socketID: data['socketID']} },
      //	PharmaciesModel.updateOne({ sureScriptPharmacy_id: doc.sureScriptPharmacy_id }, { $set: { longitude: response.json.results[0].geometry.location.lng, latitude: response.json.results[0].geometry.location.lat} },
      function (err) {

        if(!err){
              console.log('DB Updated');


                    io.to(data["socketID"]).emit("res_updateSession",{ jwt: token, status: 'success', msg: 'Token Refreshed!'});

            }
            else {
              console.log(err);
            }
      }
    );

  }else {
      io.to(data["socketID"]).emit("res_updateSession",{ status: 'failed', msg: 'Session Expired. Please Login Again!'});
  }

  });

    });



/*

		//Start of Client Token Refresh
		socket.on('client_jwt_refresh', function(data) {

		  jwt.verify(data["jwt"], authKey, function(err, decoded) {
		  console.log(JSON.stringify(decoded)) // bar

		if (decoded.authKey === authKey) {

		var token = jwt.sign({ authKey: authKey, username: decoded.username  }, jwtKey, {expiresIn: "2 days", issuer: "tonet_INFOST440x"});

		io.to(data["socketID"]).emit("res_jwt_refresh",{ jwt: refreshed});
		}

		});

			console.log("Client JWT Refresh");

		});



		//End of Client Token Refresh



		//End of User Token Refresh

//Start of auth and handshake
socket.on('join', function(data) {

socket.id = data["sID"];

console.log(socket.id + " + Chat Test");

socket.join('chatTest');

//	io.to(data["sID"]).emit("authKey",{ room: authKey});

	//io2.sockets.socket(socket.id).emit("adminUser",{ adminUserName: rootUN, adminPassword: rootPW});



	console.log("Auth Success");

});



//End of auth and handshake

*/





});

//End of App WebSockets



//End of Socket IO


//Start of REST Server


app.get('/', (req, res) => res.send('Hello World!'));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));



//Create New User
app.post('/newuser', function (req, res) {
console.log('\n\nsubmitResetPassword\n\n');

                var data = JSON.parse(req.body.data);

        console.log(JSON.stringify(data));



var resData = {};

//console.log(buff);

		   bcrypt.hash(data.password, saltRounds, function(err, hash) {
		   // Store hash in your password DB.

UserModel.findOneAndUpdate({ username: data.username },{ $setOnInsert: {
	CreatedOn: new Date(),
	socketID: '',
  username: data.username,
  password: hash,
  email: data.username,
  firstName: data.firstname,
  lastName: data.lastname}},
   { upsert: true }, function (err, doc) {

		 if(!doc){

		 if(!doc)
		 {

		   // create reusable transporter object using the default SMTP transport
		   let transporter = nodemailer.createTransport({
		       host: emailHost,
		       port: emailPort,
		       secure: emailSecure, // true for 465, false for other ports
		       auth: {
		           user: emailUsername, // generated ethereal user
		           pass: emailPassword // generated ethereal password
		       }
		   });

		   // setup email data with unicode symbols
		   let mailOptions = {
		       from: emailFromAddr, // sender address
		       to: data.username, // list of receivers
		       subject: 'Welcome to Tone\'s INFOST440x Final Project', // Subject line
		       text: 'Hi, ' + data.firstname + ' ' + data.lastname + '\n\nUsername: ' + data.username + '\nPassword: ' + data.password
		   };

		   // send mail with defined transport object
		   transporter.sendMail(mailOptions, (error, info) => {
		       if (error) {
		           return console.log(error);
		       }
		       else {

		         resData.status = 'success';
		         resData.msg = 'Account successfully created! Please check your email.';

		         res.set({
		       "Content-Type": "application/javascript",
		       "Access-Control-Allow-Origin" : "*"
		     });

		         res.status(200).send(JSON.stringify(resData));


		         console.log('Message sent: %s', info.messageId);
		       }
		       // Preview only available when sending through an Ethereal account
		     //  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

		       // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
		       // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
		   });
		 }
		   else {
		     console.log(err + " " + doc)
		     resData.status = 'failed';
		     resData.msg = 'Error, Please try again later!';

		     res.set({
		   "Content-Type": "application/javascript",
		   "Access-Control-Allow-Origin" : "*"
		   });

		     res.status(200).send(JSON.stringify(resData));
		   }



		 }
		   else {
		   console.log(err + " " + doc)
		   resData.status = 'failed';
		   resData.msg = 'Account Already Exists';

		   res.set({
		 "Content-Type": "application/javascript",
		 "Access-Control-Allow-Origin" : "*"
		 });

		   res.status(200).send(JSON.stringify(resData));
		 }


	 });

	 		 });


});


//User login
app.post('/userlogin', function (req, res) {
console.log('\n\nuserlogin\n\n');

                var data = JSON.parse(req.body.data);

        console.log(JSON.stringify(data));



var resData = {};

//console.log(buff);

UserModel.findOne({ username: data.username }, function (err, doc) {

if(doc != null){


  bcrypt.compare(data.password, doc.password, function(bcryptErr, bcryptRes) {
      // res == true

      if(bcryptRes === true)
      {
        UserModel.updateOne({ username: data.username }, { $set: { socketID: data.socketID} },
          //	PharmaciesModel.updateOne({ sureScriptPharmacy_id: doc.sureScriptPharmacy_id }, { $set: { longitude: response.json.results[0].geometry.location.lng, latitude: response.json.results[0].geometry.location.lat} },
          function (err) {

            if(!err){
                  console.log('DB Updated');


        var token = jwt.sign({ authKey: authKey, username: doc.username  }, jwtKey, {expiresIn: 86400, issuer: "tonet_INFOST440x"});

        console.log("PW Check Success: " + doc)
        resData.status = 'success';
        resData.msg = 'You\'re LoggedIn!';
        resData.jwt = token;

        res.set({
      "Content-Type": "application/javascript",
      "Access-Control-Allow-Origin" : "*"
      });

        res.status(200).send(JSON.stringify(resData));
      }
      else {
        console.log("Server Error: " + err)
        resData.status = 'error';
        resData.msg = err;

        res.set({
      "Content-Type": "application/javascript",
      "Access-Control-Allow-Origin" : "*"
      });

        res.status(200).send(JSON.stringify(resData));
      }
  }
  );

      }
      else {

        console.log("PW Check Failed: " + doc)
        resData.status = 'failed';
        resData.msg = 'Wrong Username or Password!';

        res.set({
      "Content-Type": "application/javascript",
      "Access-Control-Allow-Origin" : "*"
      });

        res.status(200).send(JSON.stringify(resData));

      }

  });


}
  else {
  console.log(err + " " + doc)
  resData.status = 'failed';
  resData.msg = 'Wrong Username or Password!';

  res.set({
"Content-Type": "application/javascript",
"Access-Control-Allow-Origin" : "*"
});

  res.status(200).send(JSON.stringify(resData));
}

});


});



//Load my account page
app.post('/dispAcctPage', function (req, res) {

console.log('\n\ndispAcctPage\n\n');
                var data = JSON.parse(req.body.data);

        console.log(JSON.stringify(data));

var resData = {};

var bookmarkArr = [];
var userArr = [];

jwt.verify(data.jwt, jwtKey, function(err, decoded) {
console.log(JSON.stringify(decoded)) // bar

if (!err && decoded.authKey ===  authKey) {

  UserModel.countDocuments({username: { $ne: decoded.username }}, function (err, count) {
  console.log('there are %d users', count);


BookmarkModel.countDocuments({ username: decoded.username }, function (err, count2) {
  console.log('there are %d bookmarks', count2);


  var bookmarksCursor = BookmarkModel.find({username: decoded.username}).limit(resultsPerPage).batchSize(10000).lean().cursor();

   bookmarksCursor.addCursorFlag('noCursorTimeout', true);

   var usersCursor = UserModel.find({username: { $ne: decoded.username }}).limit(resultsPerPage).batchSize(10000).lean().cursor();

    usersCursor.addCursorFlag('noCursorTimeout', true);

    bookmarksCursor.eachAsync(doc => {
    console.log("\nBookmark Doc ID:" + doc._id);

return new Promise(function(resolve, reject) {

  bookmarkArr.push(doc);
  resolve();

    	});
  }).
    then(() => {

  		console.log('aSync 1 done!');


      usersCursor.eachAsync(doc2 => {
      console.log("\nUser Doc ID:" + doc2._id);

  return new Promise(function(resolve2, reject2) {

    userArr.push({username: doc2.username, firstName: doc2.firstName, lastName: doc2.lastName});
    resolve2();

        });
    }).
      then(() => {

        res.set({
        "Content-Type": "application/javascript",
        "Access-Control-Allow-Origin" : "*"
        });

        console.log('aSync 2 done!');

        resData.users = userArr;
        resData.bookmarks = bookmarkArr;
        resData.userCount = count;
        resData.bookmarkCount = count2;

        resData.status = 'success';
        resData.msg = 'My account page data successfully returned!';

        res.status(200).send(JSON.stringify(resData));

    }); //usersCursor

  }); //bookmarksCursor
}); //count1
}); //count2
}
else {
  res.set({
  "Content-Type": "application/javascript",
  "Access-Control-Allow-Origin" : "*"
  });

  resData.status = 'failed';
  resData.msg = 'Your session is invalid. Please login again.';

  res.status(403).send(JSON.stringify(resData));
}

});

});


//Paginate and search User Directory
app.post('/searchUsers', function (req, res) {

console.log('\n\nsearchUsers\n\n');
                var data = JSON.parse(req.body.data);

        console.log(JSON.stringify(data));

var resData = {};

var userArr = [];

jwt.verify(data.jwt, jwtKey, function(err, decoded) {
console.log(JSON.stringify(decoded)) // bar

if (!err && decoded.authKey ===  authKey) {

//  UserModel.createIndexes( { "$**": "text" } )

  var skipNum = (data.pageNum - 1) * resultsPerPage;

  //UserModel.countDocuments({username: { $ne: decoded.username }, lastName:{ $text: { $search:  data.queryStr }} }, function (err, count) {
      UserModel.countDocuments({username: { $ne: decoded.username }, lastName: {$regex : ".*" + data.queryStr  + ".*", $options: 'i'} }, function (err, count) {
  console.log('there are %d users', count);

if(count == 0){

  res.set({
  "Content-Type": "application/javascript",
  "Access-Control-Allow-Origin" : "*"
  });

  console.log('no matching users');

  resData.users = userArr;
  resData.userCount = count;

  resData.status = 'success';
  resData.msg = 'User search and paginate successful!';

  res.status(200).send(JSON.stringify(resData));
}
else{
   //var usersCursor = UserModel.find({username: { $ne: decoded.username }, lastName:{ $text: { $search: data.queryStr} }}).limit(resultsPerPage).skip(skipNum).batchSize(10000).lean().cursor();
   var usersCursor = UserModel.find({username: { $ne: decoded.username }, lastName: {$regex : ".*" + data.queryStr  + ".*", $options: 'i'} }).limit(resultsPerPage).skip(skipNum).batchSize(10000).lean().cursor();

    usersCursor.addCursorFlag('noCursorTimeout', true);

      usersCursor.eachAsync(doc2 => {
      console.log("\nUser Doc ID:" + doc2._id);

  return new Promise(function(resolve2, reject2) {

    userArr.push({username: doc2.username, firstName: doc2.firstName, lastName: doc2.lastName});
    resolve2();

        });
    }).
      then(() => {

        res.set({
        "Content-Type": "application/javascript",
        "Access-Control-Allow-Origin" : "*"
        });

        console.log('aSync 2 done!');

        resData.users = userArr;
        resData.userCount = count;

        resData.status = 'success';
        resData.msg = 'User search and paginate successful!';

        res.status(200).send(JSON.stringify(resData));

    }); //usersCursor

  }

}); //count1
}
else {
  res.set({
  "Content-Type": "application/javascript",
  "Access-Control-Allow-Origin" : "*"
  });

  resData.status = 'failed';
  resData.msg = 'Your session is invalid. Please login again.';

  res.status(403).send(JSON.stringify(resData));
}

});

});



//Create new bookmark
app.post('/newbookmark', function (req, res) {
console.log('\n\nnew bookmark\n\n');

                var data = JSON.parse(req.body.data);

        console.log(JSON.stringify(data));

var resData = {};

jwt.verify(data.jwt, jwtKey, function(err, decoded) {
console.log(JSON.stringify(decoded)) // bar

if (!err && decoded.authKey ===  authKey) {

  var nBookmark = new BookmarkModel();

  nBookmark.CreatedOn = new Date();
  nBookmark.name = data.name;
  nBookmark.url = data.url;
  nBookmark.username = decoded.username;

  res.set({
  "Content-Type": "application/javascript",
  "Access-Control-Allow-Origin" : "*"
  });

  resData.status = 'success';
  resData.objID = nBookmark._id.toString();
  resData.msg = 'New bookmark created!';

  nBookmark.save();

  BookmarkModel.countDocuments({ username: decoded.username }, function (err, count2) {
    console.log('there are %d bookmarks', count2);

  resData.bookmarkCount = count2;

  res.status(200).send(JSON.stringify(resData));

  });
}
else {
  res.set({
  "Content-Type": "application/javascript",
  "Access-Control-Allow-Origin" : "*"
  });

  resData.status = 'failed';
  resData.msg = 'Your session is invalid. Please login again.';

  res.status(403).send(JSON.stringify(resData));
}

});

});

//Paginate and search Bookmarks
app.post('/searchBookmarks', function (req, res) {
console.log('\n\nsearchBookmarks\n\n');

                var data = JSON.parse(req.body.data);

        console.log(JSON.stringify(data));

var resData = {};

var bookmarkArr = [];

jwt.verify(data.jwt, jwtKey, function(err, decoded) {
console.log(JSON.stringify(decoded)) // bar

if (!err && decoded.authKey ===  authKey) {

//  UserModel.createIndexes( { "$**": "text" } )

  var skipNum = (data.pageNum - 1) * resultsPerPage;



  //UserModel.countDocuments({username: { $ne: decoded.username }, lastName:{ $text: { $search:  data.queryStr }} }, function (err, count) {
      BookmarkModel.countDocuments({username: decoded.username, name: {$regex : ".*" + data.queryStr  + ".*", $options: 'i'} }, function (err, count) {
  console.log('there are %d bookmarks', count);

if(count == 0){

  res.set({
  "Content-Type": "application/javascript",
  "Access-Control-Allow-Origin" : "*"
  });

  console.log('No matching bookmarks!');

  resData.bookmarks = bookmarkArr;
  resData.bookmarkCount = count;

  resData.status = 'success';
  resData.msg = 'Bookmark search and paginate successful!';

  res.status(200).send(JSON.stringify(resData));

}
else{
   //var usersCursor = UserModel.find({username: { $ne: decoded.username }, lastName:{ $text: { $search: data.queryStr} }}).limit(resultsPerPage).skip(skipNum).batchSize(10000).lean().cursor();
   var bookmarksCursor = BookmarkModel.find({username: decoded.username, name: {$regex : ".*" + data.queryStr  + ".*", $options: 'i'} }).limit(resultsPerPage).skip(skipNum).batchSize(10000).lean().cursor();

    bookmarksCursor.addCursorFlag('noCursorTimeout', true);

      bookmarksCursor.eachAsync(doc2 => {
      console.log("\nBookmark Doc ID:" + doc2._id);

  return new Promise(function(resolve2, reject2) {

    bookmarkArr.push(doc2);
    resolve2();

        });
    }).
      then(() => {

        res.set({
        "Content-Type": "application/javascript",
        "Access-Control-Allow-Origin" : "*"
        });

        console.log('aSync 2 done!');

        resData.bookmarks = bookmarkArr;
        resData.bookmarkCount = count;

        resData.status = 'success';
        resData.msg = 'Bookmark search and paginate successful!';

        res.status(200).send(JSON.stringify(resData));

    }); //usersCursor

  }

}); //count1
}
else {
  res.set({
  "Content-Type": "application/javascript",
  "Access-Control-Allow-Origin" : "*"
  });

  resData.status = 'failed';
  resData.msg = 'Your session is invalid. Please login again.';

  res.status(403).send(JSON.stringify(resData));
}

});

});


//Delete Bookmark
app.post('/deleteBookmark', function (req, res) {

console.log('\n\ndeleteBookmark\n\n');

                var data = JSON.parse(req.body.data);

        console.log(JSON.stringify(data));

var resData = {};

jwt.verify(data.jwt, jwtKey, function(err, decoded) {
console.log(JSON.stringify(decoded)) // bar

if (!err && decoded.authKey ===  authKey) {

//  UserModel.createIndexes( { "$**": "text" } )

BookmarkModel.findByIdAndDelete(data._id, function(err, doc) {

res.set({
"Content-Type": "application/javascript",
"Access-Control-Allow-Origin" : "*"
});

if(!err)
{
console.log('aSync 2 done!');

resData.bookmark = doc;

resData.status = 'success';
resData.msg = 'Bookmark successfully deleted!';

BookmarkModel.countDocuments({ username: decoded.username }, function (err, count2) {
  console.log('there are %d bookmarks', count2);

resData.bookmarkCount = count2;

res.status(200).send(JSON.stringify(resData));

});
}
else {
  resData.status = 'failed';
  resData.msg = 'Bookmark does not exist!';

  res.status(200).send(JSON.stringify(resData));
  }
}

);

}
else {
  res.set({
  "Content-Type": "application/javascript",
  "Access-Control-Allow-Origin" : "*"
  });

  resData.status = 'failed';
  resData.msg = 'Your session is invalid. Please login again.';

  res.status(403).send(JSON.stringify(resData));
}

});

});


//Change Password
app.post('/changePassword', function (req, res) {

console.log('\n\ndeleteBookmark\n\n');
                var data = JSON.parse(req.body.data);

        console.log(JSON.stringify(data));

var resData = {};

jwt.verify(data.jwt, jwtKey, function(err, decoded) {
console.log(JSON.stringify(decoded)) // bar

if (!err && decoded.authKey ===  authKey) {

//  UserModel.createIndexes( { "$**": "text" } )
UserModel.findOne({ username: decoded.username }, function (err, doc) {

if(doc != null){


  bcrypt.compare(data.oldPassword, doc.password, function(bcryptErr, bcryptRes) {
      // res == true

      if(bcryptRes === true)
      {

        bcrypt.hash(data.newPassword, saltRounds, function(err, hash) {

        if(!err){
        UserModel.updateOne({ username: decoded.username}, { $set: { password: hash} },
          //	PharmaciesModel.updateOne({ sureScriptPharmacy_id: doc.sureScriptPharmacy_id }, { $set: { longitude: response.json.results[0].geometry.location.lng, latitude: response.json.results[0].geometry.location.lat} },
          function (err) {

            if(!err){


              res.set({
              "Content-Type": "application/javascript",
              "Access-Control-Allow-Origin" : "*"
              });

              console.log('Password Changed!');


              resData.status = 'success';
              resData.msg = 'Password successfully changed!';

              res.status(200).send(JSON.stringify(resData));
                }
                else {
                  console.log(err);
                  //reject();
                  resData.status = 'error';
                  resData.msg = 'Please try again later';

                  res.set({
                "Content-Type": "application/javascript",
                "Access-Control-Allow-Origin" : "*"
                });

                  res.status(200).send(JSON.stringify(resData));
                }
          }
        ); }else {

          console.log(err);
          //reject();
          resData.status = 'error';
          resData.msg = 'Please try again later';

          res.set({
        "Content-Type": "application/javascript",
        "Access-Control-Allow-Origin" : "*"
        });

          res.status(200).send(JSON.stringify(resData));
        }

      });
      }
      else {

        console.log("PW Check Failed: " + doc)
        resData.status = 'failed';
        resData.msg = 'Wrong Username or Password!';

        res.set({
      "Content-Type": "application/javascript",
      "Access-Control-Allow-Origin" : "*"
      });

        res.status(200).send(JSON.stringify(resData));

      }

  });


}
  else {
  console.log(err + " " + doc)
  resData.status = 'failed';
  resData.msg = 'User Doesn\'t Exist!';

  res.set({
"Content-Type": "application/javascript",
"Access-Control-Allow-Origin" : "*"
});

  res.status(200).send(JSON.stringify(resData));
}

});




}
else {
  res.set({
  "Content-Type": "application/javascript",
  "Access-Control-Allow-Origin" : "*"
  });

  resData.status = 'failed';
  resData.msg = 'Your session is invalid. Please login again.';

  res.status(403).send(JSON.stringify(resData));
}

});

});



//Delete Account
app.post('/deleteUser', function (req, res) {
console.log('\n\ndeleteUser\n\n');

                var data = JSON.parse(req.body.data);

        console.log(JSON.stringify(data));

var resData = {};

jwt.verify(data.jwt, jwtKey, function(err, decoded) {
console.log(JSON.stringify(decoded)) // bar

if (!err && decoded.authKey ===  authKey) {

//  UserModel.createIndexes( { "$**": "text" } )

BookmarkModel.deleteMany({ username: decoded.username }, function(err) {

res.set({
"Content-Type": "application/javascript",
"Access-Control-Allow-Origin" : "*"
});

if(!err)
{

  UserModel.deleteOne({ username: decoded.username }, function (err2) {

    if(!err2)
    {

    console.log('aSync 2 done!');


    resData.status = 'success';
    resData.msg = 'Account successfully deleted!';

    res.status(200).send(JSON.stringify(resData));

    }
    else {
      resData.status = 'error';
      resData.msg = 'Error, Please try again later!';

      res.status(200).send(JSON.stringify(resData));
      }

  });
}
else {
  resData.status = 'error';
  resData.msg = 'Error, Please try again later!';

  res.status(200).send(JSON.stringify(resData));
  }
}

);

}
else {
  res.set({
  "Content-Type": "application/javascript",
  "Access-Control-Allow-Origin" : "*"
  });

  resData.status = 'failed';
  resData.msg = 'Your session is invalid. Please login again.';

  res.status(403).send(JSON.stringify(resData));
}

});

});


//Request Password Reset
app.post('/requestPasswordReset', function (req, res) {

console.log('\n\nrequestPasswordReset\n\n');
                var data = JSON.parse(req.body.data);

        console.log(JSON.stringify(data));



var resData = {};

//console.log(buff);

UserModel.findOne({ username: data.username }, function (err, doc) {

if(doc != null){


  var keygen = generator.generate({
      length: 64,
      //exclude: '?=&',
      numbers: true,
      uppercase: true,
      symbols: false,
      strict: true
  });

  console.log(keygen)


  UserModel.updateOne({ username: data.username}, { $set: { resetKey: keygen } },
    //	PharmaciesModel.updateOne({ sureScriptPharmacy_id: doc.sureScriptPharmacy_id }, { $set: { longitude: response.json.results[0].geometry.location.lng, latitude: response.json.results[0].geometry.location.lat} },
    function (err) {

      if(!err){


        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: emailHost,
            port: emailPort,
            secure: emailSecure, // true for 465, false for other ports
            auth: {
                user: emailUsername, // generated ethereal user
                pass: emailPassword // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: emailFromAddr, // sender address
            to: data.username, // list of receivers
            subject: 'Password Reset - Tone\'s INFOST440x Final Project', // Subject line
            text: 'To reset your password please click or copy and paste the following link:\n\nReset Link: ' + siteResetUrl + '?key=' + keygen + '&user=' + data.username
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            else {

                      res.set({
                      "Content-Type": "application/javascript",
                      "Access-Control-Allow-Origin" : "*"
                      });

                      console.log('Reset Requested!');


                      resData.status = 'success';
                      resData.msg = 'Reset successfully requested! Please check your email.';

                      res.status(200).send(JSON.stringify(resData));


                      console.log('Message sent: %s', info.messageId);
            }
            // Preview only available when sending through an Ethereal account
          //  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });


          }
          else {
            console.log(err);
            //reject();
            resData.status = 'error';
            resData.msg = 'Please try again later';

            res.set({
          "Content-Type": "application/javascript",
          "Access-Control-Allow-Origin" : "*"
          });

            res.status(200).send(JSON.stringify(resData));
          }
    }
  );

}
  else {
  console.log(err + " " + doc)
  resData.status = 'failed';
  resData.msg = 'Account Not Found';

  res.set({
"Content-Type": "application/javascript",
"Access-Control-Allow-Origin" : "*"
});

  res.status(200).send(JSON.stringify(resData));
}

});


});


//Verify Password Reset
app.post('/verifyPasswordReset', function (req, res) {
console.log('\n\nverifyPasswordReset\n\n');

                var data = JSON.parse(req.body.data);

        console.log(JSON.stringify(data));



var resData = {};

//console.log(buff);

UserModel.findOne({ username: data.username }, function (err, doc) {

if(doc != null && doc.resetKey === data.resetKey &&  doc.resetKey != '' ){


  console.log('Reset key is valid!')
  resData.status = 'success';
  resData.msg = 'Reset Key Validated';

  res.set({
"Content-Type": "application/javascript",
"Access-Control-Allow-Origin" : "*"
});

  res.status(200).send(JSON.stringify(resData));


}
  else {
  console.log(err + " " + doc)
  resData.status = 'failed';
  resData.msg = 'Invalid Reset Key';

  res.set({
"Content-Type": "application/javascript",
"Access-Control-Allow-Origin" : "*"
});

  res.status(200).send(JSON.stringify(resData));
}

});


});


//Submit Password Reset
app.post('/submitResetPassword', function (req, res) {
console.log('\n\nsubmitResetPassword\n\n');
                var data = JSON.parse(req.body.data);

        console.log(JSON.stringify(data));

var resData = {};


//  UserModel.createIndexes( { "$**": "text" } )
UserModel.findOne({ username: data.username }, function (err, doc) {

if(doc != null && doc.resetKey === data.resetKey &&  doc.resetKey != ''){


        bcrypt.hash(data.newPassword, saltRounds, function(err, hash) {

        if(!err){
        UserModel.updateOne({ username: data.username}, { $set: { password: hash, resetKey: ''} },
          //	PharmaciesModel.updateOne({ sureScriptPharmacy_id: doc.sureScriptPharmacy_id }, { $set: { longitude: response.json.results[0].geometry.location.lng, latitude: response.json.results[0].geometry.location.lat} },
          function (err) {

            if(!err){


              res.set({
              "Content-Type": "application/javascript",
              "Access-Control-Allow-Origin" : "*"
              });

              console.log('Password Reset!');


              resData.status = 'success';
              resData.msg = 'Password successfully reset!';

              res.status(200).send(JSON.stringify(resData));
                }
                else {
                  console.log(err);
                  //reject();
                  resData.status = 'error';
                  resData.msg = 'Please try again later';

                  res.set({
                "Content-Type": "application/javascript",
                "Access-Control-Allow-Origin" : "*"
                });

                  res.status(200).send(JSON.stringify(resData));
                }
          }
        ); }else {

          console.log(err);
          //reject();
          resData.status = 'error';
          resData.msg = 'Please try again later';

          res.set({
        "Content-Type": "application/javascript",
        "Access-Control-Allow-Origin" : "*"
        });

          res.status(200).send(JSON.stringify(resData));
        }

      });



}
  else {
  console.log(err + " " + doc)
  resData.status = 'failed';
  resData.msg = 'User Doesn\'t Exist!';

  res.set({
"Content-Type": "application/javascript",
"Access-Control-Allow-Origin" : "*"
});

  res.status(200).send(JSON.stringify(resData));
}

});




});



//Edit bookmark
app.post('/editbookmark', function (req, res) {
console.log('\n\nedit bookmark\n\n');

                var data = JSON.parse(req.body.data);

        console.log(JSON.stringify(data));

var resData = {};

jwt.verify(data.jwt, jwtKey, function(err, decoded) {
console.log(JSON.stringify(decoded)) // bar

if (!err && decoded.authKey ===  authKey) {

	BookmarkModel.updateOne({ _id: data.objID}, { $set: { name: data.name, url: data.url} },
		//	PharmaciesModel.updateOne({ sureScriptPharmacy_id: doc.sureScriptPharmacy_id }, { $set: { longitude: response.json.results[0].geometry.location.lng, latitude: response.json.results[0].geometry.location.lat} },
		function (err) {

			if(!err){


				res.set({
				"Content-Type": "application/javascript",
				"Access-Control-Allow-Origin" : "*"
				});

				console.log('Bookmark Edited!');


				resData.status = 'success';
				resData.msg = 'Bookmark successfully edited!';

				res.status(200).send(JSON.stringify(resData));
					}
					else {
						console.log(err);
						//reject();
						resData.status = 'error';
						resData.msg = 'Please try again later';

						res.set({
					"Content-Type": "application/javascript",
					"Access-Control-Allow-Origin" : "*"
					});

						res.status(200).send(JSON.stringify(resData));
					}
		}
	);


}
else {
  res.set({
  "Content-Type": "application/javascript",
  "Access-Control-Allow-Origin" : "*"
  });

  resData.status = 'failed';
  resData.msg = 'Your session is invalid. Please login again.';

  res.status(403).send(JSON.stringify(resData));
}

});

});



https.createServer(sslOptions, app).listen(port, () => console.log(`Example app listening on port ${port}!`));
//End of REST Server

//Start Static Server


// Serve up public/ftp folder
var serve = serveStatic('/home/bitnami/dist', {'index': ['index.html', 'index.htm']})

// Create server
var server = https.createServer(sslOptions, function onRequest (req, res) {
  serve(req, res, finalhandler(req, res))
})

// Listen
server.listen(staticServerPort, () => console.log(`Static Web Server listening on port ${staticServerPort}!`))


//End of Static server

//Https Redirect

const app3 = express();
function handleRedirect(req, res) {
  const targetUrl = targetBaseUrl + req.originalUrl;
  console.log(targetUrl)
  res.redirect(targetUrl);
}
app3.get('*', handleRedirect);
app3.listen(httpToHttpsRedirectPort);
