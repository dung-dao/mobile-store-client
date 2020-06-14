import {createProduct, getProductById, productSelector, updateProduct} from "../../redux/ProductSlice";

export const resourceName = "products";
export const detailPageTitle = "Chi tiết sản phẩm";
export const _selector = productSelector;
export const _createAC = createProduct;
export const _updateAC = updateProduct;
export const _getByIdAC = getProductById;