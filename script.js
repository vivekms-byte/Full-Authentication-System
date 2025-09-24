// Country → State → City Data
const locationData = {
  India: {
    Karnataka: ["Bengaluru", "Mysuru"],
    Maharashtra: ["Mumbai", "Pune"],
  },
  USA: {
    California: ["San Francisco", "Los Angeles"],
    Texas: ["Houston", "Dallas"],
  },
};

const form = document.getElementById("signupForm");
const submitBtn = document.getElementById("submitBtn");

const countrySelect = document.getElementById("country");
const stateSelect = document.getElementById("state");
const citySelect = document.getElementById("city");

// Populate states when country changes
countrySelect.addEventListener("change", function () {
  stateSelect.innerHTML = '<option value="">Select State</option>';
  citySelect.innerHTML = '<option value="">Select City</option>';

  const states = locationData[this.value];
  if (states) {
    Object.keys(states).forEach((state) => {
      const opt = document.createElement("option");
      opt.value = state;
      opt.textContent = state;
      stateSelect.appendChild(opt);
    });
  }
});

// Populate cities when state changes
stateSelect.addEventListener("change", function () {
  citySelect.innerHTML = '<option value="">Select City</option>';

  const cities = locationData[countrySelect.value]?.[this.value];
  if (cities) {
    cities.forEach((city) => {
      const opt = document.createElement("option");
      opt.value = city;
      opt.textContent = city;
      citySelect.appendChild(opt);
    });
  }
});

// Profile image preview
document.getElementById("profileImage").addEventListener("change", (e) => {
  const file = e.target.files[0];
  const preview = document.getElementById("preview");
  preview.innerHTML = "";
  if (file) {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    preview.appendChild(img);
  }
});

// Validation on input
form.addEventListener("input", validateForm);

function validateForm() {
  let valid = true;

  // Full Name
  const name = document.getElementById("fullName").value.trim();
  document.getElementById("nameError").textContent =
    name.length < 3 ? "Name too short" : "";

  // Email
  const email = document.getElementById("email").value.trim();
  const emailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  document.getElementById("emailError").textContent =
    !emailValid ? "Invalid email" : "";

  // Password
  const password = document.getElementById("password").value;
  const passValid = password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
  document.getElementById("passwordError").textContent =
    !passValid ? "Min 8 chars, 1 uppercase, 1 number" : "";

  // Phone
  const phone = document.getElementById("phone").value.trim();
  const phoneValid = /^\+?[1-9]\d{6,14}$/.test(phone);
  document.getElementById("phoneError").textContent =
    !phoneValid ? "Invalid phone" : "";

  // Country/State/City
  if (!countrySelect.value) {
    document.getElementById("countryError").textContent = "Required";
    valid = false;
  } else document.getElementById("countryError").textContent = "";

  if (!stateSelect.value) {
    document.getElementById("stateError").textContent = "Required";
    valid = false;
  } else document.getElementById("stateError").textContent = "";

  if (!citySelect.value) {
    document.getElementById("cityError").textContent = "Required";
    valid = false;
  } else document.getElementById("cityError").textContent = "";

  // DOB
  const dob = document.getElementById("dob").value;
  document.getElementById("dobError").textContent = dob ? "" : "Required";

  // Interests
  const interests = document.querySelectorAll('input[name="interests"]:checked');
  document.getElementById("interestsError").textContent =
    interests.length === 0 ? "Select at least one" : "";

  // Terms
  const terms = document.getElementById("terms").checked;
  document.getElementById("termsError").textContent =
    !terms ? "You must accept terms" : "";

  // Check errors
  const errors = document.querySelectorAll(".error");
  errors.forEach((err) => {
    if (err.textContent !== "") valid = false;
  });

  submitBtn.disabled = !valid;
}

// Form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Form submitted successfully!");
  console.log("Form values captured ✅");
});
