const imgBox = document.getElementById("image");
const qrImage = document.getElementById("qrImage");
const qrText = document.getElementById("qrText");
const downloadButton = document.getElementById("download-qr-code");
const textCount = document.getElementById("textCount");

// Text Content
const telegram = document.getElementById("telegram");
const twitter = document.getElementById("twitter");
const linkedin = document.getElementById("linkedin");
const whatsapp = document.getElementById("whatsapp");
const facebook = document.getElementById("facebook");
const instagram = document.getElementById("instagram");
const about = document.getElementById("textCount");
const address = document.getElementById("address");
const email = document.getElementById("email").value;
const phone = document.getElementById("phone");
const lastName = document.getElementById("last-name");
const firstName = document.getElementById("first-name");
const link ="your link"

const text = `Name: ${firstName.value} ${lastName.value}`
// Email: ${email}
// phone: ${phone.value}
// More: ${link}
// `
qrText.addEventListener("keyup", () => {
    textCount.textContent = qrText.value.length;
});

function generateQRCode() {
    
    // if (text) {
    //     const encodedText = encodeURIComponent(text);
    //     qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodedText}`;
    //     imgBox.classList.add("show-img");
    //     alert(text)
    // } else {
    //     qrText.classList.add("error");
    //     setTimeout(() => {
    //         qrText.classList.remove("error");
    //     }, 1000);
    // }
}

downloadButton.addEventListener("click", async () => {
    if (qrImage.src) {
        const response = await fetch(qrImage.src);
        if (!response.ok) {
            alert("Error fetching QR code image!");
            return;
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "qr_code.png";
        link.click();
        window.URL.revokeObjectURL(url);
    } else {
        alert("Please generate a QR code first!");
    }
});
