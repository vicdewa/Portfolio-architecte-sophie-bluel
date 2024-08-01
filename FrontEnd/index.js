//Fonction qui gère l'affichage de la galerie de projet//
async function fetchAndDisplayGallery() {
// Suppresion du HTML contenu dans la balise "gallery" pour la vider et la remplacer par le contenu généré de manière dynamique//   
    const gallery = document.querySelector('.gallery');
            gallery.innerHTML = '';
//Appel API pour récupérer les projets//   
        const responseAPI = await fetch('http://localhost:5678/api/works');
        const works = await responseAPI.json();
        console.log(works)
// Ajout dynamique des projets récupérés dans "/works"// 
        works.forEach((i) => { 
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
            input.innerHTML = 'Tous';
// Rattachement des éléments HTML "input" au parent//  
        menuFiltres.appendChild(input);
// Ajout dynamique des projets récupérés dans "/categories"// 
    categories.forEach(category => { 
// Création des éléments HTML correspondants pour chacun des projets de "/categories"// 
        const input = document.createElement('button'); 
            input.id = category.id;
            input.innerHTML = category.name;
// Rattachement des éléments HTML "input" au parent//  
        menuFiltres.appendChild(input);
        })};
//Appel de la fonction//
        fetchAndDisplayFilters()


// Sélectionner le bouton par son ID
const allFilter = document.getElementById('0');
// Vérifier si l'élément existe avant d'ajouter l'event listener
if (allFilter) {
    allFilter.addEventListener("click", function(){
        console.log('Le bouton "Tous" a été cliqué.');
        fetchAndDisplayGallery();
    });
}