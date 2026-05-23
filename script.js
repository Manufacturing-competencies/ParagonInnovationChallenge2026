// =====================================================
// PIC 2026 FINAL SCRIPT - CLEAN VERSION
// Aman untuk semua halaman
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
  initInfoPopup();
  initPosterModal();
  initPhotoGallerySimple();
  initLogout();
  initQitFinalistSearch();
});

/* =====================================================
   INFO POPUP INDEX
===================================================== */

function initInfoPopup(){
  const popup = document.getElementById("infoPopup");
  const openBtn = document.getElementById("openInfo");
  const closeBtn = document.getElementById("infoClose");
  const slider = document.getElementById("infoSlider");
  const dotsWrap = document.getElementById("infoDots");

  if(!popup || !closeBtn || !slider) return;

  const slides = Array.from(slider.querySelectorAll(".info-slide"));
  const backdrop = popup.querySelector("[data-close='true']");
  let index = 0;

  function openPopup(){
    popup.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
    goToSlide(index, false);
  }

  function closePopup(){
    popup.setAttribute("hidden", "");
    document.body.style.overflow = "";
  }

  function buildDots(){
    if(!dotsWrap) return;

    dotsWrap.innerHTML = "";

    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "info-dot" + (i === index ? " active" : "");
      dot.setAttribute("aria-label", "Slide " + (i + 1));
      dot.addEventListener("click", () => goToSlide(i, true));
      dotsWrap.appendChild(dot);
    });
  }

  function updateDots(){
    if(!dotsWrap) return;

    const dots = dotsWrap.querySelectorAll(".info-dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function goToSlide(i, smooth = true){
    if(slides.length === 0) return;

    index = (i + slides.length) % slides.length;

    slides[index].scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
      inline: "center",
      block: "nearest"
    });

    updateDots();
  }

  function detectActiveSlide(){
    const sliderRect = slider.getBoundingClientRect();
    const center = sliderRect.left + sliderRect.width / 2;

    let closest = 0;
    let closestDistance = Infinity;

    slides.forEach((slide, i) => {
      const rect = slide.getBoundingClientRect();
      const slideCenter = rect.left + rect.width / 2;
      const distance = Math.abs(slideCenter - center);

      if(distance < closestDistance){
        closestDistance = distance;
        closest = i;
      }
    });

    index = closest;
    updateDots();
  }

  openBtn?.addEventListener("click", openPopup);
  closeBtn.addEventListener("click", closePopup);
  backdrop?.addEventListener("click", closePopup);

  document.addEventListener("keydown", (e) => {
    if(popup.hasAttribute("hidden")) return;

    if(e.key === "Escape") closePopup();
    if(e.key === "ArrowRight") goToSlide(index + 1, true);
    if(e.key === "ArrowLeft") goToSlide(index - 1, true);
  });

  slider.addEventListener("scroll", () => {
    requestAnimationFrame(detectActiveSlide);
  }, { passive:true });

  buildDots();

  // Popup otomatis muncul hanya kalau ada infoPopup di halaman.
  setTimeout(openPopup, 500);
}

/* =====================================================
   POSTER MODAL WITH CAPTION
===================================================== */

function initPosterModal(){
  const modal = document.getElementById("posterModal");
  const modalImg = document.getElementById("posterModalImage");
  const modalTitle = document.getElementById("posterModalTitle");
  const modalCaption = document.getElementById("posterModalCaption");
  const modalLink = document.getElementById("posterModalLink");
  const closeBtn = document.getElementById("posterModalClose");

  if(!modal || !modalImg || !modalTitle || !closeBtn) return;

  const backdrop = modal.querySelector("[data-close='true']");
  const buttons = document.querySelectorAll(".poster-thumb");

  function openModal(button){
    const card = button.closest(".poster-card, .pre-poster-card");
    const captionTemplate = card?.querySelector(".poster-caption-template");

    const src = button.dataset.full || button.querySelector("img")?.src || "";
    const title = button.dataset.title || "Poster";
    const link = button.dataset.link || "#";

    modalImg.src = src;
    modalTitle.textContent = title;

    if(modalCaption){
      modalCaption.innerHTML = captionTemplate
        ? captionTemplate.innerHTML
        : "<p>Informasi detail poster belum tersedia.</p>";
    }

    if(modalLink){
      if(link && link !== "#"){
        modalLink.href = link;
        modalLink.style.display = "inline-flex";
      }else{
        modalLink.href = "#";
        modalLink.style.display = "none";
      }
    }

    modal.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeModal(){
    modal.setAttribute("hidden", "");
    modalImg.src = "";
    document.body.style.overflow = "";
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => openModal(button));
  });

  closeBtn.addEventListener("click", closeModal);
  backdrop?.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape" && !modal.hasAttribute("hidden")){
      closeModal();
    }
  });
}

/* =====================================================
   REVIEW PHOTO SIMPLE GALLERY
===================================================== */

