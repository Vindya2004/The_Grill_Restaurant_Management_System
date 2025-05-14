import { orderDetails_db } from "../db/db.js";
import OrderDetailsModel from "../model/OrderDetailsModel.js";

let idx = -1;

document.getElementById("orderDetails_save").addEventListener("click", () => {
    let oId = document.getElementById("oId").value.trim();
    let cId = document.getElementById("cId").value.trim();
    let iCode = document.getElementById("iCode").value.trim();
    let oQty = document.getElementById("oQty").value.trim();
    let oPrice = document.getElementById("oPrice").value.trim();

    if (!oId || !cId || !iCode || !oQty || !oPrice) {
        Swal.fire("Error", "Please fill in all required fields", "error");
        return;
    }

    let orderDetails = new OrderDetailsModel(oId, cId, iCode, parseInt(oQty), parseFloat(oPrice));
    orderDetails_db.push(orderDetails);
    loadTableData();
    clearInputs();

    Swal.fire("Added", "Order detail added successfully", "success");
});

function loadTableData() {
    let tbody = document.getElementById("order_tbody");
    tbody.innerHTML = "";

    orderDetails_db.forEach((item, index) => {
        let row = `<tr>
            <td>${item.iCode}</td>
            <td>${document.getElementById("itemName").value || "Item Name"}</td>
            <td>${item.oPrice.toFixed(2)}</td>
            <td>${item.oQty}</td>
            <td>${(item.oPrice * item.oQty).toFixed(2)}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

function clearInputs() {
    document.getElementById("iCode").value = "";
    document.getElementById("itemName").value = "";
    document.getElementById("oPrice").value = "";
    document.getElementById("oQty").value = "";
}
