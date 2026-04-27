const filterButtons = Array.from(
  document.querySelectorAll<HTMLButtonElement>(".tag-filter .chip"),
);
const postRows = Array.from(
  document.querySelectorAll<HTMLElement>(".post-row"),
);
const archiveCount = document.querySelector<HTMLElement>(".archive-count");

function applyTagFilter(selectedTag: string) {
  let visibleCount = 0;

  filterButtons.forEach((button) => {
    const isActive = button.dataset.tag === selectedTag;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  postRows.forEach((row) => {
    const tags = JSON.parse(row.dataset.tags || "[]") as string[];
    const matches = selectedTag === "all" || tags.includes(selectedTag);

    row.hidden = !matches;
    row.style.display = matches ? "" : "none";

    if (matches) {
      visibleCount += 1;
    }
  });

  if (archiveCount) {
    archiveCount.textContent = `${visibleCount} article${visibleCount !== 1 ? "s" : ""}`;
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyTagFilter(button.dataset.tag || "all");
  });
});

applyTagFilter("all");
