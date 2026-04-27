const progress = document.getElementById("readingProgress");
const article = document.getElementById("article");

function updateProgress() {
  if (!progress || !article) return;

  const rect = article.getBoundingClientRect();
  const available = rect.height - window.innerHeight;
  const percent = available > 0 ? Math.min(100, Math.max(0, (-rect.top / available) * 100)) : 0;
  progress.style.width = `${percent}%`;
}

updateProgress();
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
