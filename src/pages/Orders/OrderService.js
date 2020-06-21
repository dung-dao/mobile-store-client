import http from "../../services/http";

export async function createOrder(order) {
    const res = await http.post('/orders', order);
    if (Math.floor(res.status / 100) === 2)
        return res.data;
    else
        return null;

}
