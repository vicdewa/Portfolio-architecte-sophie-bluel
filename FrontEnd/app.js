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
    modal.style.display = "flex";
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

const closeModal = function (e){
    if (modal === null) return //si on essaie de fermer une modale non-existante//
    e.preventDefault()
    modal.style.display = "none" //pour masquer la boîte modale//
    modal.removeEventListener ('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal=null
}

//Pour éviter que la fenêtre modale se ferme lorsqu'on clique à l'intérieur du wrapper//
const stopPropagation = function (e){
    e.stopPropagation()
}

const modalLink = document.querySelector('.modal-link')
    modalLink.addEventListener('click', openModal);
    console.log('La boîte modale a été ouverte');


// Sélection de l'emplacement où afficher la galerie//
const galleryContainer = document.querySelector('.gallery-modal-container');
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
// Ajout de l'icône et de l'image au container//
    imageContainer.appendChild(workImgModal);
    imageContainer.appendChild(trashIcon);
// Ajout du container d'image au container de la galerie//
    galleryContainer.appendChild(imageContainer);
    });
  })
.catch(error => console.error('Erreur lors de la récupération des images:', error));


//Modification de la modale une fois qu'on clique sur le bouton "Ajouter une photo"//
let isClicked = false
const leftArrow = document.querySelector('.fa-arrow-left')
const modalTitle = document.querySelector('.modal-title')
const addButton = document.querySelector('.button-add-photo')
const galleryAdd = document.querySelector ('.gallery-modal-container')
const addPhoto = document.querySelector ('.add-photo-rectangle')
addButton.addEventListener('click', function(){
console.log('clic sur le bouton ajouter une photo')
isClicked = true
modalTitle.innerText = 'Ajout photo';
addButton.innerText = 'Valider';
addButton.style.color = 'white'
addButton.style.backgroundColor = '#A7A7A7';
galleryAdd.style.display = 'none';
addPhoto.style.display = 'flex';
})
if (!isClicked) {
    leftArrow.classList.add('displaynone');
}

//Ajout d'un event listener sur la flèche gauche pour revenir à l'affichage premier de l'élément modal//

//

//Quand les deux champs sont remplis, le bouton valider devient vert//