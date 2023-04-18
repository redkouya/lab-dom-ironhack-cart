// ITERATION 1

function updateSubtotal(product) {
  let productClass = product.querySelectorAll("td");

  let price = 0;
  let quantity = 0;
  let subtotal=0;
  productClass.forEach((element) => {
    // console.log(element.innerText,"element")
    if (element.className === "price") {
      let spanDOM = element.querySelector("span");

      price = Number(spanDOM.innerText);
      // console.log(price,"price")
    } else if (element.className === "quantity") {
      let inputQuantity = element.querySelector("input");
      quantity = Number(inputQuantity.value);
    } else if (element.className == "subtotal") {
      let spanDOM = element.querySelector("span");
      subtotal=quantity * price;
      spanDOM.innerText = subtotal;
    }
  });

  return subtotal
}

function calculateAll() {
  // code in the following two lines is added just for testing purposes.
  // it runs when only iteration 1 is completed. at later point, it can be removed.
  const everyProduct = document.querySelectorAll(".product");
  let totalValueDOM=document.querySelector("#total-value")
  //console.log(totalValueDOM,"totalValueDOM")
  // end of test

  // ITERATION 2
  let total=0;

  everyProduct.forEach((element) => {
    console.log(element, "ELEMENT");
    total+=updateSubtotal(element); // voy sumando todos los totales para luego modificar el total
  });

  // ITERATION 3
  totalValueDOM.innerText=total
}

// ITERATION 4

function removeProduct(event) {
  const target = event.currentTarget;
  console.log("The target in remove is:", target);
  target.parentNode.parentNode.remove()
  calculateAll()
}

// ITERATION 5

function createProduct(button) {
  let createproductDOM=button.target.parentNode.parentNode
  let allInputs=createproductDOM.querySelectorAll("input")
  //recorre inputs buscando el type number
  let priceNewProduct=0;
  let nameNewProduct="";

  
  allInputs.forEach((eachInput)=>{
    if(eachInput.type=="number")
    {
      priceNewProduct=eachInput.value;
      eachInput.value=0
      console.log(priceNewProduct)
    }
    else if(eachInput.type=="text")
    {
      nameNewProduct=eachInput.value
      eachInput.value=""
      console.log(nameNewProduct)
    }
  })
  let newProductHTML=`<tr class='product'> <td class='name'><span>${nameNewProduct}</span>  </td>  <td class='price'>$<span>${priceNewProduct}</span></td>  <td class='quantity'>    <input type='number' value='0' min='0' placeholder='Quantity' />  </td>  <td class='subtotal'>$<span>0</span></td>  <td class='action'>    <button class='btn btn-remove'>Remove</button>  </td></tr>  `
let allProductsDOM=document.querySelectorAll("tbody");
let lastProduct=allProductsDOM[allProductsDOM.length-1] //ultimo producto
lastProduct.innerHTML+=newProductHTML
addBtnRemoveListeners();
  
}
function addBtnRemoveListeners(){
  const removeBtns=document.querySelectorAll(".btn-remove")
  removeBtns.forEach((eachBtn)=>{
    eachBtn.addEventListener("click",removeProduct)
    
  })
}
window.addEventListener("load", () => {
  const calculatePricesBtn = document.getElementById("calculate");
  calculatePricesBtn.addEventListener("click", calculateAll);  
  //hago un metodo para poder reusarlo
  addBtnRemoveListeners()
  const createBtn=document.querySelector("#create")
  createBtn.addEventListener("click",createProduct)
  
});
