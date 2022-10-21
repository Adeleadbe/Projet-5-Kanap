const params = new URLSearchParams(document.location.search);
const getId = params.get("getId");

function idDisplay() {
    const id = document.getElementById("orderId")
    id.innerText = getId;
}
idDisplay()