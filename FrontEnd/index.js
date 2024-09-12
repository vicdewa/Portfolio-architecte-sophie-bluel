/********************************************************************/
/*************************** PAGE D'ACCUEIL *************************/
/******************* Affichage galerie de projets *******************/
/********************************************************************/

const gallery = document.querySelector('.gallery');
var works=[];
async function fetchAndDisplayGallery() {   
// Appel API pour récupérer les projets + suppresion du HTML contenu dans 'gallery' pour le remplacer par le contenu généré de manière dynamique //
    const responseAPI = await fetch('http://localhost:5678/api/works');
    works = await responseAPI.json();
    displayGallery(works)
    console.log(works)}
function displayGallery(categoryWorks){
    gallery.innerHTML = '';
// Création des éléments HTML correspondants pour chacun des projets de '/works' //   
    categoryWorks.forEach((i) => { 
    ajoutWorksHtml(i)
});
    }
// Mise à jour de la galerie une fois l'ajout de photo fait via la modale //
function ajoutWorksHtml(i){
    const workCard = document.createElement('figure'); 
        workCard.dataset.project=i.id;
    const workImg = document.createElement('img');
        workImg.src = i.imageUrl;
        workImg.alt = i.title;
    const workCaption = document.createElement('figcaption');
        workCaption.textContent = i.title;
// Rattachement des éléments HTML "img" et "figcaption" au parent "figure" //  
    workCard.appendChild(workImg);
    workCard.appendChild(workCaption);
// Ajout de tous les projets contenus dans les balises 'figure' à la balise parent qui contient la classe 'gallery' //  
    gallery.appendChild(workCard);
}
// Appel de la fonction de récupération et d'affichage des projets une fois le chargement de la page terminé // 
fetchAndDisplayGallery();

/********************************************************************/
/*************************** PAGE D'ACCUEIL *************************/
/*********** Affichage et gestion du menu des filtres ***************/
/********************************************************************/
    
async function fetchAndDisplayFilters() {
// Appel API pour récupérer les catégories //   
    const responseAPI = await fetch('http://localhost:5678/api/categories');
    const categories = await responseAPI.json();
// Ciblage de l'emplacement HTML où insérer le menu des filtres + le filtre 'Tous' //   
    const menuFiltres = document.querySelector('.filters');
        menuFiltres.innerHTML = '';
    const input = document.createElement('button'); 
        input.id = 0;
        input.addEventListener("click", function(){
            console.log('Le bouton "Tous" a été cliqué.');
            filterProjects('all');
        });
        input.innerHTML = 'Tous';
// Rattachement des éléments HTML de input au parent //  
    menuFiltres.appendChild(input);
// Création des éléments HTML correspondants pour chacun des projets de '/categories' // 
        categories.forEach(category => { 
        const input = document.createElement('button'); 
            input.id = category.id;
            input.innerHTML = category.name;
            input.addEventListener("click", function(){
                console.log('Le bouton '+ category.name +' a été cliqué.');
                filterProjects(category.id);
            });
// Rattachement des éléments HTML 'input' au parent //  
        menuFiltres.appendChild(input);
        })};
//Appel de la fonction //
fetchAndDisplayFilters()

// Fonction qui gère le fonctionnement des filtres //
function filterProjects(category) {
// Réalisation d'une boucle sur l'ensemble des projets pour vérifier la catégorie à laquelle ils appartiennent //  
    var worksTemp=[];
        console.log(category)
        console.log(works)
    works.forEach(project => {
// Extraction de la category ID et comparaison avec la catégorie cliquée pour définir ce qu'il faut afficher //
    const projectCategory = project.categoryId;
        if (category === 'all' || projectCategory === category) {
            worksTemp.push(project)
        }
    });
        displayGallery(worksTemp)
    }

/********************************************************************/
/*************************** PAGE D'ACCUEIL *************************/
/****************** Modifications 'mode édition' ********************/
/********************************************************************/

// Modification de la page d'accueil en mode édition //
const headerBlack = document.querySelector('.header-black')
const header = document.querySelector('header')
const logOut = document.getElementById('login-li')
const editButton = document.querySelector('.portfolio-edit')
const filtersDisplay = document.querySelector('.filters')
const mesProjets = document.getElementById('mes-projets')
var authToken='';
if (localStorage.getItem('token')){
    authToken=localStorage.getItem('token');
    header.style.margin = '100px 0px 50px 0px';
    filtersDisplay.classList.add('displaynone');
    editButton.style.marginBottom = '40px';
    mesProjets.style.marginBottom = '70px';
    logOut.innerText = 'logout';
    logOut.addEventListener('click', function() {
// Appel de la fonction de déconnexion //
        logout();  
    });
}else{
    headerBlack.classList.add('displaynone')
    editButton.classList.add('displaynone') 
}
// Fonction LOG-OUT //
function logout() {
// Suppression du token et de l'ID utilisateur dans le localStorage //
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
// Redirection vers la page d'accueil après déconnexion //
    window.location.href = 'index.html';
}

