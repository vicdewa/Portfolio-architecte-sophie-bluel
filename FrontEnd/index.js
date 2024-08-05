//Fonction qui gère l'affichage de la galerie de projet//
const gallery = document.querySelector('.gallery');
var works=[];
async function fetchAndDisplayGallery() {
// Suppresion du HTML contenu dans la balise "gallery" pour la vider et la remplacer par le contenu généré de manière dynamique//   
//Appel API pour récupérer les projets//   
        const responseAPI = await fetch('http://localhost:5678/api/works');
        works = await responseAPI.json();
        displayGallery(works)
        console.log(works)}
        function displayGallery(categoryWorks){
                gallery.innerHTML = '';
// Ajout dynamique des projets récupérés dans "/works"// 
        categoryWorks.forEach((i) => { 
// Création des éléments HTML correspondants pour chacun des projets de "/works"//   
        const workCard = document.createElement('figure'); 
        const workImg = document.createElement('img');
            workImg.src = i.imageUrl;
            workImg.alt = i.title;
        const workCaption = document.createElement('figcaption');
            workCaption.textContent = i.title;
// Rattachement des éléments HTML "img" et "figcaption" au parent "figure"//  
        workCard.appendChild(workImg);
        workCard.appendChild(workCaption);
// Puis ajout de tous les projets contenus dans les balises "figure" à la balise parent qui contient la classe "gallery""//  
        gallery.appendChild(workCard);
    });
        }
// Appel de la fonction de récupération et d'affichage des projets une fois le chargement de la page terminé// 
    fetchAndDisplayGallery();
    
//Fonction qui gère l'affichage du menu des filtres//
        async function fetchAndDisplayFilters() {
//Appel API pour récupérer les catégories//   
        const responseAPI = await fetch('http://localhost:5678/api/categories');
        const categories = await responseAPI.json();
// Ciblage de l'emplacement HTML où insérer le menu des filtres//   
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
// Ajout dynamique des projets récupérés dans "/categories"// 
    categories.forEach(category => { 
// Création des éléments HTML correspondants pour chacun des projets de "/categories"// 
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


//Gestion des filtres par categories >> Mail de Nicolas//
function filterProjects(category) {
//Réalisation d'une boucle sur l'ensemble des projets pour vérifier la catégorie à laquelle ils appartiennent//  
        var worksTemp=[];
        console.log(category)
        console.log(works)
        works.forEach(project => {
//Récupération de la catégorie de chaque projet dans le HTML//Changer les noms des catégories, id ou name?
        const projectCategory = project.categoryId;
        if (category === 'all' || projectCategory === category) {
                worksTemp.push(project)
        }
        });
        displayGallery(worksTemp)
        }
