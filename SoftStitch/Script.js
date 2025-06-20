let cart = []; //array to store cart items

function addToCart(name, price, qty, size) {
    qty = parseInt(qty); //Convert quantity to int
    if (qty === 0 || isNaN(qty)) return; //If quantity is 0 or not a number
    const item = cart.find(i => i.name === name && i.size === size); //Check if item with same name and size already exist in cart
    if (item) {
        item.qty += qty; //If item exists increase quantity
    } else {
        cart.push({ name, price, qty, size }); // If does not exist add new item
    }
    updateCart(); // Update cart
}

function removeFromCart(name, size) {
    cart = cart.filter(item => !(item.name === name && item.size === size)); // Filter out item with matching name and size from cart
    updateCart(); // Update cart
}

function updateCart() {
    const cartBox = document.getElementById('cart');
    const cartList = document.getElementById('cart-items');
    const totalElem = document.getElementById('cart-total');
    const countElem = document.getElementById('cart-count');

    cartBox.style.display = cart.length ? 'block' : 'none'; // Shows/Hides cart based on items
    cartList.innerHTML = ''; // Clear cart

    let totalCost = 0; // Calculate total cost
    let totalItems = 0; // Calculate items in cart

    // Cart item with remove button
    cart.forEach(item => {
        totalCost += item.price * item.qty;
        totalItems += item.qty;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
          <span>${item.qty} x ${item.name} (Size: ${item.size}) - R${item.price * item.qty}</span>
          <button class="remove-btn" onclick="removeFromCart('${item.name}', '${item.size}')">Remove</button>`; // Remove button 
        cartList.appendChild(div);
    });

    totalElem.textContent = totalCost;
    countElem.textContent = totalItems;
}

function toggleCartDetails() { 
    /* 
    Toggle visibility of cart details section 
    Hide delivery form when toggling
    */
    const details = document.getElementById("cart-details");
    details.style.display = details.style.display === "none" ? "block" : "none";
    document.getElementById("deliveryForm").style.display = "none";
}

function showDeliveryForm() {
    //Shows cart details and delivery form
    document.getElementById("cart-details").style.display = "block";
    document.getElementById("deliveryForm").style.display = "block";
}

function hideDeliveryForm() {
    //Hides delivery form
    document.getElementById("deliveryForm").style.display = "none";
}

function submitOrder() {
    // Form values
    const name = document.getElementById("fullname").value;
    const email = document.getElementById("useremail").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const proof = document.getElementById("paymentProof").files[0];

    if (!name || !email || !phone || !address || !proof) { // Check if values are filled
        alert("Please fill in all fields and upload payment proof.");
        return;
    }

    //Order number with timestamp (YYMM) and 4 random numbers
    const now = new Date();
    const orderNum = "#SS" + String(now.getFullYear()).slice(2) +
        String(now.getMonth() + 1).padStart(2, '0') +
        Math.floor(1000 + Math.random() * 9000);

    let cartSummary = ""; //Create cart summary
    cart.forEach(item => {
        cartSummary += `${item.qty} x ${item.name} (Size: ${item.size}) = R${item.qty * item.price}\n`;
    });
    const total = document.getElementById("cart-total").textContent;

    // Create order confirmation message
    const message =
        `Order Number: ${orderNum}\n` +
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}\n` +
        `Items:\n${cartSummary}\nTotal: R${total}`;

    // Show alert with order details
    alert("Order submitted!\n\n" + message + "\n\nA confirmation email will be sent.");
    cart = [];
    updateCart();
    // Clear cart and reset form
    document.getElementById("cart-details").style.display = "none";
    document.getElementById("deliveryForm").reset();
    document.getElementById("deliveryForm").style.display = "none";
}

// Prevent default form submission
document.getElementById("orderForm").addEventListener("submit", function (e) {
    e.preventDefault();
    // Show order confirmation message
    alert("Thank you for your order! We'll be in touch soon.");
});
//886356