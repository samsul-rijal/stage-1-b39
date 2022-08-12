
// let siswa1 = "Rizki"
// let siswa2 = "Ibrahim"
// console.log(siswa1);
// console.log(siswa2);

// Array
// let siswa = ["Rizki", "Ibrahim", "Abil", "Aditia", ]
// console.log(siswa);
// console.log(siswa[0]);
// console.log(siswa[2]);

// Object
// let dataRizki = {
//     nama: "Rizki",
//     alamat: "Jakarta",
//     umur: 20
// }
// console.log(dataRizki);
// console.log(dataRizki.nama);


// let dataIbrahim = {
//     nama: "Ibrahim",
//     alamat: "Tangerang",
//     umur: 20
// }

// console.log(dataIbrahim);
// console.log(dataIbrahim.nama);

// Array of Object

// let dataSiswa = [
//     {
//         nama: "Rizki",
//         alamat: {
//             kelurahan: "Ciputat",
//             kota: "Tangerang Selatan"
//         },
//         umur: 20
//     },
//     {
//         nama: "Ibrahim",
//         alamat: "Tangerang",
//         umur: 20
//     }
// ]

// console.log(dataSiswa);
// console.log(dataSiswa[1]);
// console.log(dataSiswa[1].nama);

// let products = [
//     {
//         name: "Aqua",
//         price: 5000
//     },
//     {
//         name: "Indomie",
//         price: 3500
//     },
// ]

// console.log(products);
// console.log(products[1]);

let dataBlog = []
function addBlog(event){
    event.preventDefault()

    let title = document.getElementById("input-blog-title").value
    let content = document.getElementById("input-blog-content").value
    let image = document.getElementById("input-blog-image").files
    
    // let startDate = document.getElementById("start").value
    // let endDate = document.getElementById("start").value

    // console.log(new Date(startDate));
    // console.log(endDate);

    let twitter = document.getElementById("twitter").checked
    let instagram = document.getElementById("instagram").checked

    if(twitter){
        twitter = document.getElementById("twitter").value
    } else {
        twitter = ''
    }
    if(instagram){
        instagram = document.getElementById("instagram").value
    } else {
        instagram = ''
    }

    console.log(twitter);
    console.log(instagram);


    // untuk membuat url gambar, agar tampil
    image = URL.createObjectURL(image[0])

    let blog = {
        title,
        content,
        image,
        author: "Samsul Rijal",
        postAt: new Date(),
        twitter,
        instagram
    }

    dataBlog.push(blog)
    // console.log(dataBlog);

    renderBlog()
}

function renderBlog(){
    
    document.getElementById("contents").innerHTML = ''

    console.log(dataBlog);
    
    for (let index = 0; index < dataBlog.length; index++) {
        
        // console.log(dataBlog[index]);
        document.getElementById("contents").innerHTML += 
        `
        <div class="blog-list-item">
            <div class="blog-image">
                <img src="${dataBlog[index].image}" alt="" />
            </div>
            <div class="blog-content">
                <div class="btn-group">
                    <button class="btn-edit">Edit Post</button>
                    <button class="btn-post">Post Blog</button>
                </div>
                <h1>
                    <a href="blog-detail.html" target="_blank"
                    >${dataBlog[index].title}</a
                    >
                </h1>
                <div class="detail-blog-content">
                    ${getFullTime(dataBlog[index].postAt)} | ${dataBlog[index].author}
                </div>
                <p>
                    ${dataBlog[index].content}
                </p>

                <i class="fa-brands fa-${dataBlog[index].twitter}"></i>
                <i class="fa-brands fa-${dataBlog[index].instagram}"></i>

                <div style="text-align: right; margin-top: 15px">
                    <span style="font-size: 12px; color:grey">${getDistanceTime(dataBlog[index].postAt)}</span>
                </div>

            </div>
        </div>
        `
    }
}


function getFullTime(time){

    let month = ["Januari", "Febuari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"]

    let date = time.getDate()
    let monthIndex = time.getMonth()
    let year = time.getFullYear()

    let hours = time.getHours()
    let minutes = time.getMinutes()

    // console.log(date);
    // console.log(month[monthIndex]);
    // console.log(year);

    // console.log(hours);
    // console.log(minutes);

    if(hours < 10){
        hours = "0" + hours
    }else if(minutes < 10){
        minutes = "0" + minutes
    }
    
    // 12 Agustus 2022 09.04
    let fullTime = `${date} ${month[monthIndex]} ${year} ${hours}:${minutes} WIB`
    // console.log(fullTime);
    return fullTime
}

function getDistanceTime(time){

    let timeNow = new Date()
    let timePost = time

    let distance = timeNow - timePost
    console.log(distance);

    let milisecond = 1000 // 1 detik 1000 milisecond
    let secondInHours = 3600 // 1 jam sama dengan 3600 detik
    let hoursInDay = 24 // 1 hari 24 jam

    let distanceDay = Math.floor(distance / (milisecond * secondInHours * hoursInDay))
    let distanceHours = Math.floor(distance / (milisecond * 60 * 60))
    let distanceMinutes = Math.floor(distance / (milisecond * 60))
    let distanceSeconds = Math.floor(distance / milisecond)

    if(distanceDay > 0){
        return `${distanceDay} day ago`
    } else if(distanceHours > 0){
        return `${distanceHours} hours ago`
    } else if(distanceMinutes > 0){
        return `${distanceMinutes} minutes ago`
    } else {
        return `${distanceSeconds} seconds ago`
    }
}

// function distanceDate(start, end){

// }



// setInterval(function(){
//     renderBlog()
// }, 3000)