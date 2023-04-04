const wrapper = document.querySelector('.wrapper'),
form = wrapper.querySelector("form"),
fileInp = form.querySelector("input"),
infoText = form.querySelector("p"),
copyBtn = wrapper.querySelector(".copy"),
closeBtn = wrapper.querySelector(".close")

const fetchRequest = (formData, file) => {
    infoText.innerText = "Scanning your QR code..."
    fetch("https://api.qrserver.com/v1/read-qr-code/", {
        method: "POST", body: formData
    })
    .then(res => res.json())
    .then(result => {
        result = result[0].symbol[0].data;
        console.log('hii')
        if(!result) {
            wrapper.querySelector('textarea').innerText = "Invalid QR Code";
            form.querySelector("img").src = URL.createObjectURL(file);
        }
        
        else {
            wrapper.querySelector('textarea').innerText = result;
            
            form.querySelector("img").src = URL.createObjectURL(file);
        }
        infoText.innerText = 'Upload QR Code to Read';
        wrapper.classList.add("active");
        console.log(result)
    });
}

fileInp.addEventListener("change", e => {
    let file = e.target.files[0]; //getting file selected by user
    if(!file) return;
    let formData = new FormData(); //creating new FormData object
    formData.append("file", file); //adding selected file to formData
    fetchRequest(formData, file);
})

copyBtn.addEventListener("click", () => {
    let text = wrapper.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
})

closeBtn.addEventListener("click", () => {
    wrapper.classList.remove("active");
})

form.addEventListener("click", () => fileInp.click());
//Access-Control-Allow-Origi

const wrap = document.querySelector('.wrapperGenerate');
const generateBtn = document.querySelector('.generate');
const qrInput = document.querySelector('.form input');
const qrImg = document.querySelector('.qr-code img')

generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value;
    if(!qrValue) return;
    generateBtn.innerText = 'Generating QR'
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrValue}`;
    
    qrImg.addEventListener('load', () => {
        wrap.classList.add("active");
        generateBtn.innerText = 'Generate QR Code';
      })
})

qrInput.addEventListener("keyup", () => {
    if(!qrInput.value) {
        wrap.classList.remove("active");
    }
})