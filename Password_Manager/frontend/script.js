function goTo(page) {
    window.location.href = page;
}

// Login
function login() {
    let password = document.getElementById("masterPassword").value;

    fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({password})
    })
    .then(res => res.json())
    .then(data => {
        if (data.message === "success") {
            window.location.href = "dashboard.html";
        } else {
            document.getElementById("error").innerText = "Wrong password";
        }
    });
}

// Add
function addPassword() {
    fetch("http://127.0.0.1:5000/add", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            website: website.value,
            username: username.value,
            password: password.value
        })
    })
    .then(() => alert("Saved successfully"));
}

// Search
function searchPassword() {
    let query = document.getElementById("search").value;

    fetch(`http://127.0.0.1:5000/search?website=${query}`)
    .then(res => res.json())
    .then(data => {
        if (data.username) {
            document.getElementById("result").innerHTML =
                `Username: ${data.username}<br>Password: ${data.password}`;
        } else {
            document.getElementById("result").innerText = "Not found";
        }
    });
}

// Update
function updatePassword() {
    fetch("http://127.0.0.1:5000/update", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            website: website.value,
            username: username.value,
            password: password.value
        })
    })
    .then(() => alert("Updated successfully"));
}

// Delete
function deletePassword() {
    fetch("http://127.0.0.1:5000/delete", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            website: website.value
        })
    })
    .then(() => {
        document.getElementById("message").innerText = "Deleted successfully";
    });
}