// console.log("connected")\
const container = document.getElementById("products");
 // console.log(container)
const btnContainer = document.getElementById("categoryButtons");
console.log(btnContainer);
const allTab = document.getElementById("all-tab");
console.log(allTab);
const categoryButtons = document.querySelectorAll(".catagory-btns");
console.log(categoryButtons);
const productDetailModal = document.getElementById("product-detail-modal");
console.log(productDetailModal);
const reviewList = document.getElementById('review-list');



let globalProduct = [];

const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
  const allProduct = data.products;
  console.log(allProduct)
  globalProduct = allProduct;
  displayProducts(data.products);
  renderCategoryButtons(allProduct);
  displayProductDetail(allProduct, allProduct.id)
}
// all tab button
fetchProducts()

const allProductsAgainForALlTabBtn = async ()=>{
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  displayProducts(data.products);
}

// all tab button
allTab.addEventListener('click', () => {

  // select all category buttons as array
  const categoryButtons = Array.from(document.querySelectorAll(".catagory-btns"));

  // remove active class from all buttons
  categoryButtons.forEach(btn => btn.classList.remove("btn-neutral"));

  // set All button active
  allTab.classList.add("btn-neutral");

  // Show all products
  const container = document.getElementById("products");
  container.innerHTML = "";
  allProductsAgainForALlTabBtn(); // pass array of products
});


// product Detail
const displayProductDetail = (id) => {
  console.log(globalProduct, id);

  const product = globalProduct.find(product => product.id == id)
  
  if (product){
    console.log(productDetailModal);
    productDetailModal.innerHTML = `
  <!-- The Modal Trigger (Checkbox based for DaisyUI) -->
<input type="checkbox" id="product-modal" class="modal-toggle" />

<div class="modal modal-bottom sm:modal-middle " role="dialog">
  <div class="modal-box max-w-3xl p-0 ">
    
    <!-- Close Button -->
    <label for="product-modal" class="btn btn-sm btn-circle btn-ghost absolute right-1 top-0 z-10">✕</label>

    <div class="flex flex-col md:flex-row">
      <!-- Product Image Section -->
      <div class="md:w-1/2 bg-base-200 flex items-center justify-center p-6">
        <img src="${product.images}" 
             alt="${product.title}" 
             class="rounded-xl shadow-lg hover:scale-105 transition-transform duration-300" />
      </div>

      <!-- Product Content Section -->
      <div class="md:w-1/2 p-6 flex flex-col justify-between">
        <div>
          <div class="flex justify-between items-start">
            <span class="badge badge-secondary badge-outline uppercase text-xs font-bold tracking-widest mb-2">
              ${product.category}
            </span>
            <span class="badge badge-error gap-2 text-white font-semibold">
              -${product.discountPercentage}% OFF
            </span>
          </div>
          
          <h3 class="text-2xl font-bold text-base-content">${product.title}</h3>
          <p class="text-sm text-base-content/70 mt-1">Brand: <span class="font-medium">${product.brand}</span></p>

          <!-- Rating & Stock -->
          <div class="flex items-center gap-4 my-3">
            <div class="rating rating-sm">
              <input type="radio" class="mask mask-star-2 bg-orange-400" disabled ${product.rating >= 1 ? 'checked' : ''} />
              <input type="radio" class="mask mask-star-2 bg-orange-400" disabled ${product.rating >= 2 ? 'checked' : ''} />
              <input type="radio" class="mask mask-star-2 bg-orange-400" disabled ${product.rating >= 3 ? 'checked' : ''} />
              <input type="radio" class="mask mask-star-2 bg-orange-400" disabled />
              <input type="radio" class="mask mask-star-2 bg-orange-400" disabled />
              <span class="ml-2 text-sm font-semibold">${product.rating}</span>
            </div>
            <div class="divider divider-horizontal m-0"></div>
            <span class="text-xs font-bold text-success uppercase">${product.availabilityStatus}</span>
          </div>

          <p class="text-sm leading-relaxed text-base-content/80 line-clamp-3">
            ${product.description}
          </p>

          <!-- Specs List -->
          <div class="grid grid-cols-2 gap-2 mt-4 text-xs">
            <div class="bg-base-200 p-2 rounded"><strong>Warranty:</strong> ${product.warrantyInformation}</div>
            <div class="bg-base-200 p-2 rounded"><strong>Shipping:</strong> ${product.shippingInformation}</div>
            <div class="bg-base-200 p-2 rounded"><strong>Return:</strong> ${product.returnPolicy}</div>
            <div class="bg-base-200 p-2 rounded"><strong>Stock:</strong> ${product.stock} units</div>
          </div>
        </div>

        <!-- Footer: Price & Action -->
        <div class="mt-6 flex items-center justify-between border-t pt-4">
          <div>
            <span class="text-3xl font-extrabold text-primary">$${product.price}</span>
            <span class="text-sm line-through ml-2 opacity-50">$${(product.price * 1.1).toFixed(2)}</span>
          </div>
          <button class="btn btn-primary px-8">Add to Cart</button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Click outside to close -->
  <label class="modal-backdrop" for="product-modal">Close</label>
</div>

  `
  }

}



