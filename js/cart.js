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
    total += item.price * item.qty;
    count += item.qty;

    container.innerHTML += `
      <div class="flex justify-between mb-2">
        <div>
          <p class="font-semibold">${item.name}</p>
          <p>Rp ${formatRupiah(item.price)} x ${item.qty}</p>
        </div>
        <div>
          <button onclick="changeQty(${item.id}, -1)" class="px-2 bg-gray-200">-</button>
          <button onclick="changeQty(${item.id}, 1)" class="px-2 bg-gray-200">+</button>
        </div>
      </div>
    `;
  });

  totalElement.innerText = formatRupiah(total);
  countElement.innerText = count;
}

function changeQty(id, amount) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += amount;

  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }

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