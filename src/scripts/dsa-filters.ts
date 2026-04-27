const difficultyButtons = Array.from(
  document.querySelectorAll<HTMLButtonElement>(".stats-row .stat"),
);
const topicButtons = Array.from(
  document.querySelectorAll<HTMLButtonElement>(".topic-filter .chip"),
);
const problemRows = Array.from(
  document.querySelectorAll<HTMLElement>(".problem-row"),
);
const filterCount = document.querySelector<HTMLElement>(".filter-count");

let selectedDifficulty = "all";
let selectedTopic = "all";

function applyFilters() {
  let visibleCount = 0;

  difficultyButtons.forEach((button) => {
    const isActive = button.dataset.difficulty === selectedDifficulty;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  topicButtons.forEach((button) => {
    const isActive = button.dataset.topic === selectedTopic;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  problemRows.forEach((row) => {
    const rowTopics = JSON.parse(row.dataset.topics || "[]") as string[];
    const difficultyMatches =
      selectedDifficulty === "all" ||
      row.dataset.difficulty === selectedDifficulty;
    const topicMatches =
      selectedTopic === "all" ||
      rowTopics.includes(selectedTopic);
    const matches = difficultyMatches && topicMatches;

    row.hidden = !matches;
    row.style.display = matches ? "flex" : "none";

    if (matches) {
      visibleCount += 1;
    }
  });

  if (filterCount) {
    const parts = [`${visibleCount} shown`];

    if (selectedDifficulty !== "all") {
      parts.push(selectedDifficulty);
    }

    if (selectedTopic !== "all") {
      parts.push(selectedTopic);
    }

    filterCount.textContent = parts.join(" / ");
  }
}

difficultyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedDifficulty = button.dataset.difficulty || "all";
    applyFilters();
  });
});

topicButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedTopic = button.dataset.topic || "all";
    applyFilters();
  });
});

applyFilters();
