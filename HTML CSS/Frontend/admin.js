const tableBody = document.getElementById("tableBody");
const logoutBtn = document.getElementById("logoutBtn");

// 🔐 Check Admin Access
const isAdmin = localStorage.getItem("isAdmin");

if (!isAdmin) {
  window.location.href = "/login.html";
}

// 📥 Fetch Messages
async function fetchMessages() {
  try {
    const res = await fetch("http://localhost:8080/api/messages");
    const data = await res.json();

    tableBody.innerHTML = "";

    data.forEach((msg) => {
      const row = `
        <tr>
          <td>${msg.name}</td>
          <td>${msg.email}</td>
          <td>${msg.category}</td>
          <td>${msg.subject}</td>
          <td>${msg.message}</td>
          <td>${msg.status}</td>
          <td>
            <button class="delete-btn" onclick="deleteMessage('${msg.id}')">
              Delete
            </button>
            <button class="resolve-btn" onclick="updateStatus('${msg.id}')">
              Mark Resolved
            </button>
          </td>
        </tr>
      `;

      tableBody.innerHTML += row;
    });

  } catch (err) {
    console.error(err);
  }
}

// ❌ Delete
async function deleteMessage(id) {
  await fetch(`http://localhost:8080/api/messages/${id}`, {
    method: "DELETE",
  });
  fetchMessages();
}

// ✅ Update Status
async function updateStatus(id) {
  await fetch(
    `http://localhost:8080/api/messages/${id}/status?status=RESOLVED`,
    {
      method: "PUT",
    }
  );
  fetchMessages();
}

// 🚪 Logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("isAdmin");
  window.location.href = "login.html";
});

// Initial Load
fetchMessages();