// display Products
function displayProducts(allProduct){
 
  container.innerHTML=" ";

  allProduct.forEach(product =>{
    const div = document.createElement("div");
    div.className="card bg-base-100 shadow-xl";

    div.innerHTML=`
     <figure><img src="${product.thumbnail}" class=" w-full object-cover"/></figure>
    <div class="card-body">
      <h2 class="card-title">${product.title}</h2>
      <p class="text-lg font-semibold">$${product.price}</p>
      <p class="text-sm">Rating: ${product.rating} ⭐</p>
      <p class="text-sm ${product.stock>0 ? 'text-green-600' : 'text-red-600'}">
        ${product.stock>0 ? 'In Stock' : 'Out of Stock'}
      </p>
      <div class="card-actions justify-end mt-2">
        <label for="product-modal" class="btn btn-primary btn-sm" onclick="displayProductDetail(${product.id})">View Details</label>
      </div>
    </div>
    `;

    container.appendChild(div);
  });
}


function renderCategoryButtons(allProduct){
//  const btnContainer = document.getElementById("categoryButtons");

  // Get unique categories
  const allProducts= [...allProduct]
  const categories = [...new Set(allProducts.map(p => p.category))];
  console.log(categories)

  categories.forEach((cat, index) => {

    createCategoryButton(cat, index, btnContainer, allProduct);
    
  });
}
renderCategoryButtons()
 

// Filter Products
function filterCategory(category, allProduct){
  if(category === "All"){
    displayProducts(allProduct);
  } else {
    const filtered = allProduct.filter(p => p.category === category);
    
    displayProducts(filtered);
  }
}

function createCategoryButton(cat, index, container, allProduct){
  // Create button
  const btn = document.createElement("button");

  // Unique id বা dataset
  btn.id = `cat-btn-${index}`;
  btn.dataset.category = cat;

  // Classes
  btn.className = "btn  btn-outline catagory-btns";

  // Text
  btn.innerText = cat.toUpperCase();

    if(cat === "All"){
    btn.classList.add("btn-neutral");
  }
 
  // Event listener
  btn.addEventListener("click", (e) => {
    // Remove active class from all buttons
    const allBtns = container.querySelectorAll(".catagory-btns");
    allBtns.forEach(b => b.classList.remove("btn-neutral"));

   

    // Add active class to clicked button
    e.currentTarget.classList.add("btn-neutral");
    e.currentTarget.classList.remove("btn-outline");
    

    // Filter products
    filterCategory(cat, allProduct);
  });

  // Append to container
  container.appendChild(btn);
  // console.log(btn)
}



function addToCart(id){
  cart.push(id);
  localStorage.setItem("cart",JSON.stringify(cart));
  // showCart();
  showSuggestions(id);
}

// ২. রিভিউগুলো UI-তে দেখানোর ফাংশন
function addNewReview() {
    // ১. Input field gulo theke value neya
    const userName = document.getElementById('user-name').value;
    const userComment = document.getElementById('user-comment').value;
    const starRating = document.querySelector('input[name="star-rating"]:checked').value;
    
    // Validation: Name ba Comment faka thakle alert dibe
    if (userName.trim() === "" || userComment.trim() === "") {
        alert("Please enter your name and review.");
        return;
    }

    // ২. Ajker date format kora (DD/MM/YYYY)
    const today = new Date();
    const dateStr = today.getDate().toString().padStart(2, '0') + '/' + 
                    (today.getMonth() + 1).toString().padStart(2, '0') + '/' + 
                    today.getFullYear();

    // ৩. Review list container-ti khuje ber kora
    const reviewList = document.getElementById('review-list');

    // ৪. Notun review element create kora (Exactly existing style e)
    const newReview = document.createElement('div');
    newReview.className = 'py-5 border-t border-base-200'; // border-t add kora hoyeche divide korar jonno

    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        starsHtml += `<input type="radio" class="mask mask-star-2 bg-orange-400" aria-label="${i} star" ${i == starRating ? 'checked="checked"' : ''} disabled />`;
    }

    newReview.innerHTML = `
        <div class="flex justify-between items-center mb-1">
            <span class="font-bold text-sm text-secondary">${userName}</span>
            <span class="text-[10px] opacity-40 italic">${dateStr}</span>
        </div>
        <div class="rating rating-[10px] mb-2">
            ${starsHtml}
        </div>
        <p class="text-sm text-base-content/70 leading-relaxed">${userComment}</p>
    `;

    // ৫. List-er shurute notun review-ti add kora
    reviewList.prepend(newReview);

    // ৬. Input field gulo empty/clear kore deya
    document.getElementById('user-name').value = '';
    document.getElementById('user-comment').value = '';
    // Rating default 3-te set kora
    const defaultRating = document.querySelector('input[name="star-rating"][value="3"]');
    if (defaultRating) defaultRating.checked = true;
}
