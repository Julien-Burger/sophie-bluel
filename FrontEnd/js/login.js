document.querySelector("#formConnect").addEventListener("submit", event => {
  event.preventDefault();

  checkLogin();
});

async function checkLogin() {
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

  if (response.token) {
    localStorage.setItem("userId", response.userId);
    localStorage.setItem("token", response.token);
  
    document.querySelector("#error").style.display = "none";
  
    window.location.href = "./index.html";
  } else {
    document.querySelector("#error").style.display = "block";
    document.querySelector("#email").value = "";
    document.querySelector("#mdp").value = "";
  }
}
