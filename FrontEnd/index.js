//Fonction qui gère l'affichage de la GALERIE de projet//
const gallery = document.querySelector('.gallery');
var works=[];
async function fetchAndDisplayGallery() {   
//Appel API pour récupérer les projets et suppresion du HTML contenu dans la balise "gallery" pour la remplacer par le contenu généré de manière dynamique//
        const responseAPI = await fetch('http://localhost:5678/api/works');
        works = await responseAPI.json();
        displayGallery(works)
        console.log(works)}
        function displayGallery(categoryWorks){
                gallery.innerHTML = '';
//Création des éléments HTML correspondants pour chacun des projets de "/works"//   
        categoryWorks.forEach((i) => { 
        const workCard = document.createElement('figure'); 
        const workImg = document.createElement('img');
            workImg.src = i.imageUrl;
            workImg.alt = i.title;
        const workCaption = document.createElement('figcaption');
            workCaption.textContent = i.title;
//Rattachement des éléments HTML "img" et "figcaption" au parent "figure"//  
        workCard.appendChild(workImg);
        workCard.appendChild(workCaption);
//Ajout de tous les projets contenus dans les balises "figure" à la balise parent qui contient la classe "gallery""//  
        gallery.appendChild(workCard);
    });
        }
// Appel de la fonction de récupération et d'affichage des projets une fois le chargement de la page terminé// 
    fetchAndDisplayGallery();
    
//Fonction qui gère l'affichage du MENU DES FILTRES//
        async function fetchAndDisplayFilters() {
//Appel API pour récupérer les catégories//   
        const responseAPI = await fetch('http://localhost:5678/api/categories');
        const categories = await responseAPI.json();
// Ciblage de l'emplacement HTML où insérer le menu des filtres + filtre "Tous"//   
        const menuFiltres = document.querySelector('.filters');
            menuFiltres.innerHTML = '';
        const input = document.createElement('button'); 
            input.id = 0;
            input.addEventListener("click", function(){
                console.log('Le bouton "Tous" a été cliqué.');
                filterProjects('all');
            });
            input.innerHTML = 'Tous';
// Rattachement des éléments HTML "input" au parent//  
        menuFiltres.appendChild(input);
// Création des éléments HTML correspondants pour chacun des projets de "/categories"// 
        categories.forEach(category => { 
        const input = document.createElement('button'); 
            input.id = category.id;
            input.innerHTML = category.name;
            input.addEventListener("click", function(){
                console.log('Le bouton '+ category.name +' a été cliqué.');
                filterProjects(category.id);
            });
// Rattachement des éléments HTML "input" au parent//  
        menuFiltres.appendChild(input);
        })};
//Appel de la fonction//
        fetchAndDisplayFilters()

//Modification de la page d'accueil en mode édition (header noir, logout et bouton modifier//
const headerBlack = document.querySelector('.header-black')
const header = document.querySelector('header')
const logOut = document.getElementById('login-li')
const editButton = document.querySelector('.portfolio-edit')
if (localStorage.getItem('token')){
        header.style.margin = '100px 0px 50px 0px';
        logOut.innerText = 'logout';
}else{
     headerBlack.classList.add('displaynone')
     editButton.classList.add('displaynone') 
}

//Fonction qui gère le fonctionnement des filtres//
function filterProjects(category) {
//Réalisation d'une boucle sur l'ensemble des projets pour vérifier la catégorie à laquelle ils appartiennent//  
        var worksTemp=[];
        console.log(category)
        console.log(works)
        works.forEach(project => {
//Extraction de la category ID et comparaison avec la catégorie cliquée pour définir ce qu'il faut afficher//
        const projectCategory = project.categoryId;
        if (category === 'all' || projectCategory === category) {
                worksTemp.push(project)
        }
        });
        displayGallery(worksTemp)
        }

// MODAL //

let modal = null

const openModal = function (e){
    e.preventDefault()
    const href = e.target.getAttribute('href');
    const target = document.querySelector(href); //= #modal#//
//Affichage de la modale//
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

// Fermeture modal //
const closeModal = function (e){
    if (modal === null) return //si on essaie de fermer une modale non-existante//
    e.preventDefault()
    modal.style.display = "none" //pour masquer la boîte modale//
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
    modal.querySelectorAll('.js-modal-stop').forEach((el) => {
        el.removeEventListener('click', stopPropagation);
    });
    modal = null;
};

//Pour éviter que la fenêtre modale se ferme lorsqu'on clique à l'intérieur du wrapper//
const stopPropagation = function (e){
    e.stopPropagation()
}

const modalLink = document.querySelector('.modal-link')
    modalLink.addEventListener('click', openModal);
    console.log('La boîte modale a été ouverte');


// Sélection de l'emplacement où afficher la galerie//
const galleryContainer = document.querySelector('.gallery-modal-container');
const authToken= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4';
// Récupération des images depuis l'API et affichage dans la modale//
fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    data.forEach(work => {
// Création d'un container pour chaque image et l'icône de la poubelle//
const imageContainer = document.createElement('div');
imageContainer.className = 'image-container';
// Création d'un élément image pour chaque projet/image de la galerie//
const workImgModal = document.createElement('img');
workImgModal.src = work.imageUrl; 
workImgModal.className = 'thumbnail';
// Création de l'élément icône poubelle//
const trashIcon = document.createElement('i');
trashIcon.className = 'fa-solid fa-trash-can';
// Fonction de suppression d'une photo de la galerie //
trashIcon.addEventListener('click', function() {
// Suppression côté serveur via l'envoi d'une requête DELETE //
alert(authToken);
fetch(`http://localhost:5678/api/works/${work.id}`, {
        method: 'DELETE',
        headers: {
        'Authorization': `Bearer ${authToken}`
        }
        })
.then(response => {
        if (response.ok) {
// Suppression du DOM correspondant à la photo une fois la requête réussie sans rechargement de la page//
//prevent default//
imageContainer.remove();
console.log('Image supprimée avec succès.');
} 
})
});
// Ajout de l'icône et de l'image au container//
    imageContainer.appendChild(workImgModal);
    imageContainer.appendChild(trashIcon);
// Ajout du container d'image au container de la galerie//
    galleryContainer.appendChild(imageContainer);
    });
  })
