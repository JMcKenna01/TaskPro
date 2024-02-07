import $ from "./utils/jQuery.js"

const logInForm = $('.login-form')
const signUpForm = $('.signup-form')

const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = $('#email-login').val()
  const password = $('#password-login').val()

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = $('#name-signup').val()
  const email = $('#email-signup').val()
  const password = $('#password-signup').val()

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

logInForm.on('submit', loginFormHandler)
signUpForm.on('submit', signupFormHandler)