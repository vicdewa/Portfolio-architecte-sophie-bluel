//Consigne: créer un formulaire de connexion fonctionnel avec une redirection vers la page d’accueil quand la connexion est confirmée/ un message d’erreur quand les informations utilisateur & mot de passe ne sont pas correctes.//

//email: sophie.bluel@test.tld password: S0phie//

//Sélection et déclaration des éléments du DOM//
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');
//Ajout d'un event listener sur le formulaire lors du clic sur le bouton submit//
loginForm.addEventListener('submit', async function(event) {
// Empêchement du rechargement de la page au clic//
    event.preventDefault();  
//Récupération des valeurs contenues dans les champs de saisie email & mot de passe pour pouvoir envoyer la requête au serveur//
    const email = emailInput.value;
    const password = passwordInput.value;
    console.log(email)
    console.log(password)
//Création d'un objet Javascript loginData pour envoyer la requête au serveur//
    const loginData = {
        email: email,
        password: password
    };
// Envoi des données au serveur via une requête POST//
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept' : 'application/json'
            },
            body: JSON.stringify(loginData)
        });
// Gestion de la réponse du serveur//
        if (response.ok) {
            const data = await response.json();
// Stockage du token dans le localStorage pour une utilisation future//
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
// Redirection vers la page principale//
            window.location.href = 'index.html';
        } else {
//Si la réponse n'est pas "ok", affichage du message d'erreur//
            errorMessage.innerText = 'Erreur dans l\'identifiant ou le mot de passe';
            errorMessage.style.color = 'red';
        }
// Réinitialisation des champs du formulaire
    emailInput.value = '';
    passwordInput.value = '';
});