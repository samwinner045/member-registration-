// ============================================
// 1. SELECT ALL REQUIRED HTML ELEMENTS
// ============================================

// Form
const form = document.getElementById("regform");

// Input fields
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const genderInput = document.getElementById("gender");
const dobInput = document.getElementById("dob");
const countryInput = document.getElementById("country");
const phoneInput = document.getElementById("phone");
const bioInput = document.getElementById("bio");

// Error messages
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");
const genderError = document.getElementById("genderError");
const dobError = document.getElementById("dobError");
const countryError = document.getElementById("countryError");
const phoneError = document.getElementById("phoneError");
const bioError = document.getElementById("bioError");

// Other elements
const successMsg = document.getElementById("successMsg");
const memberList = document.getElementById("memberList");
const memberCounter = document.getElementById("count");
const emptyNote = document.getElementById("emptyNote");
const darkModeButton = document.getElementById("theme");

// Select all input, select and textarea elements
const allFields = form.querySelectorAll("input, select, textarea");

// Select all error message elements
const allErrors = form.querySelectorAll(".error");


// ============================================
// 2. LOG ELEMENTS TO THE CONSOLE
// ============================================

console.log("Registration form:", form);
console.log("All form fields:", allFields);
console.log("All error elements:", allErrors);
console.log("Success message:", successMsg);
console.log("Member list:", memberList);
console.log("Member counter:", memberCounter);
console.log("Empty list message:", emptyNote);
console.log("Dark Mode button:", darkModeButton);


// ============================================
// 3. STORE REGISTERED MEMBERS
// ============================================

const members = [];


// ============================================
// 4. VALIDATE FULL NAME
// ============================================

function validateName() {
    const name = nameInput.value.trim();

    if (name === "") {
        nameError.textContent = "Full name is required.";
        return false;
    }

    if (name.length < 2) {
        nameError.textContent =
            "Name must contain at least 2 characters.";
        return false;
    }

    nameError.textContent = "";
    return true;
}


// ============================================
// 5. VALIDATE EMAIL
// ============================================

function validateEmail() {
    const email = emailInput.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        emailError.textContent = "Email address is required.";
        return false;
    }

    if (!emailPattern.test(email)) {
        emailError.textContent =
            "Please enter a valid email address.";
        return false;
    }

    emailError.textContent = "";
    return true;
}


// ============================================
// 6. VALIDATE PASSWORD
// ============================================

function validatePassword() {
    const password = passwordInput.value;

    if (password === "") {
        passwordError.textContent = "Password is required.";
        return false;
    }

    if (password.length < 8) {
        passwordError.textContent =
            "Password must contain at least 8 characters.";
        return false;
    }

    passwordError.textContent = "";
    return true;
}


// ============================================
// 7. VALIDATE CONFIRM PASSWORD
// ============================================

function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (confirmPassword === "") {
        confirmError.textContent =
            "Please confirm your password.";
        return false;
    }

    if (password !== confirmPassword) {
        confirmError.textContent =
            "Passwords do not match.";
        return false;
    }

    confirmError.textContent = "";
    return true;
}


// ============================================
// 8. VALIDATE GENDER
// ============================================

function validateGender() {
    if (genderInput.value === "") {
        genderError.textContent = "Please select your gender.";
        return false;
    }

    genderError.textContent = "";
    return true;
}


// ============================================
// 9. VALIDATE DATE OF BIRTH
// ============================================

function validateDOB() {
    const dob = dobInput.value;

    if (dob === "") {
        dobError.textContent = "Date of birth is required.";
        return false;
    }

    const selectedDate = new Date(dob);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (Number.isNaN(selectedDate.getTime())) {
        dobError.textContent = "Please enter a valid date.";
        return false;
    }

    if (selectedDate > today) {
        dobError.textContent =
            "Date of birth cannot be in the future.";
        return false;
    }

    dobError.textContent = "";
    return true;
}


// ============================================
// 10. VALIDATE COUNTRY
// ============================================

function validateCountry() {
    const country = countryInput.value.trim();

    if (country === "") {
        countryError.textContent = "Country is required.";
        return false;
    }

    if (country.length < 2) {
        countryError.textContent =
            "Please enter a valid country name.";
        return false;
    }

    countryError.textContent = "";
    return true;
}


// ============================================
// 11. VALIDATE PHONE NUMBER
// ============================================

function validatePhone() {
    const phone = phoneInput.value.trim();

    // Allow digits, spaces, +, hyphens and parentheses.
    const phonePattern = /^\+?[0-9\s()-]{7,20}$/;

    // Count the actual digits.
    const digits = phone.replace(/\D/g, "");

    if (phone === "") {
        phoneError.textContent = "Phone number is required.";
        return false;
    }

    if (!phonePattern.test(phone) || digits.length < 7 ||
        digits.length > 15) {
        phoneError.textContent =
            "Please enter a valid phone number.";
        return false;
    }

    phoneError.textContent = "";
    return true;
}


// ============================================
// 12. VALIDATE BIO
// ============================================

function validateBio() {
    const bio = bioInput.value.trim();

    if (bio === "") {
        bioError.textContent =
            "Please tell us something about yourself.";
        return false;
    }

    if (bio.length < 10) {
        bioError.textContent =
            "Bio must contain at least 10 characters.";
        return false;
    }

    bioError.textContent = "";
    return true;
}


