var FoodOrder = require

function getOrders(res) {
    FoodOrder.find(function (err, orders) {

     
        if (err) {
            res.send(err);
        }

        res.json(orders); 
    });
}
;

module.exports = function (app) {

    
    app.get('/api/food', function (req, res) {
        
        getOrders(res);
    });

   
    app.post('/api/food', function (req, res) {
       
        FoodOrder.create({
            name: req.body.name,
            price: req.body.price,
            done: false
        }, function (err, order) {
            if (err)
                res.send(err);

           
            getOrders(res);
        });

    });

   
    app.delete('/api/food/:food_id', function (req, res) {
        FoodOrder.remove({
            _id: req.params.food_id
        }, function (err, order) {
            if (err)
                res.send(err);

            getOrders(res);
        });
    });

  
    app.get('/api/total', function (req, res) {
       res.sendFile(__dirname + '/public/index2.html');
        getOrders(res);
    });
    
    app.get('/api/total', function (req, res) {
       res.sendFile(__dirname + '/public/signup.html');
        getOrders(res);
    });
    

    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); 
    });
};
