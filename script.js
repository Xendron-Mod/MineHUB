// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeKe7IYBRcprqTdGQ_FeYA517dTBnsJ9k",
  authDomain: "mine-hub.firebaseapp.com",
  projectId: "mine-hub",
  storageBucket: "mine-hub.firebasestorage.app",
  messagingSenderId: "261499345758",
  appId: "1:261499345758:web:eac776fd4aac8486104dcf",
  measurementId: "G-4VFX5L56V8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

// Select Elements
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const usernameDisplay = document.getElementById("username");
const fileInput = document.getElementById("upload-btn");
const uploadsList = document.getElementById("uploads-list");

// Google Sign-in
loginBtn.addEventListener("click", async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        usernameDisplay.textContent = `Logged in as: ${user.displayName}`;
        loginBtn.classList.add("hidden");
        logoutBtn.classList.remove("hidden");
    } catch (error) {
        console.error(error.message);
    }
});

// Logout
logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    usernameDisplay.textContent = "";
    loginBtn.classList.remove("hidden");
    logoutBtn.classList.add("hidden");
});

// Upload File
fileInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileRef = ref(storage, `uploads/${file.name}`);
    await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(fileRef);

    await addDoc(collection(db, "uploads"), {
        name: file.name,
        url: downloadURL
    });

    alert("File uploaded!");
    loadUploads();
});

// Load Uploaded Files
async function loadUploads() {
    uploadsList.innerHTML = "";
    const querySnapshot = await getDocs(collection(db, "uploads"));
    querySnapshot.forEach((doc) => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${doc.data().url}" target="_blank">${doc.data().name}</a>`;
        uploadsList.appendChild(li);
    });
}

loadUploads();
// Dark Mode Toggle
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
});

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
}
