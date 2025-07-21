// === DATUMI ===
const awayDate = new Date("2025-07-21T08:05:00");
const returnDate = null;
// Kad budeš znao: const returnDate = new Date("2025-07-30T18:00:00");

// === ODLASCI (Since awayDate) ===
function updateAwayCounters() {
  const now = new Date();
  const diff = now.getTime() - awayDate.getTime();
  const awayEl = document.getElementById("awayCounter");

  if (!awayEl) return; // ako nema elementa, prekini

  if (diff < 0) {
    // Još nije otišla → odbrojavanje DO odlaska
    const timeLeft = Math.abs(diff);
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    awayEl.textContent = `Odlazi za ${days} dana, ${hours} sati, ${minutes} minuta`;

    updateTimeBox("days", days);
    updateTimeBox("hours", hours);
    updateTimeBox("minutes", minutes);
    updateTimeBox("seconds", seconds);
  } else {
    // Već je otišla → brojanje od odlaska
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    awayEl.textContent = `${days} dana, ${hours} sati, ${minutes} minuta`;

    updateTimeBox("days", days);
    updateTimeBox("hours", hours);
    updateTimeBox("minutes", minutes);
    updateTimeBox("seconds", seconds);
  }
}

// === POVRATAK (countdown do returnDate) ===
function updateReturnTimer() {
  const returnEl = document.getElementById("returnTBD");
  const timerEl = document.getElementById("returnTimer");

  if (!returnEl || !timerEl) return;

  if (returnDate) {
    const now = new Date();
    const diff = returnDate.getTime() - now.getTime();

    if (diff > 0) {
      returnEl.style.display = "none";
      timerEl.style.display = "flex";

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      updateTimeBox("r-days", days);
      updateTimeBox("r-hours", hours);
      updateTimeBox("r-minutes", minutes);
      updateTimeBox("r-seconds", seconds);
    } else {
      returnEl.textContent = "Already back! ❤️";
      timerEl.style.display = "none";
    }
  } else {
    timerEl.style.display = "none";
    returnEl.style.display = "block";
    returnEl.textContent = "TBD";
  }
}

// === FUNKCIJA ZA ANIMIRANU PROMJENU BROJEVA ===
function updateTimeBox(id, value) {
  const el = document.getElementById(id);
  if (!el) return;

  const formatted = value.toString().padStart(2, "0");

  if (el.textContent !== formatted) {
    el.textContent = formatted;
    el.classList.add("flip");
    setTimeout(() => el.classList.remove("flip"), 300);
  }
}

// === GLAVNI INTERVAL ===
setInterval(() => {
  updateAwayCounters();
  updateReturnTimer();
}, 1000);

// === POČETNI POZIVI ===
updateAwayCounters();
updateReturnTimer();
