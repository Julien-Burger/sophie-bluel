document.querySelector("#formConnect").addEventListener("submit", event => {
  event.preventDefault();

  checkLogin();
});

async function checkLogin() {
  try {
    const loginInfo = {
      email: document.querySelector("#email").value,
      password: document.querySelector("#mdp").value,
    };

    const chargeUtile = JSON.stringify(loginInfo);

    const data = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: chargeUtile,
    });

    const response = await data.json();

    localStorage.setItem("userId", response.userId);
    localStorage.setItem("token", response.token);

    document.querySelector("#error").style.display = "none";

    window.location.href = "http://127.0.0.1:5500/FrontEnd/index.html";
  } catch (error) {
    console.warn(error);
    document.querySelector("#error").style.display = "block";
    document.querySelector("#email").value = "";
    document.querySelector("#mdp").value = "";
  }
}
