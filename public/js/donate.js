"use strict"

let manualDonateButton = document.getElementById("manualDonate");
manualDonateButton.addEventListener("click", () => {
    window.location.href = "/visitUs";
})


let bankTransferModal = document.getElementById("bankTransferModal");


function closeModal(modalId) {
    let modal = document.getElementById(modalId);
    modal.style.display = "none";
}

function openModal(modalId) {
    let modal = document.getElementById(modalId);
    modal.style.display = "flex";


}

let bankTransferButton = document.getElementById("bankTransferButton");
bankTransferButton.onclick = function() {
    openModal("bankTransferModal")
}

let closeBankModalBtn = document.getElementById("closeBankModal");
closeBankModalBtn.addEventListener("click", function(event) {
    closeModal("bankTransferModal");
})



let usdBankTransferModal = document.getElementById("usdBankTransferModal");
let closeUSDBankModalBtn = document.getElementById("closeUSDBankModal");
let dollarDonateButton = document.getElementById("dollarDonateButton");

dollarDonateButton.onclick = function() {
    closeModal("bankTransferModal");
    openModal("usdBankTransferModal");
}

closeUSDBankModalBtn.addEventListener("click", function(event) {
    closeModal("usdBankTransferModal");
    openModal("bankTransferModal")
})


let euroBankTransferModal = document.getElementById("euroBankTransferModal");
let closeEUROBankModalBtn = document.getElementById("closeEUROBankModal");
let euroDonateButton = document.getElementById("euroDonateButton")


euroDonateButton.onclick = function() {
    closeModal("bankTransferModal");
    openModal("euroBankTransferModal")
}

closeEUROBankModalBtn.addEventListener("click", function() {
    closeModal("euroBankTransferModal");
    openModal("bankTransferModal")
})


let rubleBankTransferModal = document.getElementById("rubleBankTransferModal");
let closeRUBLEBankModalBtn = document.getElementById("closeRUBLEBankModal");
let rubleDonateButton = document.getElementById("rubleDonateButton");

rubleDonateButton.onclick = function() {
    closeModal("bankTransferModal");
    openModal("rubleBankTransferModal");
}

closeRUBLEBankModalBtn.addEventListener("click", function() {
    closeModal("rubleBankTransferModal");
    openModal("bankTransferModal")
})

window.onclick = function(event) {
    if (event.target == bankTransferModal) {
        closeModal("bankTransferModal");
    }
}



let electronicWalletButton = document.getElementById("electronicWalletButton");
let closeElectronicWalletButton = document.getElementById("closeQRCodeModal");

electronicWalletButton.onclick = function() {
    openModal("qrCodeModal");
}

closeElectronicWalletButton.addEventListener("click", function() {
    closeModal("qrCodeModal");
})




let idramQr = document.getElementById("idramQr");
let closeIdramQr = document.getElementById("closeIdramModalBtn");
idramQr.onclick = function() {
    closeModal("qrCodeModal");
    openModal("idramModal");
}


closeIdramQr.addEventListener("click", function() {
    closeModal("idramModal");
    openModal("qrCodeModal")
})



let eastWalletQr = document.getElementById("easyWalletQr");
let closeEasyWalletQr = document.getElementById("closeEasyWalletModalBtn");

eastWalletQr.onclick = function() {
    closeModal("qrCodeModal");
    openModal("easyWalletModal")
}

closeEasyWalletQr.addEventListener("click", function() {
    closeModal("easyWalletModal");
    openModal("qrCodeModal")
})


let tellcellWalletQr = document.getElementById("telcellWalletQr");
let closeTellCellWalletQr = document.getElementById("closeTellCellWalletModal");

tellcellWalletQr.onclick = function() {
    closeModal("qrCodeModal");
    openModal("telcellWalletModal")
}


closeTellCellWalletQr.addEventListener("click", function() {
    closeModal("telcellWalletModal")
    openModal("qrCodeModal")
})