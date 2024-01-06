import { addRecordHandler,  recordObserver } from "./app/record";
import { productRender } from "./app/render";
import { addServiceHandler } from "./app/service";
import { manageProductHandler, printHandler, recordListHandler } from "./core/handler";
import { addRecord, addService, print, recordList } from "./core/selectors";

class Invoice {
    
    listener(){
        manageProduct.addEventListener('click', manageProductHandler)
        closeBox.addEventListener('click', manageProductHandler)
        addRecord.addEventListener('submit', addRecordHandler)
        recordList.addEventListener('click', recordListHandler)
        addService.addEventListener('submit', addServiceHandler)
        print.addEventListener('click', printHandler)
    }   
    initialRender(){
        productRender();
    }
    observer(){
        recordObserver();
    }
    init(){
        console.log("hello vite invoice");
        this.observer();
        this.initialRender();
        this.listener();
    }
}

export default Invoice;