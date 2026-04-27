const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form as HTMLFormElement);
  const name = data.get("name")?.toString() ?? "";
  const email = data.get("email")?.toString() ?? "";
  const subject = data.get("subject")?.toString() || "Message from portfolio";
  const message = data.get("message")?.toString() ?? "";
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;

  window.location.href = `mailto:rajatjog1294@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  if (status) {
    status.textContent = "Opening your mail client...";
  }
});
