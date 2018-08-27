const Vehicle = require('../../models/Vehicle');
var debug = require('debug')('express:api');


module.exports = (app) => {
    /***
     * METHOD: GET
     * Return : json with all the Vehicles
     ***/
    app.get('/api/vehicles', (req, res, next) => {


        debug("/**GET ALL vehicle METHOD**/ ");
        debug("Requset URL: " + req.url);
        debug("Requset Method: " + req.method);
        Vehicle.find()
            .exec()
            .then((car) => {
                res.json(car)
                debug("Query Result for Vehicle.find ALL:  " + car);
            })
            .catch((err) => {
                console.log(err);
                next(err)
            });
    });
    /***
     * METHOD: GET
     * Return : json with the Vehicle detail's for specific Vehicle
     ***/
    app.get('/api/vehicles/:id', (req, res, next) => {
        debug("/**FIND vehicle BY ID AND RETURN IT METHOD**/ ");
        debug("Requset URL: " + req.url);
        debug("Requset Method: " + req.method);
        debug("Requset Params.id: " + req.params.id);
        Vehicle.find({_id: req.params.id})
            .exec()
            .then((car) => {
                res.json(car)
                debug("Query Result for Vehicle.find #id:" + req.params.id + " " + car);
            })
            .catch((err) => {
                console.log(err);
                next(err)
            });
    });

    /***
     * METHOD: POST
     * Return : json with the new Vehicles after ADDING to db
     ***/
    app.post('/api/vehicles/add', function (req, res, next) {
        debug("/**ADD NEW vehicle METHOD**/ ");
        debug("Requset URL: " + req.url);
        debug("Requset Method: " + req.method);
        debug("Requset Body name: " + req.body.name);
        debug("Requset Body Car_type: " + req.body.Car_type);

        const vehicle = new Vehicle(req.body);
        vehicle.save()
            .then(() => {
                debug("Add vehicle to the DB Complete successful");
                debug("Add this vehicle: " + vehicle);
                res.json(vehicle)
            })
            .catch((err) => {
                console.log(err);
                next(err)
            });
    });


    /***
     * METHOD: POST
     * Return : ---
     * UPDATE: update param for specific Vehicle
     ***/
    app.post('/api/vehicles/:id/edit', function (req, res, next) {
        debug("/**FIND vehicle BY ID AND UPDATE METHOD**/ ");
        debug("Requset URL: " + req.url);
        debug("Requset Method: " + req.method);
        const objParam = (req.body);
        debug("Requset Body: name: " + objParam.name);
        debug("Requset Body: name: " + objParam.Car_type);

        Vehicle.findOneAndUpdate({_id: req.params.id}, {name: objParam.name, Car_type: objParam.Car_type})
            .exec()
            .catch((err) => {
                console.log(err);
                next(err)
            });
        debug("Find vehicle with #id: " + req.params.id + " And Update it's New Value: #Name:" + objParam.name + " & #Car_type:" + objParam.Car_type + " in the DB");
    });


    /***
     * METHOD: DELETE
     * Return : json with the new Vehicles after DELETE from db
     * DELETE: delete specific Vehicle from db
     ***/
    app.delete('/api/vehicles/:id', function (req, res, next) {
        debug("/**DELETE vehicle METHOD**/ ");
        debug("Requset URL: " + req.url);
        debug("Requset Method: " + req.method);
        debug("Requset Params.id: " + req.params.id);
        Vehicle.findOneAndRemove({_id: req.params.id})
            .exec()
            .then((car) => {
                debug("Find vehicle with #id: " + req.params.id + " And Remove it from the DB");
                res.json()
            })
            .catch((err) => {
                console.log(err);
                next(err)
            });
    });

};
