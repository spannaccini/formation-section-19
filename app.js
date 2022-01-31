const express = require('express');
const app = express();


const path = require('path');
const fs = require('fs');

app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static('public')); // to serving static files
app.use(express.urlencoded({extended:false}));

app.get('/', function(req,res){
    res.render('index');
});

app.get('/restaurants', function(req,res){
     const filePath = path.join(__dirname,'data','restaurants.json');
    const readData = fs.readFileSync(filePath);
    const sharedRestaurants = JSON.parse(readData);
    res.render('restaurants', {numberOfRestaurants : sharedRestaurants.length, restaurants: sharedRestaurants});
  
});

app.get('/recommend', function(req,res){
    res.render('recommend');
});

app.post('/recommend', function(req,res){
    const newRestaurant = req.body;
    const filePath = path.join(__dirname,'data','restaurants.json');

    const readData = fs.readFileSync(filePath);
    const sharedRestaurants = JSON.parse(readData);
    console.log(sharedRestaurants);

    sharedRestaurants.push(newRestaurant);
    
    const storedRestaurants = JSON.stringify(sharedRestaurants);
    fs.writeFileSync(filePath, storedRestaurants);
    
    res.redirect('/confirm');
})

app.get('/confirm', function(req,res){
    res.render('confirm');
});

app.get('/about', function(req,res){
    res.render('about'); 
});


app.listen(3000);