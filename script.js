const  fetchProducts = async () =>{
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
  console.log(data.products);
  displayProducts(data.products);
  renderCategoryButtons(data.products);
  // filterCategory(data.products)
  // showCart(data.products);
}
fetchProducts()
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let reviews = [];

function displayProducts(allProduct){
  const container = document.getElementById("products");
  console.log(container)
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
  const btnContainer = document.getElementById("categoryButtons");
  btnContainer.innerHTML = "";

  // Get unique categories
  const categories = ["All", ...new Set(allProduct.map(p => p.category))];
  console.log(categories)

  categories.forEach(cat=>{
    const btn = document.createElement("button");
    btn.className = "btn btn-sm btn-outline";
    btn.innerHTML = `
    <dutton id="catagory-btn-$${cat}" >${cat}</dutton>
    `
    btn.addEventListener("click",()=> filterCategory(cat, allProduct));
    btnContainer.appendChild(btn);
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

