const express = require('express')

const app = express()
const port = 8000

app.set('view engine', 'hbs') // set view engine hbs
app.use('/assets', express.static(__dirname + '/assets')) // path folder assets
app.use(express.urlencoded({extended: false}))

app.get('/', function(request, response){
    response.render('index')
})

app.get('/contact', function(request, response){
    response.render('contact')
})

let isLogin = true

app.get('/blog', function(request, response){
    response.render('blog', {isLogin})
})

app.get('/blog-detail/:id', function(request, response){
    let id = request.params.id
    console.log(id);

    response.render('blog-detail', {
        id,
        title: 'Selamat Datang',
        content: 'lorem ipsum',
        author: 'Samsul Rijal',
        postAt: '18 Agustus 2022'
    })
})

app.get('/add-blog', function(request, response){
    response.render('add-blog')
})

app.post('/add-blog', function(request, response){
    console.log(request.body);
    let title = request.body.inputTitle
    let content = request.body.inputContent

    console.log(title);
    console.log(content);

    response.redirect('/blog')
})

app.listen(port, function(){
    console.log(`server running on port ${port}`);
})