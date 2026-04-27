const button = document.getElementById("showMoreExperience");
const count = document.getElementById("experienceCount");
const hiddenRows = Array.from(document.querySelectorAll(".experience-row.hidden"));
const totalRows = document.querySelectorAll(".experience-row").length;
const collapsedRows = totalRows - hiddenRows.length;
let open = false;

if (button && hiddenRows.length > 0) {
  const label = button.querySelector("span");
  if (label) {
    label.textContent = `Show ${hiddenRows.length} more`;
  }

  if (count) {
    count.textContent = `${collapsedRows} of ${totalRows}`;
  }

  button.addEventListener("click", () => {
    open = !open;
    hiddenRows.forEach((row) => row.classList.toggle("revealed", open));

    const nextLabel = button.querySelector("span");
    const icon = button.querySelector("i");

    if (nextLabel) {
      nextLabel.textContent = open ? "Show less" : `Show ${hiddenRows.length} more`;
    }

    if (icon) {
      icon.style.transform = open ? "rotate(180deg)" : "rotate(0deg)";
    }

    if (count) {
      count.textContent = open ? `${totalRows} of ${totalRows}` : `${collapsedRows} of ${totalRows}`;
    }
  });
}
