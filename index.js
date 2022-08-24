const express = require('express')

const app = express()
const port = 8000

app.set('view engine', 'hbs') // set view engine hbs
app.use('/assets', express.static(__dirname + '/assets')) // path folder assets
app.use(express.urlencoded({ extended: false }))

const db = require('./connection/db')

let isLogin = true

app.get('/', function (request, response) {
    response.render('index')
})

app.get('/contact', function (request, response) {
    response.render('contact')
})

app.get('/blog', function (request, response) {
    db.connect(function (err, client, done) {
        if (err) throw err // menampilkan error koneksi database

        client.query('SELECT * FROM tb_blog ORDER BY id DESC', function (err, result) {
            if (err) throw err // menampilkan error dari query

            let data = result.rows
            console.log(result.rowCount)

            let dataBlog = data.map(function (item) {
                return {
                    ...item,
                    post_at: getFullTime(item.post_at),
                    duration: getDistanceTime(item.post_at),
                    isLogin,
                }
            })

            response.render('blog', { isLogin, dataBlog })
        })

    })

})

app.get('/blog-detail/:idParams', function (request, response) {
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
    let id = request.params.idParams

    db.connect(function (err, client, done) {
        if (err) throw err // menampilkan error koneksi database

        let query = `SELECT * FROM tb_blog WHERE id=${id}`

        client.query(query, function (err, result) {
            if (err) throw err // menampilkan error dari query

            let data = result.rows

            response.render('edit-blog', { data: data[0] })
        })

    })
})

app.post('/edit-blog/:idParams', function (request, response) {
    let id = request.params.idParams

    // code update
})

app.get('/delete-blog/:idParams', function (request, response) {
    let id = request.params.idParams

    db.connect(function (err, client, done) {
        if (err) throw err // menampilkan error koneksi database

        let query = `DELETE FROM tb_blog WHERE id=${id}`

        client.query(query, function (err, result) {
            if (err) throw err // menampilkan error dari query

            response.redirect('/blog')
        })

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