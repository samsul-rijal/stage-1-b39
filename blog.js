
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

    // untuk membuat url gambar, agar tampil
    image = URL.createObjectURL(image[0])

    let blog = {
        title,
        content,
        image,
        author: "Samsul Rijal",
        postAt: "11 Agustus 2022"
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
                    ${dataBlog[index].postAt} | ${dataBlog[index].author}
                </div>
                <p>
                    ${dataBlog[index].content}
                </p>
            </div>
        </div>
        `
    }
}
