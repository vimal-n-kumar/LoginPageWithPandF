const myModel = document.querySelectorAll('.modal')
const pool = require('./db');

async function signup(e) {
	e.preventDefault();
	const email = document.querySelector('#signupemail');
	const password = document.querySelector('#signuppassword');
	try {
		const result = await firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
		M.toast({ html: `welcome ${result.user.email}`, classes: "green" });
		await saveUserToDatabase(result.user.uid, email.value, password.value);
	} catch (err) {
		console.log(err);
		M.toast({ html: err.message, classes: "red" });
	}
	email.value = "";
	password.value = "";
	M.Modal.getInstance(myModel[0]).close();
}

async function saveUserToDatabase(uid, email, password) {
	try {
		const userRecord = await pool.query(
			'INSERT INTO users (uid, email, password) VALUES ($1, $2, $3)',
			[uid, email, password]
		);
		console.log(userRecord);
	} catch (err) {
		console.log(err);
		throw err;
	}
}

module.exports = { signup, login, logout, saveUserToDatabase };

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
	password.value = ""
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
