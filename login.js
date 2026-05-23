/* =====================================================
   LOGIN PIC 2026
===================================================== */

const API_URL = "https://script.google.com/macros/s/AKfycbxukqZ8McVtb8C8GSJpx2E-LAC49XS-DRMRd4DTStycrskzfdRUv9yEZshz9fb4rxI/exec";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginBtn = document.getElementById("loginBtn");
  const loginMessage = document.getElementById("loginMessage");
  const togglePassword = document.getElementById("togglePassword");

  const existingUser = sessionStorage.getItem("picUser");
  if(existingUser){
    window.location.href = "index.html";
    return;
  }

  togglePassword?.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    togglePassword.innerHTML = isPassword
      ? '<i class="fa-solid fa-eye-slash"></i>'
      : '<i class="fa-solid fa-eye"></i>';
  });

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if(!username || !password){
      showMessage("Username/email dan password wajib diisi.", "error");
      return;
    }

    setLoading(true);
    showMessage("Sedang memeriksa akun...", "");

    try{
      const result = await apiPost({
        action:"login",
        username,
        password
      });

      if(!result.success){
        showMessage(result.message || "Login gagal.", "error");
        setLoading(false);
        return;
      }

      sessionStorage.setItem("picUser", JSON.stringify(result.user));

      showMessage("Login berhasil. Mengalihkan halaman...", "success");

      setTimeout(() => {
  window.location.href = "index.html";
}, 700);

    }catch(err){
      console.error(err);
      showMessage("Tidak bisa terhubung ke server. Cek URL API atau koneksi.", "error");
      setLoading(false);
    }
  });

  async function apiPost(payload){
    const response = await fetch(API_URL, {
      method:"POST",
      body:JSON.stringify(payload)
    });

    return response.json();
  }

  function setLoading(isLoading){
    loginBtn.disabled = isLoading;
    loginBtn.innerHTML = isLoading
      ? '<i class="fa-solid fa-spinner fa-spin"></i> Memproses...'
      : '<i class="fa-solid fa-right-to-bracket"></i> Masuk';
  }

  function showMessage(message, type){
    loginMessage.textContent = message;
    loginMessage.className = "login-message";

    if(type){
      loginMessage.classList.add(type);
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");

  if(!bgMusic || !musicToggle) return;

  let isPlaying = false;
  bgMusic.volume = 0.28;

  function setPlaying(){
    isPlaying = true;
    musicToggle.classList.add("is-playing");
    musicToggle.classList.remove("is-muted");
    musicToggle.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    musicToggle.setAttribute("aria-label", "Matikan musik");
  }

  function setMuted(){
    isPlaying = false;
    musicToggle.classList.remove("is-playing");
    musicToggle.classList.add("is-muted");
    musicToggle.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    musicToggle.setAttribute("aria-label", "Aktifkan musik");
  }

  async function playMusic(){
    try{
      await bgMusic.play();
      setPlaying();
    }catch(error){
      setMuted();
      console.log("Autoplay diblokir browser.");
    }
  }

  function pauseMusic(){
    bgMusic.pause();
    setMuted();
  }

  musicToggle.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    /* =====================================================
   LOGIN PIC 2026 - FINAL MUSIC SCRIPT ONLY
   Tempelkan bagian ini untuk mengganti script musik lama.
   Jangan hapus script login API kamu.
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");

  if(!bgMusic || !musicToggle) return;

  let isPlaying = false;
  bgMusic.volume = 0.28;

  function setPlaying(){
    isPlaying = true;
    musicToggle.classList.add("is-playing");
    musicToggle.classList.remove("is-muted");
    musicToggle.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    musicToggle.setAttribute("aria-label", "Matikan musik");
  }

  function setMuted(){
    isPlaying = false;
    musicToggle.classList.remove("is-playing");
    musicToggle.classList.add("is-muted");
    musicToggle.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    musicToggle.setAttribute("aria-label", "Aktifkan musik");
  }

  async function playMusic(){
    try{
      await bgMusic.play();
      setPlaying();
    }catch(error){
      setMuted();
      console.log("Autoplay diblokir browser. Klik icon suara untuk menyalakan musik.");
    }
  }

  function pauseMusic(){
    bgMusic.pause();
    setMuted();
  }

  musicToggle.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if(isPlaying){
      pauseMusic();
    }else{
      playMusic();
    }
  });

  setTimeout(() => {
    playMusic();
  }, 500);

  document.addEventListener("click", () => {
    if(!isPlaying && bgMusic.paused){
      playMusic();
    }
  }, { once:true });
});


    if(isPlaying){
      pauseMusic();
    }else{
      playMusic();
    }
  });

  /* mencoba autoplay */
  setTimeout(() => {
    playMusic();
  }, 500);

  /* fallback: klik pertama di halaman akan memicu play */
  document.addEventListener("click", () => {
    if(!isPlaying && bgMusic.paused){
      playMusic();
    }
  }, { once:true });
});

/* =====================================================
   LOGIN PIC 2026 - FINAL MUSIC SCRIPT ONLY
   Tempelkan bagian ini untuk mengganti script musik lama.
   Jangan hapus script login API kamu.
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");

  if(!bgMusic || !musicToggle) return;

  let isPlaying = false;
  bgMusic.volume = 0.28;

  function setPlaying(){
    isPlaying = true;
    musicToggle.classList.add("is-playing");
    musicToggle.classList.remove("is-muted");
    musicToggle.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    musicToggle.setAttribute("aria-label", "Matikan musik");
  }

  function setMuted(){
    isPlaying = false;
    musicToggle.classList.remove("is-playing");
    musicToggle.classList.add("is-muted");
    musicToggle.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    musicToggle.setAttribute("aria-label", "Aktifkan musik");
  }

  async function playMusic(){
    try{
      await bgMusic.play();
      setPlaying();
    }catch(error){
      setMuted();
      console.log("Autoplay diblokir browser. Klik icon suara untuk menyalakan musik.");
    }
  }

  function pauseMusic(){
    bgMusic.pause();
    setMuted();
  }

  musicToggle.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if(isPlaying){
      pauseMusic();
    }else{
      playMusic();
    }
  });

  setTimeout(() => {
    playMusic();
  }, 500);

  document.addEventListener("click", () => {
    if(!isPlaying && bgMusic.paused){
      playMusic();
    }
  }, { once:true });
});
