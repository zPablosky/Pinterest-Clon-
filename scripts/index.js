const $container_Cards = document.querySelector('.container_Content');
const $container_Categories_Perfil_Agree = document.querySelector('.container_Categories_Perfil_Agree');
const $container_Modal = document.querySelector('.container_Modal');
const $return_Home_nav = document.querySelector('.return_Home_nav');
const $container_ViewMorePhotos = document.querySelector('.container_ViewMorePhotos')
const $loadingMoewPhotos = document.querySelector('.loadingMoewPhotos');
const $inputSearchingImage = document.querySelectorAll('#inputSearchingImage');
const $container_All_Cards_Modal = document.querySelector('.container_All_Cards_Modal');
const $navbar_Searching = document.querySelectorAll('.navbar_Searching');
const $wrapper_Searching = document.querySelector('.wrapper_Searching');
const $closeModalSearching = document.querySelector('.closeModalSearching');
const $inputRefrechsCaracthers = document.querySelector('.inputRefrechsCaracthers');
const $searchButtonActive = document.querySelectorAll('.searchButtonActive');

const accessKey = 'iYXTWIyrk6ItF0zFcSvD0kc32_TEr9IcW0NutM21dbo';
const api_Search = 'https://api.unsplash.com/search/photos?page=1&per_page=30}0&query=random'

let currentPage = 1
let per_page = 30

const api_AllPhotos = `https://api.unsplash.com/photos?page=${currentPage}&per_page=${per_page}&order_by=random&client_id=${accessKey}`

async function active_Api () {
    try {
        const api = await fetch(api_AllPhotos, {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      })
    
        const api_Json = await api.json()
    
        for(let i = 0; i < api_Json.length; i++){
            const datesOfApi = {
                id_Image: api_Json[i].id,
                titulo: api_Json[i].alt_description,
                url_Image: api_Json[i].urls,
            }

            craete_Card(datesOfApi.url_Image.regular, datesOfApi.titulo)
        }

        currentPage++

    } catch (error) {
        console.log(error)
    }   
}

active_Api()

function craete_Card (image, description) {
    const $container_Card = document.createElement('div');
    const $containerModal_Card = document.createElement('div');
    $container_Card.className = 'containerCard'
    $containerModal_Card.classList.add('containerCard');
    $containerModal_Card.className = 'containerModal_Card';
    $containerModal_Card.classList.add('containerCard');
    $container_Card.style.cursor = 'pointer';
    $containerModal_Card.style.cursor = 'pointer';
    
    $container_Card.innerHTML = `
        <div class="card_Image" style="background-image: url(${image})">
            <div class="container_Content_Card">
                <div class="header_Card">
                    <div class="perfil_Card">
                        <span class="nameImage" style="display: none;">
                            ${description}
                        </span>
                        mi perfil
                        <i class="ri-arrow-down-s-line"></i>
                    </div>

                    <div class="save_Button_Card">
                        <button>Guardar</button>
                    </div>
                </div>

                <div class="footer_Card_download">
                    <button>
                        <i class="ri-upload-2-line"></i>
                    </button>
                </div>
            </div>
        </div>
    `
    $containerModal_Card.innerHTML = `
        <div class="card_Image" style="background-image: url(${image})">
            <div class="container_Content_Card">
                <div class="header_Card">
                    <div class="perfil_Card">
                        <span class="nameImage" style="display: none;">
                        ${description}
                        </span>
                    mi perfil
                    <i class="ri-arrow-down-s-line"></i>
                </div>

                    <div class="save_Button_Card">
                        <button>Guardar</button>
                    </div>
                </div>

                <div class="footer_Card_download">
                    <button>
                        <i class="ri-upload-2-line"></i>
                    </button>
                </div>
            </div>
        </div>
    `

    $container_All_Cards_Modal.appendChild($containerModal_Card);
    $container_Cards.appendChild($container_Card);

    viewCardImage ();
    viewCardImagenModal ();
}

