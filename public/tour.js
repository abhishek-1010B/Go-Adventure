let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');
let formBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login-form-container');
let formClose = document.querySelector('#form-close');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let videoBtn = document.querySelectorAll('.vid-btn');

window.onscroll = () => {
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    loginForm.classList.remove('active')
}

menu.addEventListener('click', () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

searchBtn.addEventListener('click', () =>{
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
});

formBtn.addEventListener('click', () =>{
    loginForm.classList.add('active');
});

formClose.addEventListener('click', () =>{
    loginForm.classList.remove('active');
});
    
videoBtn.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        document.querySelector('.controls .active').classList.remove('active');
        btn.classList.add('active');
        let src = btn.getAttribute('data-src');
        document.querySelector('#video-slider').src = src;
    });
});

var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    loop:true,
    autoplay: {
        delay: 1000,
        disableOnInteraction: false,
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

var swiper = new Swiper(".brand-slider", {
    spaceBetween: 20,
    loop:true,
    autoplay: {
        delay: 1000,
        disableOnInteraction: false,
    },
    breakpoints: {
        450: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        991:{
            slidesPerView: 4,
        },
        1200:{
           slidesPerView: 5,
        },
    },
});

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");
  const loginForm = document.getElementById("login-form");
  const bookForm = document.getElementById("book-form");

  // Function to open the popup
  function openPopup(message) {
    const popup = document.getElementById("popup");
    const popupMessage = popup.querySelector("p");
    popupMessage.textContent = message;
    popup.classList.add("open-popup");
  }

  // Function to close the popup
  function closePopup() {
    const popup = document.getElementById("popup");
    popup.classList.remove("open-popup");
  }

  // Contact Form Submission
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const formObj = Object.fromEntries(formData.entries());
    try {
      const response = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObj),
      });
      if (response.ok) {
        openPopup(
          "Thank you for contacting us. We will reach back to you shortly."
        );
        contactForm.reset();
      } else {
        alert("Contact information saving failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Contact information saving failed. Please try again.");
    }
  });

  // User Signup Form Submission
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const formObj = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObj),
      });

      if (response.ok) {
        openPopup("Login successful!");
        loginForm.reset();
        // Navigate to packages.html after closing the popup
        document
          .getElementById("popup")
          .querySelector("button")
          .addEventListener("click", () => {
            window.location.href = "/packages.html";
          });
      } else {
        // Change the alert to a prompt with a signup button
        if (
          confirm("Invalid username or password. Would you like to sign up?")
        ) {
          window.location.href = "/signup.html";
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Login failed. Please try again.");
    }
  });

  // Book Form Submission
  bookForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(bookForm);
    const formObj = Object.fromEntries(formData.entries());
    try {
      const response = await fetch("/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObj),
      });
      if (response.ok) {
        openPopup(
          "Thank you for booking with us. We will reach back to you shortly."
        );
        bookForm.reset();
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Booking failed. Please try again.");
    }
  });
});
