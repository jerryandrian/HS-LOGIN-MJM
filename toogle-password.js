function togglePassword() {
  const input = document.getElementById("passwordInput");
  const iconOpen = document.getElementById("iconOpen");
  const iconClosed = document.getElementById("iconClosed");
  const toggleIcon = document.getElementById("toggleIcon");

  if (input.type === "password") {
    input.type = "text";
    iconOpen.style.display = "block";
    iconClosed.style.display = "none";
    toggleIcon.style.color = "rgba(255,255,255,0.9)";
  } else {
    input.type = "password";
    iconOpen.style.display = "none";
    iconClosed.style.display = "block";
    toggleIcon.style.color = "rgba(255,255,255,0.4)";
  }
}