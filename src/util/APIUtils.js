import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const APPLICATION_JSON = 'application/json';

const request = (options, contentType = 'application/json') => {

    // if the content type if 'application/json', we use the Content-Type header, otherwise we don't use any header
    const headers = APPLICATION_JSON == contentType ? new Headers({'Content-Type':contentType})
                                                    : new Headers({});

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    console.log(options)
    return fetch(options.url, options)
    .then(response => {
            return response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        }
    );
};

export function getAllHomes() {

    return request({
        url: API_BASE_URL + "/home/",
        method: 'GET'
    });
}

export function getAllServices(){
    return request({
        url: API_BASE_URL+ "/providers/services/",
        method: 'GET'
    })
}

export function getAllUsers() {

    return request({
        url: API_BASE_URL + "/users/",
        method: 'GET'
    });
}

// export function getAllBills() {
//
//     return request({
//         url: API_BASE_URL + "/bills/",
//         method: 'GET'
//     });
// }
//
export function getAllBillsOfAHouse(id) {

    return request({
        url: API_BASE_URL + "/bills/search/" + id,
        method: 'GET'
    });
}

export function getAllHomeLocations() {

    return request({
        url: API_BASE_URL + "/location/homelocations",
        method: 'GET'
    });
}

export function getFavoriteHouses() {

    return request({
        url: API_BASE_URL + "/favorites/mine",
        method: 'GET'
    });
}

export function addFavoriteHouse(id) {

    return request({
        url: API_BASE_URL + "/favorites/" + id,
        method: 'POST'
    });
}

export function removeFavoriteHouse(id) {

    return request({
        url: API_BASE_URL + "/favorites/" + id,
        method: 'DELETE'
    });
}

export function getAllUserHouses() {

    return request({
        url: API_BASE_URL + "/home/mine",
        method: 'GET'
    });
}

export function getHouse(id) {

    console.log("WILL GET HOUSE " + id)
    return request({
        url: API_BASE_URL + "/home/" + id,
        method: 'GET'
    });
}

export function searchHouse(name) {

    console.log("WILL GET HOUSE " + name)
    return request({
        //url: API_BASE_URL + "/home/search/" + name,
        url: `${API_BASE_URL}/home/search/${name}`,
        method: 'GET'
    });
}

export function deleteHouse(id) {

    console.log("WILL DELETE HOUSE " + id)
    return request({
        url: API_BASE_URL + "/home/" + id,
        method: 'DELETE'
    });
}


export function createHouse(houseData) {
    return request({
        url: API_BASE_URL + "/home/",
        method: 'POST',
        body: JSON.stringify(houseData)
    });
}

export function editHouse(houseData) {
    return request({
        url: API_BASE_URL + "/home/",
        method: 'PUT',
        body: JSON.stringify(houseData)
    });
}


export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}


export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/users/" + username,
        method: 'GET'
    });
}

export function submitIndex(billIndex){
    console.log("SUBMIT INDEX",billIndex);
    return request({
        url: API_BASE_URL + "/bills/index",
        method: 'POST',
        body: JSON.stringify(billIndex)
    });
}