// ============================================
// 13. CAPTURE FORM SUBMISSION
// ============================================

form.addEventListener("submit", function (event) {

    // Prevent the page from refreshing.
    event.preventDefault();

    // Hide any previous success message.
    successMsg.textContent = "";
    successMsg.classList.add("hidden");

    // Validate every field.
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmValid = validateConfirmPassword();
    const isGenderValid = validateGender();
    const isDOBValid = validateDOB();
    const isCountryValid = validateCountry();
    const isPhoneValid = validatePhone();
    const isBioValid = validateBio();

    // Register only if all fields are valid.
    const formIsValid =
        isNameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmValid &&
        isGenderValid &&
        isDOBValid &&
        isCountryValid &&
        isPhoneValid &&
        isBioValid;

    if (!formIsValid) {
        return;
    }

    // Create a member object.
    const member = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        gender: genderInput.value,
        dob: dobInput.value,
        country: countryInput.value.trim(),
        phone: phoneInput.value.trim(),
        bio: bioInput.value.trim()
    };

    // Register the member.
    registerMember(member);

    // Show success message.
    successMsg.textContent =
        "Member registered successfully!";

    successMsg.classList.remove("hidden");

    // Reset all form fields.
    form.reset();

    // Clear all validation errors.
    clearAllErrors();

});


// ============================================
// 14. CLEAR ERRORS AS USERS CORRECT THEIR INPUT
// ============================================

nameInput.addEventListener("input", validateName);

emailInput.addEventListener("input", validateEmail);

passwordInput.addEventListener("input", function () {
    validatePassword();

    if (confirmPasswordInput.value !== "") {
        validateConfirmPassword();
    }
});

confirmPasswordInput.addEventListener(
    "input",
    validateConfirmPassword
);

genderInput.addEventListener("change", validateGender);

dobInput.addEventListener("change", validateDOB);

countryInput.addEventListener("input", validateCountry);

phoneInput.addEventListener("input", validatePhone);

bioInput.addEventListener("input", validateBio);


// ============================================
// 15. REGISTER A MEMBER USING THE DOM
// ============================================

function registerMember(member) {

    // Save the member in the array.
    members.push(member);

    // Remove the empty-list message.
    if (emptyNote) {
        emptyNote.remove();
    }

    // Create a list item.
    const listItem = document.createElement("li");

    listItem.classList.add("member-item");

    // Create member details.
    const details = document.createElement("div");

    details.classList.add("member-details");

    // Add information safely using textContent.
    const memberName = document.createElement("h3");
    memberName.textContent = member.name;

    const memberEmail = document.createElement("p");
    memberEmail.textContent = "Email: " + member.email;

    const memberGender = document.createElement("p");
    memberGender.textContent = "Gender: " + member.gender;

    const memberDOB = document.createElement("p");
    memberDOB.textContent = "Date of Birth: " + member.dob;

    const memberCountry = document.createElement("p");
    memberCountry.textContent = "Country: " + member.country;

    const memberPhone = document.createElement("p");
    memberPhone.textContent = "Phone: " + member.phone;

    const memberBio = document.createElement("p");
    memberBio.textContent = "Bio: " + member.bio;

    // Add details to the member information container.
    details.append(
        memberName,
        memberEmail,
        memberGender,
        memberDOB,
        memberCountry,
        memberPhone,
        memberBio
    );

    // Create a Remove button.
    const removeButton = document.createElement("button");

    removeButton.type = "button";
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn");

    // Remove the member when clicked.
    removeButton.addEventListener("click", function () {
        removeMember(member, listItem);
    });

    // Add details and button to the list item.
    listItem.append(details, removeButton);

    // Add the list item to the member list.
    memberList.appendChild(listItem);

    // Update the counter.
    updateMemberCounter();
}


// ============================================
// 16. UPDATE THE MEMBER COUNTER
// ============================================

function updateMemberCounter() {
    memberCounter.textContent = members.length;
}


// ============================================
// 17. REMOVE A MEMBER
// ============================================

function removeMember(member, listItem) {

    // Find the member in the array.
    const index = members.indexOf(member);

    if (index !== -1) {
        members.splice(index, 1);
    }

    // Remove the member from the HTML.
    listItem.remove();

    // Update the counter.
    updateMemberCounter();

    // Show the empty-list message when no members remain.
    if (members.length === 0) {
        const note = document.createElement("li");

        note.id = "emptyNote";
        note.classList.add("empty");

        note.textContent =
            "No members yet. Register someone to begin.";

        memberList.appendChild(note);
    }

    // Display confirmation.
    successMsg.textContent = "Member removed successfully!";

    successMsg.classList.remove("hidden");
}


// ============================================
// 18. CLEAR ALL VALIDATION ERRORS
// ============================================

function clearAllErrors() {
    allErrors.forEach(function (error) {
        error.textContent = "";
    });
}


// ============================================
// 19. DARK MODE TOGGLE
// ============================================

darkModeButton.addEventListener("click", function () {

    // Toggle the dark-mode class on the page.
    document.body.classList.toggle("dark-mode");

    // Check whether dark mode is active.
    const darkModeActive =
        document.body.classList.contains("dark-mode");

    // Update the button text.
    if (darkModeActive) {
        darkModeButton.textContent = "Light Mode";
    } else {
        darkModeButton.textContent = "Dark Mode";
    }

});