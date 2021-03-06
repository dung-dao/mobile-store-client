import http from "../services/http";

export const getAll = async (resourceUrl) => {
    const items = await http.get(resourceUrl);
    return items.data;
}

export const pathSelector = (state) => state.router.location.pathname;