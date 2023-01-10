import {HOUSE_DESCRIPTION_MAX_LENGTH, HOUSE_NAME_MAX_LENGTH} from "../../constants";


export function validateDescription (descriptionText) {
    if(descriptionText.length === 0) {
        return {
            validateStatus: 'error',
            errorMsg: 'Please enter your description!'
        }
    } else if (descriptionText.length > HOUSE_DESCRIPTION_MAX_LENGTH) {
        return {
            validateStatus: 'error',
            errorMsg: `Description is too long (Maximum ${HOUSE_DESCRIPTION_MAX_LENGTH} characters allowed)`
        }
    } else {
        return {
            validateStatus: 'success',
            errorMsg: null
        }
    }
}

export function validateName (nameText) {
    if(nameText.length === 0) {
        return {
            validateStatus: 'error',
            errorMsg: 'Please enter your house name!'
        }
    } else if (nameText.length > HOUSE_NAME_MAX_LENGTH) {
        return {
            validateStatus: 'error',
            errorMsg: `Name is too long (Maximum ${HOUSE_NAME_MAX_LENGTH} characters allowed)`
        }
    } else {
        return {
            validateStatus: 'success',
            errorMsg: null
        }
    }
}

export function validateLocation(location) {
    if(location == null) {
        return {
            validateStatus: 'error',
            errorMsg: 'Please select a location for your house!'
        }
    } else {
        return {
            validateStatus: 'success',
            errorMsg: null
        }
    }
}

export function validateRoomImageFiles(roomImageFiles) {
    if (roomImageFiles == undefined || roomImageFiles == null)
    {
        return {
            validateStatus: 'error',
            errorMsg: 'Please select your room image!'
        }
    }

    if(roomImageFiles.length < 1) {
        return {
            validateStatus: 'error',
            errorMsg: 'Please select your room image!'
        }
    } else {
        return {
            validateStatus: 'success',
            errorMsg: null
        }
    }
}
