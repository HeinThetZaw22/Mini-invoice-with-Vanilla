import Swal from "sweetalert2";
import products from "../core/data";
import { app, recordList } from "../core/selectors";

export const createRow = (id, name, price, quantity) => {
    const newRow = document.createElement('tr');
    newRow.className = "border-b border-neutral-200 group";
    newRow.classList.add('count-row');
    newRow.setAttribute('product-id', id);
    newRow.innerHTML = `
    <td class="p-3"></td>
    <td class="p-3" >${name}</td>
    <td class="p-3 rowPrice text-end">${price}</td>
    
    <td class=" flex justify-end items-center">
    <button class="border-2 decreaseArrow opacity-0  group-hover:opacity-100 rounded-sm p-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
         class="w-5 h-6 pointer-events-none">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          
    </button>
    <span class="p-3 rowQuantity" min="0">${quantity}</span>
    <button class="border-2 increaseArrow opacity-0 group-hover:opacity-100 rounded-sm p-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
         class="w-5 h-6 pointer-events-none">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          
    </button>
 </td>
    <td class="p-3  text-end relative">
    <span class='row-cost'>${price * quantity}</span>
    <button class="bg-neutral-500 deleteBtn transition-all duration-300 opacity-0 group-hover:opacity-100 p-3 absolute flex translate-x-full top-0 right-0">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                  class="w-6 h-6 text-white pointer-events-none">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                   </svg>
                   
             </button>
    </td>
    `
    // const DelBtn = newRow.querySelector('.deleteBtn');
    // DelBtn.addEventListener('click', deleteRecordRow )
    return newRow;
 }

 export const deleteRecordRow = () => {
   const recordRow = event.target.closest('.count-row');
   Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if (result.isConfirmed) {
         recordRow.remove();

         //next alert box is optional
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  
   //  if (confirm("Sure to delete?")) {
   //     event.target.closest('.count-row').remove();
   //  }
 }

 const recordTotal = () => {
    const rowCost = [...app.querySelectorAll('.row-cost')]
    //object to array by destructuring
 
    costTotal.innerText = rowCost.reduce((a, i) => a + parseFloat(i.innerText), 0);
 }
 

 export const rowQuantityIncrease = (productId, quantity = 1) => {
    //console.log(event.target);
    // const currentRow = app.querySelector(`[product-id = '${productId}']`);
    const currentRow = app.querySelector(`[product-id='${productId}']`);
    // console.log(currentRow);
    const currentPrice = currentRow.querySelector('.rowPrice')
    const currentQuantity = currentRow.querySelector('.rowQuantity');
    const currentCost = currentRow.querySelector('.row-cost');
    currentQuantity.innerText = parseInt(currentQuantity.innerText) + parseInt(quantity);
    currentCost.innerText = currentQuantity.innerText * currentPrice.innerText;
 } 

 export const rowQuantityDecrease = (productId, quantity = 1) => {
    //console.log(event.target);
    //const currentRow = event.target.closest('.count-row');
    const currentRow = app.querySelector(`[product-id='${productId}']`);
 
    //console.log(currentRow);
    const currentPrice = currentRow.querySelector('.rowPrice')
    const currentQuantity = currentRow.querySelector('.rowQuantity');
    const currentCost = currentRow.querySelector('.row-cost');
    if (currentQuantity.innerText > 0) {
       currentQuantity.innerText = parseInt(currentQuantity.innerText) - 1;
       currentCost.innerText = currentQuantity.innerText * currentPrice.innerText;
    }
 }

export const addRecordHandler = (event) => {
    event.preventDefault();
    //if form include, prevent auto submit
    //collect form date
    const formData = new FormData(addRecord);
 
    //find product object with find method
    //const currentProduct = products.find(product => product.id == formData.get("product_id"))
    //destructure use instead
    const { id, name, price } = products.find(
       product => product.id == formData.get("product_id"))
 
 
    const isExistedRow = [...app.querySelectorAll('[product-id]')].find(el => {
       return el.getAttribute('product-id') == formData.get("product_id");
    })
    if (isExistedRow) {
       console.log('update');
       rowQuantityIncrease(formData.get('product_id'), formData.get('quantity'));
    } else {
       console.log("add new row");
       recordList.append(createRow(id, name, price, formData.get('quantity')))
 
    }
 
    //  console.log(formData.get("product_id"), formData.get('quantity'));
    //  console.log(currentProduct);
    addRecord.reset();
 
 }

 export const recordObserver = () => {
   const processes = () => {
      console.log(('u change in record list'));
      recordTotal();
   }
   //callback function need for mutationobserver

   const options = {
      childList : true,
      subtree : true,
   }
   const observer = new MutationObserver(processes);
   observer.observe(recordList, options);
   //(target, option)
 }