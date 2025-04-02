const express = require('express');
const app = express();
app.set('view engine', 'ejs');
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req,res)=>{
    res.render("hisaab");
});
app.listen(3000);
