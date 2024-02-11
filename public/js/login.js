import $ from "./utils/jQuery.js"

let logInForm = $('#login-btn')
let signUpForm = $('#signup-btn')
let roleDropdown = $('#role-dropdown')
let roleLi = $('.role-li')

const loginFormHandler = async (event) => {
  event.preventDefault()

  // Collect values from the login form
  const email = $('#email-login').val()
  const password = $('#password-login').val()

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile')
    } else {
      alert(response.statusText)
    }
  }
}

const signupFormHandler = async (event) => {
  event.preventDefault()

  const firstName = $('#first-name-signup').val()
  const lastName = $('#last-name-signup').val()
  const email = $('#email-signup').val()
  const password = $('#password-signup').val()
  const role = $(roleDropdown).text()

  if (firstName && lastName && role && email && password) {
    let newUser = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      is_manager: false, 
      is_supervisor: false,
      password: password,
    }

    switch (role){
      case 'Supervisor':
        newUser.is_supervisor = true
        break
      case 'Manager':
        newUser.is_manager = true
        break      
    }
    
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      document.location.replace('/profile')
    } else {
      alert(response.statusText)
    }
  }
}

function selectRole (event) {
  let selection = $(event.target).text()
  $(roleDropdown).text(selection)
}

logInForm.on('click', loginFormHandler)
signUpForm.on('click', signupFormHandler)
roleLi.on('click', selectRole)