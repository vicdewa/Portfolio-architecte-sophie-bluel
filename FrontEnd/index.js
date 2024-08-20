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