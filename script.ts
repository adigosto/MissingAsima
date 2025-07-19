// === DATUMI ===
const awayDate: Date = new Date("2025-07-20T08:00:00"); 
const returnDate: Date | null = null; 
// Kad budeš znao: new Date("2025-07-30T18:00:00");

// === ODLASCI (Since awayDate) ===
function updateAwayCounters(): void {
  const now = new Date();
  const diff = now.getTime() - awayDate.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  // Klasični tekstualni counter
  const awayEl = document.getElementById("awayCounter") as HTMLParagraphElement;
  awayEl.textContent = `${days} dana, ${hours} sati, ${minutes} minuta`;

  // Digitalni timer (sa sekundama i animacijom)
  updateTimeBox("days", days);
  updateTimeBox("hours", hours);
  updateTimeBox("minutes", minutes);
  const seconds = Math.floor((diff / 1000) % 60);
  updateTimeBox("seconds", seconds);
}

// === POVRATAK (countdown do returnDate) ===
function updateReturnTimer(): void {
  const returnEl = document.getElementById("returnTBD") as HTMLParagraphElement;
  const timerEl = document.getElementById("returnTimer") as HTMLDivElement;

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
function updateTimeBox(id: string, value: number): void {
  const el = document.getElementById(id) as HTMLSpanElement;
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
