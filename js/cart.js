let cart = [];

function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID").format(number);
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCart();
}

function updateCart() {
  const container = document.getElementById("cart-items");
  const totalElement = document.getElementById("total");
  const countElement = document.getElementById("cart-count");

  container.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach(item => {
    const subtotal = Number(item.price) * Number(item.qty);
    total += subtotal;
    count += Number(item.qty);

    container.innerHTML += `
  <div class="flex justify-between items-center mb-3 border-b pb-2">

    <div class="flex-1">
      <p class="font-semibold">${item.name}</p>
      <p class="text-sm text-gray-500">
        Rp ${formatRupiah(item.price)}
      </p>
    </div>

    <input 
      type="number"
      min="1"
      value="${item.qty}"
      onchange="updateQty(${item.id}, this.value)"
      class="w-16 border text-center rounded p-1"
    >

    <button 
      onclick="removeItem(${item.id})"
      class="ml-2 text-red-500 font-bold">
      ❌
    </button>

  </div>
`;
  });

  totalElement.innerText = formatRupiah(total);
  countElement.innerText = count;
}

function updateQty(id, value) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  let qty = parseInt(value);

  if (isNaN(qty) || qty < 1) {
    qty = 1;
  }
  
  item.qty = qty;
  updateCart();
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function toggleCart() {
  document.getElementById("cart").classList.toggle("hidden");
  document.getElementById("overlay").classList.toggle("hidden");
}

function checkout() {
  if (cart.length === 0) {
    alert("Keranjang kosong!");
    return;
  }

  const name = document.getElementById("customer-name").value;
  const address = document.getElementById("customer-address").value;

  if (!name || !address) {
    alert("Isi nama dan alamat dulu ya 😊");
    return;
  }

  let message = `Halo, saya ingin pesan:%0A`;
  message += `Nama: ${name}%0A`;
  message += `Alamat: ${address}%0A%0A`;

  let total = 0;

  cart.forEach(item => {
    message += `- ${item.name} (${item.qty}x)%0A`;
    total += item.price * item.qty;
  });

  message += `%0ATotal: Rp ${formatRupiah(total)}`;

  const phone = "628987493159";

  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
}