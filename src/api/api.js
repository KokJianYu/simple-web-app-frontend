const axios = require('axios').default;

// const endpoint = "https://xjdc7hzp3j.execute-api.ap-southeast-1.amazonaws.com/dev"

const ServerlessAPI = axios.create({
    // baseURL: `https://xjdc7hzp3j.execute-api.ap-southeast-1.amazonaws.com/dev`,
    baseURL: `http://localhost:8080`,
    headers: {
    //   Authorization: 'allow'
    }
});

// const LocalAPI = axios.create({
//     baseURL: `localhost:8080`,
// });

const API = ServerlessAPI;

const getFlashCard = async () => {
    let response = await API.get("/flashCard");
    return response;
}

const addFlashCard = async (front, behind) => {
    let response = await API.post("/flashCard", {
        front:front,
        behind:behind
    });
    return response;
}

const editFlashCard = async (id, front, behind) => {
    let response = await API.put("/flashCard", {
        id:id,
        front:front,
        behind:behind
    });
    return response;
}

// Content-type not sent for some reason
const deleteFlashCard = async (id) => {
    let response = await API.delete("/flashCard", {
        id:id
    });
    return response;
}

export default {
    getFlashCard,
    addFlashCard,
    editFlashCard,
    deleteFlashCard
}