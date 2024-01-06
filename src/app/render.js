//renders[showing data into UI]

import products from "../core/data";
import { productSelect, serviceList } from "../core/selectors";
import { createService } from "./service";

//destructuring parameter
export const productRender = () => {
   products.forEach(({ name, id, price }) => {
        productSelect.append(new Option(name, id));
        serviceList.append(createService(id, name, price));
     })
}
 
 