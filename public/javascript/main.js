//the javascript below will deal with the carousel 

function slide(){
const  carouselOne = document.getElementById("carouselOne");

    if(carouselOne){
        carouselOne.addEventListener("slid.bs.carousel",function(){
            const activeItem = this.querySelector(".active");
            //console.log(activeItem)
            document.querySelector('.js-image-toggle').src = activeItem.getAttribute("js-img-attribute")
        })
    }
}

slide()


//addition of awards

const addingbutton = document.getElementById("addawards");
const addlist = document.querySelector('.awards-list');
const awards = document.querySelectorAll('.awards')[0];

addingbutton.addEventListener('click',function(){
    let addedAward = awards.cloneNode(true);
    let input = addedAward.getElementsByTagName('input')[0];
    input.value = ''
    addlist.appendChild(addedAward);
})



// function colorStars(rating) {
//     const stars = document.querySelectorAll('.star-rating i');
//     stars.forEach(star => {
//       if (star.dataset.rating <= rating) {
//         star.classList.add('rated');
//       }
//     });
//   }

//   colorStars(4);


  