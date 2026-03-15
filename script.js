// console.log("connected")\
const container = document.getElementById("products");
 // console.log(container)
const btnContainer = document.getElementById("categoryButtons");
console.log(btnContainer);
const allTab = document.getElementById("all-tab");
console.log(allTab);
const categoryButtons = document.querySelectorAll(".catagory-btns");
console.log(categoryButtons);



const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
  const allProduct = data.products;
  console.log(allProduct)
  displayProducts(data.products);
  renderCategoryButtons(allProduct);
  // filterCategory(data.products)
  // showCart(data.products);
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
        <label for="product-modal" class="btn btn-primary btn-sm" onclick="openModal(${product.id})">View Details</label>
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




function addToCart(id){
  cart.push(id);
  localStorage.setItem("cart",JSON.stringify(cart));
  // showCart();
  showSuggestions(id);
}


function addReview(){
  const name=document.getElementById("name").value;
  const rating=document.getElementById("rating").value;
  const comment=document.getElementById("comment").value;

  reviews.push({name,rating,comment});

  const div=document.getElementById("reviews");
  div.innerHTML="";

  reviews.forEach(r=>{
    div.innerHTML+=`
      <p><b>${r.name}</b> ⭐${r.rating}</p>
      <p>${r.comment}</p>
      <hr>
    `;
  });
}


// showCart();


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