function filterImageSearchig () {
    $inputSearchingImage[1].addEventListener('keydown', function (event){
        if(event.key === "Enter"){
            $container_Cards.innerHTML = ''
            apiInputFilterImage($inputSearchingImage[1].value)
        }
    })

    $searchButtonActive[1].addEventListener('click', () => {
        $container_Cards.innerHTML = ''
        apiInputFilterImage($inputSearchingImage[1].value)
    })
}

async function apiInputFilterImage (text) {
    try {
        let randomCurrentPage = Math.floor(Math.random(1) * 6);
        
        const api = await fetch(`https://api.unsplash.com/search/photos?page=${randomCurrentPage}&per_page=30}0&query=${text}`, {
            headers: {
              Authorization: `Client-ID ${accessKey}`,
            },
          })

         const apiJson = await api.json();
         
        for(let i = 0; i < apiJson.results.length; i++){
            newCardsOfFilter(apiJson.results[i].urls.regular, apiJson.results[i].alt_description)
        }
        
    } catch (error) {
        console.log(error)
    }
}

async function apiCategoryFilterImage (text) {
    try {
        const api = await fetch(`https://api.unsplash.com/search/photos?page=1&per_page=30}0&query=${text}`, {
            headers: {
              Authorization: `Client-ID ${accessKey}`,
            },
          })

         const apiJson = await api.json();
         
        for(let i = 0; i < apiJson.results.length; i++){
            newCardsOfFilter(apiJson.results[i].urls.regular, apiJson.results[i].alt_description)
        }
        
    } catch (error) {
        console.log(error)
    }
}

function newCardsOfFilter (image, description) {
    const $container_Card = document.createElement('div');
    $container_Card.className = 'containerCard';
    $container_Card.style.cursor = 'pointer';

    $container_Card.innerHTML = `
        <div class="card_Image" style="background-image: url(${image})">
            <div class="container_Content_Card">
                <div class="header_Card">
                    <div class="perfil_Card">
                        <span class="nameImage" style="display: none;">
                        ${description}
                        </span>
                        mi perfil
                        <i class="ri-arrow-down-s-line"></i>
                    </div>

                <div class="save_Button_Card">
                    <button>Guardar</button>
                </div>
            </div>

            <div class="footer_Card_download">
                <button>
                    <i class="ri-upload-2-line"></i>
                </button>
            </div>
        </div>
    </div>
    `

    $container_Cards.appendChild($container_Card);
    viewCardImage ()
}

function viewCardImage () {
    const $card_Image = document.querySelectorAll('.containerCard');
    const container_Close = [$container_Cards, $container_Categories_Perfil_Agree, $container_ViewMorePhotos];
    const $imageModalView = document.querySelector('.imageModalView');
    const $titleImageModal = document.querySelector('.titleImageModal');
    const $cardBackgroundImage = document.querySelectorAll('.card_Image');
    const $descriptionImage = document.querySelectorAll('.nameImage');

    let agreeImageUrls = []
    let agreeImageDescription = []

    $cardBackgroundImage.forEach((background) => {
        const backgroundImage =  background.style.backgroundImage
        const urlImage = backgroundImage.replace(/url\(["']?([^"']*)["']?\)/, '$1');
        agreeImageUrls.push(urlImage);
    })
    
    $descriptionImage.forEach((description) => {
        const newDescription = description.textContent;
        agreeImageDescription.push(newDescription);
    })

    $container_Modal.classList.add('closeModal_Container');
   
    for(let index = 0; index < $card_Image.length; index++){
        $card_Image[index].addEventListener('click', () => {
            container_Close.forEach((container) => {
                container.classList.add('closeModal_Container');
            })

            $container_Modal.classList.remove('closeModal_Container');
            $imageModalView.src = agreeImageUrls[index]
            $titleImageModal.textContent = agreeImageDescription[index];
        })
    }
}

