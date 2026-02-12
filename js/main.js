document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});

function renderProducts() {
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  products.forEach(product => {
    container.innerHTML += `
      <div class="bg-white p-3 rounded-xl shadow text-center">
        <img src="${product.image}" 
          class="w-full h-32 object-cover rounded mb-2">

        <h2 class="font-semibold text-sm">
          ${product.name}
        </h2>

        <p class="text-pink-500 font-bold">
          Rp ${product.price}
        </p>

        <button onclick="addToCart(${product.id})"
          class="bg-pink-400 text-white w-full py-2 rounded mt-2">
          Tambah
        </button>
      </div>
    `;
  });
}