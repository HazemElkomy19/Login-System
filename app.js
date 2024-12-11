document.addEventListener("DOMContentLoaded", () => {

  const users = JSON.parse(localStorage.getItem("users")) || [];


  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("newUsername").value.trim();
      const email = document.getElementById("newEmail").value.trim();
      const password = document.getElementById("newPassword").value;

      if (users.some((user) => user.email === email)) {
        document.getElementById("check-signup").innerHTML=`
        <div class="alert alert-danger mt-3">
      <small>Email already registered!</small>
    </div>
        `
      } else {
        users.push({ username, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Signed up successfully!");
        window.location.href = "index.html";
      }
    });
  }

  
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;

      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
       
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "home.html";
      } else {
        document.getElementById("check").innerHTML=`
        <div class="alert alert-danger mt-3">
      <small>Invalid email or password!</small>
    </div>
        `
      }
    });
  }


  const welcomeMessage = document.getElementById("welcomeMessage");
  if (welcomeMessage) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      welcomeMessage.textContent = `Welcome  ${currentUser.username}!`;
    } else {
      alert("You must log in first!");
      window.location.href = "index.html";
    }
  }

  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.href = "index.html";
    });
  }
});
