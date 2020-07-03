import {categorySelector, createCategory, getCategoryById, updateCategory} from "../../redux/CategorySlice";

export const resourceName = "categories";
export const detailPageTitle = "Chi tiết sản phẩm";
export const _selector = categorySelector;
export const _createAC = createCategory;
export const _updateAC = updateCategory;
export const _getByIdAC = getCategoryById;