.catch(error => console.error('Erreur lors de la récupération des images:', error));


//Gestion du passage à la 'page 2' de la modale une fois qu'on clique sur le bouton "Ajouter une photo"//
let isClicked = false
const leftArrow = document.querySelector('.fa-arrow-left')
const addButton = document.querySelector('.button-add-photo')
addButton.addEventListener('click', function(){
console.log('clic sur le bouton ajouter une photo')
document.querySelector('.js-modal-list').style.display = 'none'; // Masquer la 'page 1'//
document.querySelector('.js-modal-add').style.display = 'flex';  // Afficher la 'page 2'//
isClicked = true
})
if (!isClicked) {
    leftArrow.classList.add('displaynone');
}

// Gestion du retour en arrière à la 'page 1' de la modale au clic sur la flèche gauche//
leftArrow.addEventListener('click', function (){
console.log('clic sur la flèche gauche')
document.querySelector('.js-modal-list').style.display = 'flex'; // Afficher la 'page 1'//
document.querySelector('.js-modal-add').style.display = 'none';  // Masquer la 'page 2'//
})

//Affichage dynamique des catégories dans le formulaire via Javascript//
async function fetchAndDisplayCategories() {
        try {
            // Appel API pour récupérer les catégories//
            const responseAPI = await fetch('http://localhost:5678/api/categories');
            const categories = await responseAPI.json();
        // Ciblage du menu déroulant des catégories dans le formulaire//
            const categoriesSelect = document.getElementById('categoriesNewPhoto'); 
        // Vider le menu avant d'ajouter de nouvelles options//
            categoriesSelect.innerHTML = '';  
        // Ajouter une option par défaut//
            const defaultOption = document.createElement('option');
            defaultOption.textContent = 'Sélectionnez une catégorie';
            defaultOption.value = '';  
            categoriesSelect.appendChild(defaultOption);
        // Parcourir les catégories récupérées pour les ajouter comme options dans le menu déroulant//
            categories.forEach(category => { 
                const option = document.createElement('option');
                option.value = category.id;  // L'ID de la catégorie comme valeur de l'option //
                option.textContent = category.name;  // Le nom de la catégorie //
        // Ajout de l'option au menu déroulant du formulaire//
                categoriesSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories:', error);
        }
    }  
    // Appel de la fonction pour afficher les catégories dans le menu déroulant
    fetchAndDisplayCategories();
        

//Habilitation du bouton submit du formulaire // 
const uploadFile = document.getElementById('choose-photo-button');
const textInputForm = document.getElementById('TitleNewPhoto');
const selectInputForm = document.getElementById('categoriesNewPhoto');
const submitButton = document.querySelector('.button-valider');
// Vérifier du remplissage des deux champs//
function checkInputs() {
// Vérifier si le texte est rempli//
const isTextFilled = textInputForm.value.trim() !== ''; 
// Vérifier si une catégorie est sélectionnée// 
const isSelectChosen = selectInputForm.value !== '';   
// Vérifier si une image est ajoutée// 
const isFileUploaded = fileInputForm.files.length > 0; 
// Activation/désactivation du bouton en fonction de l'état des champs//
if (isTextFilled && isSelectChosen && isFileUploaded) {
submitButton.disabled = false;   // Activation du bouton //
submitButton.style.backgroundColor = '#1D6154'; // Passer au vert //
    } else {
submitButton.disabled = true;    // Désactiver le bouton//
submitButton.style.backgroundColor = '#A7A7A7'; // Couleur grise lorsque désactivé//
    }
}
// Ajout des event listeners pour vérifier les changements sur chacun des champs//
textInputForm.addEventListener('input', checkInputs);
console(log)='titre renseigne'
selectInputForm.addEventListener('change', checkInputs);
console(log)='categorie selectionnee'
uploadFile.addEventListener('change', checkInputs);
console(log)='fichier ajoute'


// Gestion de l'affichage de la 'page 3' de la modale une fois clic sur 'Valider'//
//Il faut faire en sorte que cette classe soit en display none (add-photo-rectangle) et qu'un input de type file soit visible avec la miniature de la photo. Utiliser un event listener quand il y a un changement dans le champ de ajouter la photo.

//Ajout de la photo à la galerie (POST)//

//Suppression de photos dans la galerie (DELETE)//