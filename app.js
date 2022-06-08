const form = document.querySelector("#searchForm");
const imgDiv = document.querySelector("#imgDiv");
const searchButton = document.querySelector("#searchButton");
const resetButton = document.querySelector("#searchButton");



const formSubmit = async function (e) {
    removeImages();
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    const config = { params: { q: searchTerm } }
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    makeImages(res.data);
    form.elements.query.value = "";

}

const makeImages = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            const img = document.createElement('IMG');
            img.src = result.show.image.medium;
            img.classList.add("showImages")
            imgDiv.append(img);
        }
    }
}
// const removeImages = () => {
//     const oldImages = document.querySelectorAll('.showImages')
//     for (let i in oldImages) {
//         oldImages[i].remove();
//     }
// }
const removeImages = () => {
    const oldImages = document.querySelectorAll('.showImages')
    for (let i = 0; i < oldImages.length; i++) {
        oldImages[i].remove();
    }
}

searchButton.addEventListener('click', formSubmit)
resetButton.addEventListener('click', () => {
    form.elements.query.value = "";
    removeImages();
})