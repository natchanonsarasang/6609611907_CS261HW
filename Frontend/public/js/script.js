function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');

    
    if (username.length < 10) {
        messageElement.innerText = 'ชื่อผู้ใช้ต้องเกิน 10 หลัก';
        messageElement.style.color = 'red'; 
        return;
    }
    if (!password) {
        messageElement.innerText = 'โปรดกรอกรหัสผ่านของท่าน';
        messageElement.style.color = 'red'; 
        return; 
    }
    if (password.length <= 3) {
        messageElement.innerText = 'รหัสผ่านจะต้องมีความยาวมากกว่า 3 ตัว';
        messageElement.style.color = 'red'; 
        return; 
    }


    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': ''
        },
        body: JSON.stringify({
            UserName: username,
            PassWord: password
        })
    })
    .then(response => response.json())
    .then(data => {
        
        const messageElement = document.getElementById('message');
        
        if (data.status === true) {
            messageElement.innerHTML = `
                <p>Login successful!</p>
                <p>Username: ${data.username}</p>
                <p>Email: ${data.email}</p>
                <p>Name: ${data.displayname_en}</p>
                <p>Faculty: ${data.faculty}</p>`
            ;
            
        } else {
            messageElement.innerText = 'Login failed. ' + data.message;
        }
    })
    .catch(error => {
        document.getElementById('message').innerText = 'Error: ' + error;
    });
}


