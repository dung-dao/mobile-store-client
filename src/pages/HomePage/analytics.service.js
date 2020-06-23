import http from "../../services/http";

export async function getOverall(begin, end, by) {
    return (await http.get(
        '/analytics',
        {
            params: {begin, end, by}
        }
    )).data;
}
