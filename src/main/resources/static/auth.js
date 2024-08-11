const myModel = document.querySelectorAll('.modal')

async function signup(e) {
	e.preventDefault()
	const email = document.querySelector('#signupemail')
	const password = document.querySelector('#signuppassword')

	try {
		const result = await firebase.auth().createUserWithEmailAndPassword(email.value, password.value)

		M.toast({ html: `welcome ${result.user.email}`, classes: "green" })
		console.log(result)
	} catch (err) {
		console.log(err)
		M.toast({ html: err.message, classes: "red" })
	}
	email.value = ""
	email.password = ""
	M.Modal.getInstance(myModel[0]).close()

	// Save to PostgreSQL
	const query = 'INSERT INTO users(id, email) VALUES($1, $2)';
	const values = [userRecord.uid, email];

	client.query(query, values)
		.then(res => console.log('User saved to PostgreSQL'))
		.catch(err => console.error('Error saving to PostgreSQL', err.stack));

}
async function login(e) {
	e.preventDefault()
	const email = document.querySelector('#loginEmail')
	const password = document.querySelector('#loginPassword')

	try {
		const result = await firebase.auth().signInWithEmailAndPassword(email.value, password.value)

		M.toast({ html: `welcome ${result.user.email}`, classes: "green" })
		console.log(result)
	} catch (err) {
		console.log(err)
		M.toast({ html: err.message, classes: "red" })
	}
	email.value = ""
	email.password = ""
	M.Modal.getInstance(myModel[1]).close()
}

function logout() {
	firebase.auth().signOut()
}

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		console.log(user)
	} else {
		console.log('signout success')
		M.toast({ html: "signout success", classes: "green" })
	}
});

const { Client } = require('pg');

const client = new Client({
	user: 'postgres',
	host: '34.173.193.184',
	database: 'loginpagedb',
	password: 'LoginPage@123',
	port: 5432, // Default PostgreSQL port
});

client.connect()
	.then(() => console.log('Connected to PostgreSQL'))
	.catch(err => console.error('Connection error', err.stack));
