// Listen to incoming HTTP requests, can only be used on the server

//var bodyParser = Npm.require("body-parser");
//WebApp.connectHandler
//WebApp.connectHandlers.use("/api/v1/training", function (req, res, next) {
//  var headers = req.headers;
//  var method = req.method;
//  // validate api_key password
//  if (!headers.api_key === "123") {
//    res.writeHead(401);
//    res.end("Not authorized");
//    return;
//  }
//  if (method === "POST") {
//    var trainingDoc = req.body;
//    try {
//      console.log("inserting", trainingDoc);
//      var trainingId = Services.Training.insertTraining(trainingDoc, function (e) {
//        res.writeHead(400);
//        res.end("Wrong from parameter: \n" + e.message + "\n" + e.details);
//      });
//      if (trainingId) {
//        res.writeHead(303, {
//          "Location": "/api/v1/training/" + trainingId
//        });
//        res.end();
//      }
//
//    } catch (ex) {
//
//      console.log("error", ex);
//    }
//  }
//
//
//});

function redirectToTrainingView(trainingId) {
  this.setStatusCode(303);
  this.addHeader("Location", "/api/v1/training/" + trainingId)
}
HTTP.methods({
  'api/v1/training/:id': {
    "get": function () {
      var t = Training.findOne(this.params.id)

      console.log("GET", this.params.id)
      return JSON.stringify(t);
    },
    "put": function (data) {
      var trainingId = this.params.id;
      var count =Services.Training.updateTraining(trainingId,data);
      if(count<=0){
        console.error("-----------EEROROR------")
      }
      else if(count>1){
        console.error("-----------EEROROR------")
      }
      else {
        redirectToTrainingView.call(this, trainingId)
      }


    },
    "delete": function () {
      console.log("DELETE")
    }
  },
  "api/v1/training": {
    "get": function () {
      console.log("GET 2")
    },
    "post": function (data) {
      console.log("POST 2", data)

      try {
        console.log("inserting", data);
        var trainingId = Services.Training.insertTraining(data);
        if (trainingId) {
          redirectToTrainingView.call(this, trainingId);
          return;
        }

      } catch (ex) {

        this.setStatusCode(400);
        return JSON.stringify({
          message : ex.message,
          details : ex.details
        })

      }


    }
  }
});
//HTTP.methods({
//  '/api/v1/training/:id': function (data) {
//    console.log("method", data, this.params.id, this.method)
//    if (this.method=== "GET") {
//      var t = Training.findOne(this.params.id);
//      this.setStatusCode(200);
//
//      return JSON.stringify(t);
//    } else if(this.method === "POST") {
//      console.log("updating TBD");
//      return JSON.stringify(data);
//    }
//  }
//
//});
//HTTP.methods({
//
//  '/api/v1/training': function (data) {
//
//    console.log("collection",data);
//    if (this.method === "GET") {
//
//      var items = Training.find({}, {limit: 20}).fetch()
//      this.setStatusCode(200);
//      return JSON.stringify(items);
//
//    } else if(this.method==="POST") {
//      //insert
//      console.log("inserting");
//      var tId = Services.Training.insertTraining(data);
//      this.setStatusCode(303);
//      this.addHeader('Location', '/api/v1/training/' + tId);
//
//    }
//  }
//});

//HTTP.methods({
//  '/api/v1/hello': {
//    get: function(data) {
//      console.log("get")
//    },
//     post: function(data) {
//       console.log("post")
//     }//,
//    // put: function(data) {},
//    // delete: function(data) {},
//    // options: function() {
//    //   // Example of a simple options function
//    //   this.setStatusCode(200);
//    //   this.addHeader('Accept', 'POST,PUT');
//    //    // The options for this restpoint
//    //    var options = {
//    //      POST: {
//    //        description: 'Create an issue',
//    //        parameters: {
//    //          title: {
//    //            type: 'string',
//    //            description: 'Issue title'
//    //          }
//    //        }
//    //       }
//    //    };
//    //    // Print the options in pretty json
//    //    return JSON.stringify(options, null, '\t');
//    //  }
//  }
//});


//WebApp.connectHandlers.use("/api/v1/training/:_id", function (req, res, next) {
//  var trainingId = req.params._id;
//  console.log(req.params)
//  console.log(trainingId)
//
//});