const form = document.getElementById("sample-form");
const sendBtn = document.getElementById("send-btn");
const loadingSpinner = document.getElementById("loadingSpinner");
const planeIcon = document.getElementById("plane-icon");

const updateState = (state) => {
  console.log(state);
  Array.from(document.querySelectorAll(".form-control")).forEach((ip) => {
    ip.disabled = state ? true : false;
    if (!state) {
      ip.value = "";
    }
  });
  sendBtn.disabled = state ? true : false;
  loadingSpinner.style.display = state ? "inline-block" : "none";
  planeIcon.style.display = state ? "none" : "inline-block";
};

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  updateState(true);
  const formData = {};
  Array.from(document.querySelectorAll(".form-control")).forEach((i) => {
    formData[i.id] = i.value;
  });

  console.log(JSON.stringify(formData));
  try {
    const response = await fetch("https://feedback-5kf6.onrender.com/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (data) {
      alert("Mail has been sent successfully!");
      updateState(false);
    }
  } catch (error) {
    console.error("Error:", error);
    updateState(false);
  }
});
