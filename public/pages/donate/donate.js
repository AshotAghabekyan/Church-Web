"use strict"

const manualDonateButton = document.getElementById("manualDonate");
manualDonateButton.addEventListener("click", () => window.location.href = "/visitUs")



function modalDisplayHandler(modalElement, closeElement) {
    modalElement.showModal();
    modalElement.classList.add("visible");
    closeElement.addEventListener("click", () => {
        modalElement.close();
        modalElement.classList.remove("visible");
    })
}



function showBankTransferVariants() {
    const bankTransferModal = document.getElementById("bankTransferModal");
    const closeBankModal = document.getElementById('closeBankModal');
    modalDisplayHandler(bankTransferModal, closeBankModal);
}

const bankTransferVariant = document.getElementById("bankTransferButton");
bankTransferVariant.addEventListener("click", showBankTransferVariants)




function showRubleDonateModal() {
    const rubleDonateModal = document.getElementById("rubleBankTransferModal");
    const closeModal = document.getElementById("closeRubleBankModal");
    modalDisplayHandler(rubleDonateModal, closeModal);
}

const rubleDonateButton = document.getElementById("rubleDonateButton");
rubleDonateButton.addEventListener("click", showRubleDonateModal);``




function showDollarDonateModal() {
    const usdDonateModal = document.getElementById("usdBankTransferModal");
    const closeModal = document.getElementById("closeUsdBankModal");
    modalDisplayHandler(usdDonateModal, closeModal); 
}

const dollarDonateButton = document.getElementById('dollarDonateButton');
dollarDonateButton.addEventListener("click", showDollarDonateModal);



function showEuroDonateModal() {
    const euroDonateModal = document.getElementById('euroBankTransferModal');
    const closeModal = document.getElementById("closeEuroBankModal");
    modalDisplayHandler(euroDonateModal, closeModal);
}

const euroDonateButton = document.getElementById('euroDonateButton');
euroDonateButton.addEventListener("click", showEuroDonateModal);






function showElectronicWalletVariants() {
    const qrCodeModal = document.getElementById("electronicWalletModal");
    const closeModal = document.getElementById("closeElectronicWalletModal");
    modalDisplayHandler(qrCodeModal, closeModal);
}

const electronicWalletVariant = document.getElementById('electronicWalletButton');
electronicWalletVariant.addEventListener("click", showElectronicWalletVariants)




function showEasyWalletModal() {
    const easyWalletModal = document.getElementById("easyWalletModal");
    const closeModal = document.getElementById("closeEasyWalletModalBtn");
    modalDisplayHandler(easyWalletModal, closeModal);
}

const easyWalletModalBtn = document.getElementById("easyWalletQr");
easyWalletModalBtn.addEventListener("click", showEasyWalletModal)





function showIdramModal() {
    const idramModal = document.getElementById("IdramWalletModal");
    const closeModal = document.getElementById("closeIdramModalBtn");
    modalDisplayHandler(idramModal, closeModal);
}

const idramModalBtn = document.getElementById("idramQr");
idramModalBtn.addEventListener("click", showIdramModal)





function showTelcellWalletModal() {
    const telcellModal = document.getElementById("telcellWalletModal");
    const closeModal = document.getElementById("closeTelcellModalBtn");
    modalDisplayHandler(telcellModal, closeModal);
}

const telcellWalletModalBtn = document.getElementById("telcellWalletQr");
telcellWalletModalBtn.addEventListener("click", showTelcellWalletModal)




