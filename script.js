// CineVerse: menu responsive, tìm kiếm/lọc/sắp xếp, yêu thích và chi tiết phim.
document.addEventListener("DOMContentLoaded", () => {
  if (window.AOS) AOS.init({ duration: 700, once: true, offset: 70, easing: "ease-out-cubic" });

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Đóng menu" : "Mở menu");
    menuButton.textContent = isOpen ? "✕" : "☰";
  });
  navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Mở menu");
    menuButton.textContent = "☰";
  }));

  const grid = document.querySelector(".movie-grid");
  const cards = [...grid.querySelectorAll(".movie-card")];
  const search = document.querySelector("#movie-search");
  const genreFilter = document.querySelector("#genre-filter");
  const sortSelect = document.querySelector("#sort-movies");
  const favoritesToggle = document.querySelector("#favorites-toggle");
  const favoritesCount = document.querySelector("#favorites-count");
  const resultsStatus = document.querySelector("#results-status");
  const favorites = new Set();
  let favoritesOnly = false;

  function updateFavorites() {
    favoritesCount.textContent = String(favorites.size);
    cards.forEach(card => {
      const button = card.querySelector(".favorite-button");
      const isFavorite = favorites.has(card.dataset.title);
      button.textContent = isFavorite ? "♥" : "♡";
      button.setAttribute("aria-pressed", String(isFavorite));
      button.setAttribute("aria-label", `${isFavorite ? "Bỏ" : "Thêm"} ${card.dataset.title} ${isFavorite ? "khỏi" : "vào"} yêu thích`);
    });
  }

  function renderMovies() {
    const query = search.value.trim().toLocaleLowerCase("vi");
    const genre = genreFilter.value;
    let visible = cards.filter(card => {
      const matchesQuery = card.dataset.title.toLocaleLowerCase("vi").includes(query);
      const matchesGenre = genre === "all" || card.dataset.genre === genre;
      const matchesFavorites = !favoritesOnly || favorites.has(card.dataset.title);
      return matchesQuery && matchesGenre && matchesFavorites;
    });
    if (sortSelect.value === "rating-desc") visible.sort((a, b) => Number(b.dataset.rating) - Number(a.dataset.rating));
    if (sortSelect.value === "title-asc") visible.sort((a, b) => a.dataset.title.localeCompare(b.dataset.title, "vi"));
    cards.forEach(card => { card.hidden = !visible.includes(card); });
    visible.forEach(card => grid.appendChild(card));
    resultsStatus.textContent = visible.length ? `Đang hiển thị ${visible.length} bộ phim` : "Không tìm thấy phim phù hợp. Hãy thử từ khóa hoặc bộ lọc khác.";
  }

  search.addEventListener("input", renderMovies);
  genreFilter.addEventListener("change", renderMovies);
  sortSelect.addEventListener("change", renderMovies);
  favoritesToggle.addEventListener("click", () => {
    favoritesOnly = !favoritesOnly;
    favoritesToggle.setAttribute("aria-pressed", String(favoritesOnly));
    favoritesToggle.classList.toggle("is-active", favoritesOnly);
    favoritesToggle.firstChild.textContent = favoritesOnly ? "♥ Đang xem " : "♡ Yêu thích ";
    renderMovies();
  });
  cards.forEach(card => card.querySelector(".favorite-button").addEventListener("click", () => {
    const title = card.dataset.title;
    favorites.has(title) ? favorites.delete(title) : favorites.add(title);
    updateFavorites();
    renderMovies();
  }));

  const dialog = document.querySelector("#movie-dialog");
  const dialogTitle = document.querySelector("#dialog-title");
  const dialogMeta = document.querySelector("#dialog-meta");
  const dialogDescription = document.querySelector("#dialog-description");
  const dialogFavorite = document.querySelector("#dialog-favorite");
  let selectedMovie = null;
  function syncDialogFavorite() {
    if (!selectedMovie) return;
    const saved = favorites.has(selectedMovie.dataset.title);
    dialogFavorite.textContent = saved ? "♥ Đã thêm yêu thích" : "♡ Thêm vào yêu thích";
    dialogFavorite.setAttribute("aria-pressed", String(saved));
  }
  cards.forEach(card => card.querySelector(".details-button").addEventListener("click", () => {
    selectedMovie = card;
    dialogTitle.textContent = card.dataset.title;
    dialogMeta.textContent = `${card.dataset.year} · Điểm cộng đồng minh họa: ★ ${card.dataset.rating}`;
    dialogDescription.textContent = card.dataset.description;
    syncDialogFavorite();
    if (typeof dialog.showModal === "function") dialog.showModal();
    else alert(`${card.dataset.title}\n\n${card.dataset.description}`);
  }));
  dialogFavorite.addEventListener("click", () => {
    if (!selectedMovie) return;
    const title = selectedMovie.dataset.title;
    favorites.has(title) ? favorites.delete(title) : favorites.add(title);
    updateFavorites();
    syncDialogFavorite();
    renderMovies();
  });
  document.querySelector("#dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener("close", () => { selectedMovie = null; });

  document.querySelectorAll("[data-filter-genre]").forEach(link => link.addEventListener("click", () => {
    genreFilter.value = link.dataset.filterGenre;
    favoritesOnly = false;
    favoritesToggle.setAttribute("aria-pressed", "false");
    favoritesToggle.classList.remove("is-active");
    favoritesToggle.firstChild.textContent = "♡ Yêu thích ";
    renderMovies();
  }));

  const newsletterForm = document.querySelector("#newsletter-form");
  const message = document.querySelector("#form-message");
  newsletterForm.addEventListener("submit", event => {
    event.preventDefault();
    const email = document.querySelector("#email").value.trim();
    if (!email) {
      message.textContent = "Vui lòng nhập địa chỉ email hợp lệ.";
      return;
    }
    message.textContent = "Đăng ký demo thành công! Email chưa được gửi hoặc lưu lên máy chủ.";
    newsletterForm.reset();
  });

  const backToTop = document.querySelector("#back-to-top");
  const updateBackToTop = () => backToTop.classList.toggle("is-visible", window.scrollY > 500);
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  updateFavorites();
  renderMovies();
});
