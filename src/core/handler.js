import Swal from "sweetalert2";
import { deleteRecordRow, rowQuantityDecrease, rowQuantityIncrease } from "../app/record";
import { app, costTotal } from "./selectors";

export const manageProductHandler = () => {
    manageProductBox.classList.toggle('translate-x-full');
    manageProductBox.classList.add('duration-300')
 }

 export const recordListHandler = () => {
    const currentRow = event.target.closest('.count-row')

   // console.log("U click");
   if (event.target.classList.contains("deleteBtn")) {
      //console.log("u click");
      deleteRecordRow(event);
   } else if (event.target.classList.contains('increaseArrow')) {
      // console.log('u increase');
      //if you click svg, event don't know. So pointer event none to svg class
      rowQuantityIncrease(currentRow.getAttribute('product-id'))
   } else if (event.target.classList.contains('decreaseArrow')) {
      //console.log('u decrease');
      rowQuantityDecrease(currentRow.getAttribute('product-id'))
   }

 }


 export const printHandler = () => {

   Swal.fire({
      title: 'Are you sure?',
      text: "Do print?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if (result.isConfirmed) {
         const rows = app.querySelectorAll('.count-row');
         console.log(rows);
         const recordData = [...rows].map(row => {
             return {
                 serviceId: parseInt(row.getAttribute('product-id')),
                 quantity: parseInt(row.querySelector('.rowQuantity').innerText),
                 cost: parseFloat(row.querySelector('.row-cost').innerText),
             }
         })
         //console.log(recordData);
        setTimeout(() => {
         print();
         //window.print()
         rows.forEach(row => row.remove());
        }, 500);
      }
    })

    
    //costTotal.innerText = 0; done with observer
 }
