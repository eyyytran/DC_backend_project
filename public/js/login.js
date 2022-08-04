const { appUrl } = require('../../globals')

const submitBtn = document.getElementById('l-submitbtn')
const form = document.getElementById('l-form')
const errorMessage = document.getElementById('login-error')

//utilities
const isRequired = value => (value === '' ? false : true)

const isLength = (length, min, max) =>
    length < min || length > max ? false : true

const isEmail = email => {
    const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return re.test(email)
}

//validations
const checkEmail = e => {
    let valid = false
    const email = e.target.form[0].value
    if (!isRequired(email)) {
        showError(e.target.form[0], 'Please enter your email.')
    } else if (!isEmail(email)) {
        console.log(isEmail(email))
        showError(e.target.form[0], 'This is not an email. Try again.')
    } else {
        showSuccess(e.target.form[0])
        valid = true
    }
    return valid
}

const checkPassword = e => {
    let valid = false
    const min = 8
    const max = 50
    const password = e.target.form[1].value

    if (!isRequired(password)) {
        showError(e.target.form[1], 'Please enter a password')
    } else if (!isLength(password.length, min, max)) {
        showError(
            e.target.form[1],
            'Passwords are between 8 and 50 characters long.'
        )
    } else {
        showSuccess(e.target.form[1])
        valid = true
    }
    return valid
}

//response to user
const showError = (input, message) => {
    const formField = input.parentElement
    formField.classList.remove('success')
    formField.classList.add('error')
    const feedback = formField.querySelector('small')
    feedback.textContent = message
}

const showSuccess = input => {
    const formField = input.parentElement
    formField.classList.remove('error')
    formField.classList.add('success')
    const feedback = formField.querySelector('small')
    feedback.textContent = ''
}

const handleErrors = response => {
    if (!response.ok) {
        throw Error(response.statusText)
    }
    return response
}

//forms and submissions
const formValidate = e => {
    let isEmailValid = checkEmail(e),
        isPasswordValid = checkPassword(e)

    let isFormValid = isPasswordValid && isEmailValid

    return isFormValid
}

const submitForm = async e => {
    const Email = e.target.form[0].value
    const Password = e.target.form[1].value
    const data = {
        email: Email,
        password: Password,
    }
    try {
        const request = await fetch(`${appUrl}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        handleErrors(request)
        window.location.href = appUrl + '/dashboard'
    } catch (error) {
        errorMessage.innerHTML = 'Records do not match the data provided.'
    }
}

submitBtn.onclick = e => {
    e.preventDefault()
    let isFormValid = formValidate(e)

    if (!isFormValid) {
        console.log('Will not be submitted')
        alert('Unable to submit form')
    } else {
        console.log('Will be submitted')
        submitForm(e)
    }
}
