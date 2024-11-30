

async function sendAuthRequest(authData) {
    const response = await fetch("/admin-auth", {
        "headers": {
            "Content-Type": "application/json",
        },
        "body": JSON.stringify(authData),

        "method": "POST",
    })

    if (response.ok) {
        return await response.json();
    }
    return null;
}


async function submitHandler(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById('password').value;
    if (password.length < 8) {
        alert('password length must been >= 8');
        return;
    }

    if (!username || !password) {
        alert("password or username is missing");
        return;
    }

    const response = await sendAuthRequest({username, password});
    console.log('res', response);
    if (!response) {
        alert('invalid credentials');
        return;
    } 
    const token = response.token;
    localStorage.setItem('adminToken', token);
}



const form = document.getElementById('loginForm');
form.onsubmit = submitHandler;