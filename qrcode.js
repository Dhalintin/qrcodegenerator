const imgBox = document.getElementById("image");
const qrImage = document.getElementById("qrImage");
const qrText = document.getElementById("qrText");
const downloadButton = document.getElementById("download-qr-code");
const textCount = document.getElementById("textCount");

qrText.addEventListener("keyup", () => {
    textCount.textContent = qrText.value.length;
});

function generateQRCode() {
    if (qrText.value.length) {
        const text = qrText.value;
        const encodedText = encodeURIComponent(text);
        qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodedText}`;
        imgBox.classList.add("show-img");
    } else {
        qrText.classList.add("error");
        setTimeout(() => {
            qrText.classList.remove("error");
        }, 1000);
    }
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
