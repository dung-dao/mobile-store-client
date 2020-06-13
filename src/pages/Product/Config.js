import {createProduct, getProductById, updateProduct} from "../../redux/ProductSlice";

export const resourceName = "products";
export const detailPageTitle = "Chi tiết sản phẩm";
export const createAC = createProduct;
export const updateAC = updateProduct;
export const getByIdAC = getProductById;