function viewCardImagenModal () {
    const $card_Image = document.querySelectorAll('.containerCard');
    const $imageModalView = document.querySelector('.imageModalView');
    const $titleImageModal = document.querySelector('.titleImageModal');
    const $cardBackgroundImage = document.querySelectorAll('.card_Image');
    const $descriptionImage = document.querySelectorAll('.nameImage');
    const $containerModalCards = document.querySelectorAll('.containerModal_Card');

    let agreeImageUrls = []
    let agreeImageDescription = []

    $cardBackgroundImage.forEach((background) => {
        const backgroundImage =  background.style.backgroundImage
        const urlImage = backgroundImage.replace(/url\(["']?([^"']*)["']?\)/, '$1');
        agreeImageUrls.push(urlImage);
    })
    
    $descriptionImage.forEach((description) => {
        const newDescription = description.textContent;
        agreeImageDescription.push(newDescription);
    })

    $return_Home_nav.addEventListener('click', () => {
        $containerModalCards.forEach((card) => {
            card.classList.remove('removeCard')
        })
    })

    for(let i = 0; i < $card_Image.length; i++){
       $card_Image[i].addEventListener('click', () => {
            let validCardImage = agreeImageUrls.includes($imageModalView.src);

            if(validCardImage){
                $containerModalCards[i].classList.add('removeCard');
             }

            $imageModalView.src = agreeImageUrls[i]
            $titleImageModal.textContent = agreeImageDescription[i]
        })
    }

    for(let i = 0; i < $containerModalCards.length; i++){
        $containerModalCards[i].addEventListener('click', () => {
            $imageModalView.src = agreeImageUrls[i]
            $titleImageModal.textContent = agreeImageDescription[i]
        })
    }
} 

function closeContainerModal () {
    const container_Close = [$container_Cards, $container_Categories_Perfil_Agree, $container_ViewMorePhotos];
    const $imageModalView = document.querySelector('.imageModalView');
    
    $return_Home_nav.addEventListener('click', () => { 
        container_Close.forEach((container) => {
            container.classList.remove('closeModal_Container');
        })

        $imageModalView.src = '';
        $container_Modal.classList.remove('viewModal_Container');
        $container_Modal.classList.add('closeModal_Container');
    })  
}

function functionsInputSearchingView () {
let tieneFocus = false
    
$inputSearchingImage.forEach((navbar) => {
        navbar.addEventListener('focus', () => {
            tieneFocus = true;
        
            if(tieneFocus === true){
                $wrapper_Searching.classList.add('viewModal_Container');
            }
        })
    })
    
    $closeModalSearching.addEventListener('click', () => {
        $wrapper_Searching.classList.remove('viewModal_Container');
    })
    
    $inputRefrechsCaracthers.addEventListener('click', () => {
        $inputSearchingImage.forEach((input) => {
            input.value = ''
        })
    })
}

function filterOfCategorySearching () {
    const $cardRecentSearching = document.querySelectorAll('.cardRecentSearching');

    for(let i = 0; i < $cardRecentSearching.length; i++){
        $cardRecentSearching[i].addEventListener('click', () => {
            let saveNameCategory = $cardRecentSearching[i].textContent.trim();
            let inputNameCategory = $inputSearchingImage[1].value = saveNameCategory
            // console.log(saveNameCategory)
            
           $inputSearchingImage[1].addEventListener('keydown', function(event) {
                if(event.key === "Enter"){
                    $container_Cards.innerHTML = ''
                    apiCategoryFilterImage(inputNameCategory)
                }
           })

           $searchButtonActive[1].addEventListener('click', () => {
               $container_Cards.innerHTML = ''
               apiCategoryFilterImage(inputNameCategory)
           })
        })
    }
}

$loadingMoewPhotos.addEventListener('click', () => {
    active_Api();
})

viewCardImage ();
filterImageSearchig ();
closeContainerModal ();
functionsInputSearchingView ();
filterOfCategorySearching ();