const loginBtn = document.getElementById('h-loginbtn')
const dashboardBtn = document.getElementById('h-dashboardbtn')
const signupBtn = document.getElementById('h-signupbtn')
const guestBtn = document.getElementById('h-guestbtn')

const loginGuest = async () => {
    const data = {
        username: 'Guest',
        password: 'Abc1234!',
        email: 'destroyguest@destroy.com',
    }
    const request = await fetch(`${window.location.origin}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    setTimeout(async () => {
        const data = {
            email: 'destroyguest@destroy.com',
            password: 'Abc1234!',
        }
        const request = await fetch(`${window.location.origin}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
    }, 100)
    setTimeout(() => {
        window.location.href = window.location.origin + '/dashboard'
    }, 100)
}

loginBtn.onclick = () =>
    (window.location.href = window.location.origin + '/login')
dashboardBtn.onclick = () =>
    (window.location.href = window.location.origin + '/dashboard')
signupBtn.onclick = () =>
    (window.location.href = window.location.origin + '/signup')
guestBtn.onclick = async () => loginGuest()
