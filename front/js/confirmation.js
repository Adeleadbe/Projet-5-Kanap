let params = new URLSearchParams(document.location.search);
let getId = params.get("getId");

function idDisplay() {
    let id = document.getElementById("orderId")
    id.innerText = getId;
}
idDisplay()