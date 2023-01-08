/* eslint-disable */

import { login } from './login';
import { signup } from './signup';

// DOM elements
const loginForm = document.querySelector('.form_login');
const signupForm = document.querySelector('.form_signup');

// Delegation
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
          console.log('click')
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            login(email, password);
        });
      };

    if (signupForm) {
          signupForm.addEventListener('submit', (e) => {
              e.preventDefault();
              const name = document.getElementById('name').value;
              const email = document.getElementById('email').value;
              const password = document.getElementById('password').value;
              const confirmPassword = document.getElementById('password-confirm').value;
              signup(name, email, password, confirmPassword);
          });
      };