/********************************************************************/
/***************************** MODALE *******************************/
/******* Ouverture, fermeture, ajout, suppression, etc **************/
/********************************************************************/

let modal = null

const openModal = function (e){
    e.preventDefault()
    const href = e.target.getAttribute('href');
    const target = document.querySelector(href); //= #modal#//
// Affichage de la modale //
    if (!target) {
        console.error(`Aucun élément trouvé avec le sélecteur href.`);
        return;
    }
    modal = target
    modal.style.display = "flex"
    modal.addEventListener('click', closeModal)
    modal.querySelectorAll('.js-modal-close').forEach(button =>{
        button.addEventListener('click', closeModal)});
    modal.querySelectorAll('.js-modal-stop').forEach((el) => {
        el.addEventListener('click', stopPropagation);
    });
};
// Fermeture de la modale //
const closeModal = function (){
    if (modal === null) return // si on essaie de fermer une modale non-existante //
    modal.style.display = "none" // pour masquer la boîte modale //
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
    modal.querySelectorAll('.js-modal-stop').forEach((el) => {
        el.removeEventListener('click', stopPropagation);
    });
    modal = null;
};
// Pour éviter que la fenêtre modale ne se ferme lorsqu'on clique à l'intérieur du wrapper //
const stopPropagation = function (e){
    e.stopPropagation()
}

const modalLink = document.querySelector('.modal-link')
    modalLink.addEventListener('click', openModal);
    console.log('La boîte modale a été ouverte');

// Sélection de l'emplacement où afficher la galerie //
const galleryContainer = document.querySelector('.gallery-modal-container');
// Récupération des images depuis l'API et affichage dans la modale //
fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    data.forEach(work => {
// Création d'un container pour chaque image et icône de poubelle //
const imageContainer = document.createElement('div');
imageContainer.className = 'image-container';
// Création d'un élément image pour chaque projet de la galerie //
const workImgModal = document.createElement('img');
workImgModal.src = work.imageUrl; 
workImgModal.className = 'thumbnail';
// Création de l'élément icône poubelle //
const trashIcon = document.createElement('i');
trashIcon.className = 'fa-solid fa-trash-can';
// Fonction de suppression d'une photo de la galerie //
trashIcon.addEventListener('click', function() {
// Suppression côté serveur via l'envoi d'une requête DELETE //
fetch(`http://localhost:5678/api/works/${work.id}`, {
        method: 'DELETE',
        headers: {
        'Authorization': `Bearer ${authToken}`
        }
        })
.then(response => {
        if (response.ok) {
// Suppression de l'image dans le DOM (galerie modale) une fois la requête réussie en empêchant le rechargement de la page //
imageContainer.remove();
let portfolioDeleted = document.querySelector(`figure[data-project="${work.id}"]`);
portfolioDeleted.remove();
console.log('Image supprimée avec succès.');
} 
})
});
// Ajout de l'icône et de l'image au container //
    imageContainer.appendChild(workImgModal);
    imageContainer.appendChild(trashIcon);
// Ajout du container d'image au container de la galerie //
    galleryContainer.appendChild(imageContainer);
    });
  })
.catch(error => console.error('Erreur lors de la récupération des images:', error));

// Gestion du passage à la 'page 2' de la modale une fois qu'on clique sur le bouton 'Ajouter une photo' //
const leftArrow = document.querySelector('.fa-arrow-left');
const addButton = document.querySelector('.button-add-photo');
addButton.addEventListener('click', function(){
    console.log('Clic sur le bouton Ajouter une photo');
    document.querySelector('.js-modal-list').style.display = 'none'; // Masquer la 'page 1' //
    document.querySelector('.js-modal-add').style.display = 'flex'; // Afficher la 'page 2' //
// Afficher la flèche gauche pour retourner à la page 1 //
    leftArrow.classList.remove('displaynone');
});
// Gestion du retour en arrière à la 'page 1' de la modale au clic sur la flèche gauche //
leftArrow.addEventListener('click', function (){
    console.log('Clic sur la flèche gauche');
    document.querySelector('.js-modal-list').style.display = 'flex';// Afficher la 'page 1' //
    document.querySelector('.js-modal-add').style.display = 'none'; // Masquer la 'page 2' //
// Masquer la flèche gauche après le retour à la 'page 1' //
    leftArrow.classList.add('displaynone');
});
// Masquer la flèche au chargement initial si on est sur la page 1 //
leftArrow.classList.add('displaynone');

