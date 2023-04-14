document.querySelector("#formConnect").addEventListener("submit", async event => {
  event.preventDefault();

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

  if (data.ok) {
    document.querySelector("#error").style.display = "none";

    localStorage.setItem("isConnected", true);

    window.location.href = "http://127.0.0.1:5500/FrontEnd/index.html";
  } else {
    document.querySelector("#error").style.display = "block";
    document.querySelector("#email").value = "";
    document.querySelector("#mdp").value = "";
  }
});
