const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbWJ3dWg3aDkwMDAwdzZ3eWwyZDM3em9zIiwiZW1haWwiOiJhZG1pbkBkZW1vLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0OTk0NDY0OSwiZXhwIjoxNzUwNTQ5NDQ5fQ.GvPsbIkVpyzGsbMFWYCy_yRMa0pkWZ4f-xb5z4Qb484"

// Decode without verification
const parts = token.split('.')
const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString())

console.log('Token payload:', payload)
console.log('User ID:', payload.userId)
console.log('Email:', payload.email)
console.log('Role:', payload.role)

// Check expiration
const exp = new Date(payload.exp * 1000)
const now = new Date()
console.log('Expires at:', exp)
console.log('Current time:', now)
console.log('Is expired?', exp < now)