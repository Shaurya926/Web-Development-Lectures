const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/';
const MATCH_THRESHOLD = 0.50;
const STORAGE_KEY = 'faceauth_users';

const video = document.getElementById('video');
const overlay = document.getElementById('overlay');
const statusBar = document.getElementById('status-bar');
const statusText = document.getElementById('status-text');

const regBadge = document.getElementById('reg-badge');
const scanLine = document.getElementById('scan-line');

const loaderEl = document.getElementById('model-loader');
const loaderFill = document.getElementById('loader-fill');
const loaderSub = document.getElementById('loader-sub');

const btnCamera = document.getElementById('btn-camera');
const btnRegister = document.getElementById('btn-register');
const btnLogin = document.getElementById('btn-login');
const btnClear = document.getElementById('btn-clear');

let cameraRunning = false;
let loopId = null;

// ───────── STATUS ─────────
function setStatus(msg, type = 'idle') {
  statusText.textContent = msg;
  statusBar.className = `status-bar ${type}`;
}

// ───────── ROBOT VOICE ─────────
function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.pitch = 0.6;
  speech.rate = 0.85;

  const voices = window.speechSynthesis.getVoices();
  speech.voice = voices.find(v =>
    v.name.toLowerCase().includes("google")
  ) || voices[0];

  window.speechSynthesis.speak(speech);
}

// ───────── LOAD MODELS ─────────
async function loadModels() {
  const steps = [
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
  ];

  for (let i = 0; i < steps.length; i++) {
    loaderFill.style.width = `${((i / steps.length) * 100)}%`;
    await steps[i];
  }

  loaderFill.style.width = "100%";
  setTimeout(() => loaderEl.classList.add("hidden"), 500);

  setStatus("Ready. Start camera.", "idle");
  refreshUI();
}

// ───────── CAMERA ─────────
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" }
    });

    video.srcObject = stream;
    await video.play();

    overlay.width = video.videoWidth;
    overlay.height = video.videoHeight;

    cameraRunning = true;
    scanLine.style.opacity = "1";

    btnCamera.disabled = true;
    btnRegister.disabled = false;
    btnLogin.disabled = false;

    setStatus("Camera active", "loading");
    startLoop();

  } catch (e) {
    setStatus("Camera error / permission denied", "error");
  }
}

// ───────── FACE LOOP ─────────
function startLoop() {
  const ctx = overlay.getContext("2d");

  async function loop() {
    if (!cameraRunning) return;

    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks();

    ctx.clearRect(0, 0, overlay.width, overlay.height);

    const resized = faceapi.resizeResults(detections, {
      width: overlay.width,
      height: overlay.height
    });

    resized.forEach(d => {
      const box = d.detection.box;
      ctx.strokeStyle = "#00e5ff";
      ctx.strokeRect(box.x, box.y, box.width, box.height);
    });

    requestAnimationFrame(loop);
  }

  loop();
}

// ───────── GET FACE ─────────
async function getFace() {
  return await faceapi
    .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceDescriptor();
}

// ───────── REGISTER USER ─────────
async function registerFace() {
  const userId = prompt("Enter User ID");

  if (!userId) return setStatus("User ID required", "warn");

  const face = await getFace();
  if (!face) return setStatus("No face detected", "error");

  let users = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

  users[userId] = Array.from(face.descriptor);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

  setStatus(`Registered: ${userId}`, "success");
  speak(`User ${userId} registered`);
  refreshUI();
}
// ───────── DIARY MODAL ─────────
function openDiary() {
  document.getElementById("diaryModal").classList.remove("hidden");
}

function closeDiary() {
  document.getElementById("diaryModal").classList.add("hidden");
}
// ───────── LOGIN ─────────
async function loginFace() {
  const userId = prompt("Enter User ID");

  if (!userId) return setStatus("User ID required", "warn");

  const users = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

  if (!users[userId]) {
    setStatus("User not found", "warn");
    speak("User not found");
    return;
  }

  setStatus("Verifying face...", "loading");

  const face = await getFace();
  if (!face) return setStatus("No face detected", "error");

  const stored = new Float32Array(users[userId]);
  const dist = faceapi.euclideanDistance(face.descriptor, stored);

  if (dist < MATCH_THRESHOLD) {
    setStatus(`Welcome sir ${userId}`, "success");
    speak(`Welcome sir ${userId}`);

    triggerEffect();

    setTimeout(() => {
      openDiary();
    }, 600);

  } else {
    setStatus("Face mismatch", "error");
    speak("Access denied");
  }
}

// ───────── CLEAR ─────────
function clearRegistration() {
  localStorage.removeItem(STORAGE_KEY);
  setStatus("All users cleared", "warn");
  refreshUI();
}

// ───────── UI ─────────
function refreshUI() {
  const has = !!localStorage.getItem(STORAGE_KEY);
  regBadge.style.display = has ? "flex" : "none";
  btnClear.disabled = !has;
}

function triggerEffect() {
  const wrap = document.getElementById("video-wrap");
  wrap.style.boxShadow = "0 0 40px rgba(34,197,94,0.6)";
  setTimeout(() => wrap.style.boxShadow = "", 1500);
}


// ───────── INIT ─────────
window.addEventListener("DOMContentLoaded", async () => {
  const check = setInterval(() => {
    if (window.faceapi) {
      clearInterval(check);
      loadModels();
    }
  }, 100);
});