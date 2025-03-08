const auth = firebase.auth();
const storage = firebase.storage();

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userStatus = document.getElementById("userStatus");
const uploadSection = document.getElementById("uploadSection");
const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");
const uploadsList = document.getElementById("uploadsList");

// Google Login
loginBtn.addEventListener("click", () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(result => {
            userStatus.innerText = `Logged in as: ${result.user.displayName}`;
            uploadSection.classList.remove("hidden");
        })
        .catch(error => console.error(error));
});

// Logout
logoutBtn.addEventListener("click", () => {
    auth.signOut().then(() => {
        userStatus.innerText = "Not logged in";
        uploadSection.classList.add("hidden");
    });
});

// File Upload to Firebase Storage
uploadBtn.addEventListener("click", () => {
    if (fileInput.files.length > 0) {
        let file = fileInput.files[0];
        let storageRef = storage.ref("uploads/" + file.name);
        
        storageRef.put(file).then(snapshot => {
            snapshot.ref.getDownloadURL().then(url => {
                let newItem = document.createElement("p");
                newItem.innerHTML = `Uploaded: <a href="${url}" target="_blank">${file.name}</a>`;
                uploadsList.appendChild(newItem);
            });
        });
    } else {
        alert("Please select a file first!");
    }
});
