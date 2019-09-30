const validate = (value, rules) => {
    let valid = {
        isValid: true,
        error: ''
    }

    if(rules.required) {
        valid = requiredValidation(value);
    }

    if(value && rules.minLength) {
        valid = minLengthValidation(value, rules.minLength);
    }

    if(value && rules.ageLimit) {
        valid = ageLimitValidation(value, rules.ageLimit);
    }

    if(value && rules.isEmail) {
        valid = emailValidation(value);
    }

    return valid;
}

const requiredValidation = value => {
    if(!value) {
        return {
            isValid: false,
            error: 'Field is Required'
        }
    } else {
        return {
            isValid: true,
            error: ''
        }
    }
};

const minLengthValidation = (value, lenght) => {
    if(value.length < lenght) {
        return {
            isValid: false,
            error: `Must be more than ${lenght} characters`
        } 
    } else {
        return {
            isValid: true,
            error: ''
        }
    }
}

const ageLimitValidation = (value, limit) => {
    const re = /^[0-9]{1,2}[:.,-]?$/;
    if(value < limit) {
        return {
            isValid: false,
            error: `Age limit - You must be ${limit} years old`
        }
    } else if(!re.test(value)) {
        return {
            isValid: false,
            error: 'Please enter valid age'
        }
    } else {
        return {
            isValid: true,
            error: ''
        }
    }
}

const emailValidation = value => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(value.toLowerCase())) {
        return {
            isValid: false,
            error: `Please insert valid Email Address`
        }
    } else {
        return {
            isValid: true,
            error: ''
        }
    }
}

export default validate;