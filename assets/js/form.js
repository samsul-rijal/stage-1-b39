// document.write("Hello World")
// alert("Hello")
// console.log("Hello Batch 39")

// VAR
// LET
// CONST

// // Variable
// // bisa di declarasi ulang
// var gelas = "Kopi"
// var gelas = "Air Putih"
// console.log(gelas);

// // tidak bisa di declare ulang
// let mangkok = "Bakso"
// mangkok = "Mie Ayam"
// console.log(mangkok);

// // data tidak bisa diubah
// const botol = "Jeruk"
// console.log(botol);


// --------------------------
// // Type Data
// let nama = "Rahmat"
// let umur = 25

// // Nama saya Rahmat umur saya 25
// console.log(`nama saya ${nama} umur saya ${umur}`)
// console.log("nama saya", nama, "umur saya", umur)
// console.log("nama saya" + " " + nama + " " + "umur saya" + " " + umur)


// let bilanganSatu = 50
// let bilanganDua = "20"

// console.log(bilanganSatu - bilanganDua);

// -------------------------------
// // Condition

// let nilai = 60
// if (nilai > 70){
//     console.log("A");
// } else if(nilai >= 60 ) {
//     console.log("B");
// } else {
//     console.log("C");
// }


// // Function
// function bilangan(bilanganSatu, bilanganDua){

//     result = bilanganSatu + bilanganDua    
//     console.log(result);

// }

// bilangan(20,30)

// function bilangan(bilanganSatu, bilanganDua){

//     result = bilanganSatu + bilanganDua
    
//     return result

// }

// console.log(bilangan(30, 50));

function submitData(){

    let name = document.getElementById("input-name").value
    let email = document.getElementById("input-email").value
    let phone = document.getElementById("input-phone").value
    let subject = document.getElementById("input-subject").value
    let message = document.getElementById("input-message").value

    // if(name == "" || email == "" || phone == ""){
    //    return alert("semua kolom wajib diisi")
    // } 

    if(email == ""){
       return alert("name wajib diisi")
    } else if(email == ""){
       return alert("email wajib diisi")
    } else if(phone == ""){
       return alert("phone wajib diisi")
    } else if(subject == ""){
       return alert("subject wajib diisi")
    } else if(message == ""){
       return alert("message wajib diisi")
    }

    console.log(name);
    console.log(email);
    console.log(phone);
    console.log(subject);
    console.log(message);

    let emailReceiver = "rizal@mail.com"
    
    // membuat tag a
    // <a href="mailto:samsul@mail.com.com?subject=hallo&body=Isi pesan">example</a>
    let a = document.createElement('a')
    a.href=`mailto:${emailReceiver}?subject=${subject}&body=Hallo nama saya ${name}, ${message}, silahkan kontak saya dengan email ${email}, telp ${phone}`
    a.click()

    let siswa = {
        name,
        email,
        phone,
        subject,
        message
    }
    console.log(siswa);   
}
