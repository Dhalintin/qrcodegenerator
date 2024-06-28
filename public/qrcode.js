const { response } = require("express");

const downloadButton = document.getElementById("download-qr-code");

// Text Content
const telegram = document.getElementById("telegram");
const twitter = document.getElementById("twitter");
const linkedin = document.getElementById("linkedin");
const whatsapp = document.getElementById("whatsapp");
const facebook = document.getElementById("facebook");
const instagram = document.getElementById("instagram");
const about = document.getElementById("about");
const address = document.getElementById("address");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const lastName = document.getElementById("last-name");
const firstName = document.getElementById("first-name");
const whatsappCheck = document.getElementById('whatsapp-check');
const telegramCheck = document.getElementById("telegram-check");

whatsappCheck.addEventListener('change', ()=>{
    if(whatsappCheck.checked && phone.value.length > 0){
      whatsapp.value = phone.value;
    }else{
      whatsappCheck.checked = false
      whatsapp.value = "";
    }
})

telegramCheck.addEventListener('change', ()=>{
    if(telegramCheck.checked && phone.value.length > 0){
        telegram.value = phone.value;
    }else{
        whatsappCheck.checked = false
        telegram.value = "";
    }
});

const clicker = document.getElementById('clicker')

    clicker.addEventListener('click', ()=>{
      alert('click');
    })

function generateQRCode() {
    fetch('http://127.0.0.1:3000/api/v1/user/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
            "firstname": firstName.value ? firstName.value : "",
            "lastname": lastName.value ? lastName.value : "",
            "email": email.value ? email.value : "",
            "address": address.value ? address.value : "",
            "about": about.value ? about.value : "",
            "phone": phone.value ? phone.value : "",
            "facebook": facebook.value ? `https://www.facebook.com/${facebook.value}` : "",
            "linkedin": linkedin.value ? `https://www.linkedin.com/in/${linkedin.value}` : "",
            "instagram": instagram ? `https://www.instagram.com/${instagram}` : "",
            "whatsapp": whatsapp.value ? `https://www.wa.me/${whatsapp.value}` : "",
            "telegram": telegram.value ? `t.me/${telegram.value}` : "",
            "twitter": twitter.value ? `https://twitter.com/${twitter.value}` : "",
          },
    }).then(response => response.json())
        .then(data => {
            alert(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
    });
}