function initPhotoGallerySimple(){
  const wrap = document.querySelector(".photo-track-wrap");
  const track = document.getElementById("photoTrack");
  const prevBtn = document.getElementById("photoPrev");
  const nextBtn = document.getElementById("photoNext");

  if(!wrap || !track || !prevBtn || !nextBtn) return;

  const cards = Array.from(track.querySelectorAll(".photo-card"));
  if(cards.length === 0) return;

  cards.forEach((card) => {
    if(!card.querySelector(".photo-gloss")){
      const gloss = document.createElement("span");
      gloss.className = "photo-gloss";
      card.appendChild(gloss);
    }
  });

  function getStep(){
    const firstCard = cards[0];
    const gap = parseFloat(getComputedStyle(track).gap) || 18;
    return firstCard.offsetWidth + gap;
  }

  function getMaxScroll(){
    return Math.max(0, wrap.scrollWidth - wrap.clientWidth);
  }

  function updateButtons(){
    const maxScroll = getMaxScroll();
    const current = wrap.scrollLeft;

    prevBtn.disabled = current <= 2;
    nextBtn.disabled = current >= maxScroll - 2;
  }

  function scrollToPosition(left){
    const maxScroll = getMaxScroll();
    const target = Math.max(0, Math.min(left, maxScroll));

    wrap.scrollTo({
      left: target,
      behavior: "smooth"
    });

    setTimeout(updateButtons, 420);
  }

  prevBtn.addEventListener("click", () => {
    scrollToPosition(wrap.scrollLeft - getStep() * 2);
  });

  nextBtn.addEventListener("click", () => {
    scrollToPosition(wrap.scrollLeft + getStep() * 2);
  });

  wrap.addEventListener("scroll", () => {
    requestAnimationFrame(updateButtons);
  }, { passive:true });

  window.addEventListener("resize", updateButtons);

  let isDown = false;
  let startX = 0;
  let startScroll = 0;
  let moved = false;

  wrap.addEventListener("pointerdown", (e) => {
    isDown = true;
    moved = false;
    startX = e.clientX;
    startScroll = wrap.scrollLeft;
    wrap.setPointerCapture?.(e.pointerId);
  });

  wrap.addEventListener("pointermove", (e) => {
    if(!isDown) return;

    const diff = e.clientX - startX;
    if(Math.abs(diff) > 5) moved = true;

    wrap.scrollLeft = startScroll - diff;
  });

  wrap.addEventListener("pointerup", () => {
    isDown = false;
    updateButtons();
  });

  wrap.addEventListener("pointercancel", () => {
    isDown = false;
    updateButtons();
  });

  wrap.addEventListener("click", (e) => {
    if(moved){
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  updateButtons();
}

/* =====================================================
   LOGOUT
===================================================== */

function initLogout(){
  const logoutBtn = document.getElementById("logoutBtn");

  if(!logoutBtn) return;

  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("picUser");
    window.location.href = "login.html";
  });
}

/* =====================================================
   QIT FINALIST SEARCH
===================================================== */

function initQitFinalistSearch(){
  const searchInput = document.getElementById("qitSearchInput");
  const teamCloud =
    document.getElementById("qitTeamCloud") ||
    document.getElementById("qitNameCloud");

  const teamCount = document.getElementById("qitTeamCount");
  const emptyMessage = document.getElementById("qitEmptyMessage");

  if(!searchInput || !teamCloud) return;

  const pills = Array.from(teamCloud.querySelectorAll(".qit-team-pill"));
  const total = pills.length;

  if(teamCount){
    teamCount.textContent = `${total} Finalis`;
  }

  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    pills.forEach((pill) => {
      const name = pill.textContent.trim().toLowerCase();
      const isMatch = name.includes(keyword);

      pill.classList.toggle("is-hidden", Boolean(keyword) && !isMatch);
      pill.classList.toggle("is-match", Boolean(keyword) && isMatch);

      if(!keyword || isMatch){
        visibleCount++;
      }
    });

    if(teamCount){
      teamCount.textContent = keyword
        ? `${visibleCount} Ditemukan`
        : `${total} Finalis`;
    }

    if(emptyMessage){
      emptyMessage.classList.toggle("show", visibleCount === 0);
    }
  });
}

/* =====================================================
   EPIC POSTER MOBILE TAB FINAL
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("posterModal");
  const tabButtons = document.querySelectorAll(".epic-tab-btn");

  if(!modal || tabButtons.length === 0) return;

  function setTab(tab){
    modal.classList.toggle("show-poster", tab === "poster");
    modal.classList.toggle("show-caption", tab === "caption");

    tabButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === tab);
    });
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setTab(btn.dataset.tab || "poster");
    });
  });

  const observer = new MutationObserver(() => {
    if(!modal.hasAttribute("hidden")){
      setTab("poster");
    }
  });

  observer.observe(modal, {
    attributes:true,
    attributeFilter:["hidden"]
  });
});

/* =====================================================
   EPIC POSTER MOBILE TAB FINAL
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("posterModal");
  const tabButtons = document.querySelectorAll(".epic-tab-btn");

  if(!modal || tabButtons.length === 0) return;

  function setTab(tab){
    modal.classList.toggle("show-poster", tab === "poster");
    modal.classList.toggle("show-caption", tab === "caption");

    tabButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === tab);
    });
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setTab(btn.dataset.tab || "poster");
    });
  });

  const observer = new MutationObserver(() => {
    if(!modal.hasAttribute("hidden")){
      setTab("poster");
    }
  });

  observer.observe(modal, {
    attributes:true,
    attributeFilter:["hidden"]
  });
});

/* =====================================================
   FINAL MODAL TAB RESPONSIVE - PIC 2026
   Paste paling bawah script.js
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("posterModal");
  const tabButtons = document.querySelectorAll(".epic-tab-btn");

  if(!modal || tabButtons.length === 0) return;

  function setTab(tab){
    modal.classList.toggle("show-poster", tab === "poster");
    modal.classList.toggle("show-caption", tab === "caption");

    tabButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === tab);
    });
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setTab(btn.dataset.tab || "poster");
    });
  });

  const observer = new MutationObserver(() => {
    if(!modal.hasAttribute("hidden")){
      setTab("poster");
    }
  });

  observer.observe(modal, {
    attributes:true,
    attributeFilter:["hidden"]
  });
});