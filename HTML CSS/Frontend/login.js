const form = document.getElementById("loginForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // 🔐 Static login check
  if (email === "umair@gmail.com" && password === "umair12@3") {
    localStorage.setItem("isAdmin", "true");

    // 🔁 Redirect (React navigate replacement)
    window.location.href = "admin.html"; // change if needed
  } else {
    alert("Invalid credentials");
  }
});