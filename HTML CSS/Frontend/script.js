const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: form.name.value,
    email: form.email.value,
    category: form.category.value,
    subject: form.subject.value,
    message: form.message.value
  };

  try {
    const response = await fetch("http://localhost:8080/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    const data = await response.json();
    console.log("Saved:", data);

    alert("Message Sent Successfully!");

    form.reset();

  } catch (error) {
    console.error("Error:", error);
    alert("Error sending message");
  }
});