// Affichage dynamique des catégories dans le 'select' du formulaire via Javascript //
async function fetchAndDisplayCategories() {
    try {
// Appel API pour récupérer les catégories//
        const responseAPI = await fetch('http://localhost:5678/api/categories');
        const categories = await responseAPI.json();
// Ciblage du menu déroulant des catégories dans le formulaire //
        const categoriesSelect = document.getElementById('categoriesNewPhoto'); 
// Vidage du menu avant l'ajout de nouvelles options //
        categoriesSelect.innerHTML = '';  
// Ajout d'une option par défaut //
        const defaultOption = document.createElement('option');
        defaultOption.textContent = 'Sélectionnez une catégorie';
        defaultOption.value = '';  
        categoriesSelect.appendChild(defaultOption);
// Parcours des catégories récupérées pour les ajouter comme options dans le menu déroulant //
        categories.forEach(category => { 
            const option = document.createElement('option');
            option.value = category.id;  // L'ID de la catégorie comme valeur de l'option //
            option.textContent = category.name;  // Le nom de la catégorie //
// Ajout de l'option au menu déroulant du formulaire //
            categoriesSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
    }
}  
// Appel de la fonction pour afficher les catégories dans le menu déroulant
fetchAndDisplayCategories();
        

// Habilitation du bouton submit du formulaire // 
const fileInputForm = document.getElementById('choose-photo-button');
const textInputForm = document.getElementById('TitleNewPhoto');
const selectInputForm = document.getElementById('categoriesNewPhoto');
const submitButton = document.querySelector('.button-valider');
const errorMessageForm = document.getElementById('error-message-form');
// Vérification du remplissage des trois champs //
function checkInputs() {
// Vérification du remplissage du texte //
const isTextFilled = textInputForm.value.trim() !== ''; 
// Vérification du choix de la catégorie // 
const isSelectChosen = selectInputForm.value !== '';   
// Vérification de l'ajout d'une image // 
const isFileUploaded = fileInputForm.files.length > 0; 
// Activation/désactivation du bouton en fonction de l'état des champs //
if (isTextFilled && isSelectChosen && isFileUploaded) {
submitButton.disabled = false;   // Activation du bouton //
submitButton.style.backgroundColor = '#1D6154'; // Passage au vert //
console.log('Tous les champs ont été remplis : le bouton submit est activé.');
errorMessageForm.style.display = 'none'; //Disparition du message d'erreur //
    } else {
// Désactivation du bouton//
submitButton.disabled = true;  
// Passage au gris lorsque le bouton est désactivé//
submitButton.style.backgroundColor = '#A7A7A7';
// Affichage du message d'erreur // 
errorMessageForm.innerText = 'Merci de remplir tous les champs'; 
errorMessageForm.style.color = 'red'; 
console.log('Champs manquants : le bouton est désactivé.');
    }
}
// Ajout des event listeners pour vérifier les changements sur chacun des champs //
textInputForm.addEventListener('input', () =>{
    console.log('Titre renseigné.');
    checkInputs();
})
selectInputForm.addEventListener('change', () =>{
    console.log('Catégorie renseignée.');
    checkInputs();
})
fileInputForm.addEventListener('change', (event) =>{
    console.log('Fichier ajouté.');
    checkInputs();
    previewImage(event);
})

// Gestion de la preview ('page 3' de la modale) //
const photoPreviewContainer = document.getElementById('photo-preview-container');
const uploadRectangle = document.querySelector('.add-photo-rectangle');
console.log('photoPreviewContainer:', photoPreviewContainer);
console.log('uploadRectangle:', uploadRectangle);
// Fonction pour afficher une preview du fichier ajouté //
function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        console.log('Fichier sélectionné :', file); 
        const reader = new FileReader();
        reader.onload = function(e) {
        console.log('Chargement de l\'image terminé');
// Suppression de l'ancienne image si elle existe //
        photoPreviewContainer.innerHTML = '';
        uploadRectangle.style.display = 'none';
        console.log('Rectangle de téléchargement caché');
// Création d'un élément <img> pour afficher la preview du fichier //
        const img = document.createElement('img');
        img.classList.add('img-preview');
        img.src = e.target.result;
        img.alt = 'Aperçu de l\'image';
        img.style.height = '220px'; 
        img.style.objectFit = 'cover'; 
        photoPreviewContainer.appendChild(img);
        console.log('Image ajoutée au conteneur');
// Marquage du fichier comme correctement ajouté//
            checkInputs();
        };
// Lecture du fichier et affichage d'un aperçu//
            reader.readAsDataURL(file); 
        }
    }
/********************************************************************/
/********************** AJOUT GALERIE *******************************/
/**************** après fermeture de la modale **********************/
/********************************************************************/

// Requête POST pour envoyer la photo au serveur et l'ajouter à la galerie après clic sur 'valider' //
submitButton.addEventListener('click', function(event) {
    const fileInput = document.getElementById('choose-photo-button');
    const titleInput = document.getElementById('TitleNewPhoto');
    const categoryInput = document.getElementById('categoriesNewPhoto');
    const formData = new FormData();
        formData.append('image', fileInput.files[0]);
        formData.append('title', titleInput.value);
        formData.append('category', categoryInput.value);
    event.preventDefault();
    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${authToken}`
        },
        body: formData
    })
        .then(response => response.json())
        .then(data => {
    console.log(data)
    console.log('Image ajoutée avec succès:', data);
// Fermeture de la modale et ajout //
closeModal()
ajoutWorksHtml(data)
})
})