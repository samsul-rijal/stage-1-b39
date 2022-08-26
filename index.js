const express = require('express')
const db = require('./connection/db')
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')

const app = express()
const port = 8000

app.set('view engine', 'hbs') // set view engine hbs
app.use('/assets', express.static(__dirname + '/assets')) // path folder assets
app.use(express.urlencoded({ extended: false }))

app.use(flash())

app.use(session({
    secret: 'bebasapaaja',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 2 * 60 * 60 * 1000 // 2JAM
    }
}))

app.get('/', function (request, response) {
    response.render('index', {user: request.session.user, isLogin: request.session.isLogin})
})

app.get('/contact', function (request, response) {
    response.render('contact')
})


db.connect(function (err, client, done) {
    if (err) throw err // menampilkan error koneksi database

    app.get('/blog', function (request, response) {

            console.log(request.session);

            client.query('SELECT * FROM tb_blog ORDER BY id DESC', function (err, result) {
                if (err) throw err // menampilkan error dari query

                let data = result.rows
                // console.log(result.rowCount)

                let dataBlog = data.map(function (item) {
                    return {
                        ...item,
                        post_at: getFullTime(item.post_at),
                        duration: getDistanceTime(item.post_at),
                        isLogin: request.session.isLogin,
                    }
                })

                response.render('blog', {dataBlog, user: request.session.user, isLogin: request.session.isLogin })
            })
    })

    app.get('/blog-detail/:idParams', function (request, response) {
        if(!request.session.user){
            request.flash('danger', 'Silahkan login!')
            return response.redirect('/login')
        }


        let id = request.params.idParams

        db.connect(function (err, client, done) {
            if (err) throw err // menampilkan error koneksi database

            let query = `SELECT * FROM tb_blog WHERE id=${id}`

            client.query(query, function (err, result) {
                if (err) throw err // menampilkan error dari query

                console.log(result.rows[0].post_at);
                let data = result.rows
                let dataBlog = data.map(function (item) {
                    return {
                        ...item,
                        post_at: getFullTime(item.post_at),
                        isLogin,
                    }
                })

                response.render('blog-detail', { data: dataBlog[0] })
            })

        })
    })

    app.get('/add-blog', function (request, response) {
        if(!request.session.user){
            request.flash('danger', 'Silahkan login!')
            return response.redirect('/login')
        }

        response.render('add-blog')
    })

    app.post('/add-blog', function (request, response) {

        let { inputTitle: title, inputContent: content } = request.body

        db.connect(function (err, client, done) {
            if (err) throw err // menampilkan error koneksi database

            let query = `INSERT INTO tb_blog (title, content, image) VALUES
                            ('${title}','${content}','image.jpg')`

            client.query(query, function (err, result) {
                if (err) throw err // menampilkan error dari query

                response.redirect('/blog')
            })

        })

    })

    app.get('/edit-blog/:idParams', function (request, response) {
        if(!request.session.user){
            request.flash('danger', 'Silahkan login!')
            return response.redirect('/login')
        }
        
        let id = request.params.idParams

        let query = `SELECT * FROM tb_blog WHERE id=${id}`

        client.query(query, function (err, result) {
            if (err) throw err // menampilkan error dari query

            let data = result.rows[0]
            

            response.render('edit-blog', { data })
        })

    })

    app.post('/edit-blog/:idParams', function (request, response) {
        let id = request.params.idParams

        let {inputTitle, inputContent} = request.body

        // code update
        let query = `UPDATE tb_blog
        SET title='${inputTitle}', content='${inputContent}'
        WHERE id=${id}`

        client.query(query, function (err, result) {
            if (err) throw err // menampilkan error dari query            

            response.redirect('/blog')
        })

    })

    app.get('/delete-blog/:idParams', function (request, response) {

        if(!request.session.user){
            request.flash('danger', 'Silahkan login!')
            return response.redirect('/login')
        }

        
        let id = request.params.idParams
        console.log(id);
        return
        if (err) throw err // menampilkan error koneksi database

        let query = `DELETE FROM tb_blog WHERE id=${id}`

        client.query(query, function (err, result) {
            if (err) throw err // menampilkan error dari query

            response.redirect('/blog')
        })
    })

    app.get('/register', function (request, response) {
        response.render('register')
    })

    app.post('/register', function (request, response) {

        console.log(request.body);
        let { inputName, inputEmail, inputPassword } = request.body

        const hashedPassword = bcrypt.hashSync(inputPassword, 25)

        let query = `INSERT INTO public.tb_user(name, email, password)
	    VALUES ('${inputName}', '${inputEmail}', '${hashedPassword}');`

        client.query(query, function (err, result) {
        if (err) throw err // menampilkan error dari query

        response.redirect('/blog')
        })
    })

    app.get('/login', function (request, response) {
        response.render('login')
    })
    
    app.post('/login', function (request, response) {

        let { inputEmail, inputPassword } = request.body

        let query = `SELECT * FROM tb_user WHERE email='${inputEmail}'`

        client.query(query, function (err, result) {
            if (err) throw err // menampilkan error dari query

            // console.log(result.rows.length);
            console.log(result.rows[0]);
            if(result.rows.length == 0){
                console.log('Email belum terdaftar')
                request.flash('danger', 'Email belum terdaftar')
                return response.redirect('/login')
            }

            const isMatch = bcrypt.compareSync(inputPassword, result.rows[0].password)
            console.log(isMatch);

            if(isMatch){
                console.log('Login berhasil');

                request.session.isLogin = true
                request.session.user = {
                    id: result.rows[0].id,
                    name: result.rows[0].name,
                    email: result.rows[0].email,
                }
                request.flash('success', 'Login berhasil')
                response.redirect('/blog')
                
            } else {
                console.log('Password salah');
                request.flash('danger', 'Password salah')
                response.redirect('/login')
            }

        })        
    })

    app.get('/logout', function (request, response) {
        request.session.destroy()
        
        response.redirect('/login')
    })
})


function getFullTime(time) {

    let month = ["Januari", "Febuari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"]

    let date = time.getDate()
    let monthIndex = time.getMonth()
    let year = time.getFullYear()

    let hours = time.getHours()
    let minutes = time.getMinutes()

    if (hours < 10) {
        hours = "0" + hours
    } else if (minutes < 10) {
        minutes = "0" + minutes
    }

    // 12 Agustus 2022 09.04
    let fullTime = `${date} ${month[monthIndex]} ${year} ${hours}:${minutes} WIB`
    // console.log(fullTime);
    return fullTime
}

function getDistanceTime(time) {

    let timeNow = new Date()
    let timePost = time

    let distance = timeNow - timePost
    // console.log(distance);

    let milisecond = 1000 // 1 detik 1000 milisecond
    let secondInHours = 3600 // 1 jam sama dengan 3600 detik
    let hoursInDay = 24 // 1 hari 24 jam

    let distanceDay = Math.floor(distance / (milisecond * secondInHours * hoursInDay))
    let distanceHours = Math.floor(distance / (milisecond * 60 * 60))
    let distanceMinutes = Math.floor(distance / (milisecond * 60))
    let distanceSeconds = Math.floor(distance / milisecond)

    if (distanceDay > 0) {
        return `${distanceDay} day ago`
    } else if (distanceHours > 0) {
        return `${distanceHours} hours ago`
    } else if (distanceMinutes > 0) {
        return `${distanceMinutes} minutes ago`
    } else {
        return `${distanceSeconds} seconds ago`
    }
}

app.listen(port, function () {
    console.log(`server running on port ${port}`);
})