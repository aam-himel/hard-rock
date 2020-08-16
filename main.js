console.log('Initializing js....');

// Lyrics api url formate "https://api.lyrics.ovh/v1/artist/title"

const search = document.getElementById('searchText');
const searchBtn = document.getElementById('btn-search');
let url = "https://api.lyrics.ovh/suggest/";
searchBtn.addEventListener('click', getQueryText)

// function to get query text
function getQueryText() {
    const searchText = search.value;
    console.log(searchText);

    fetch(`https://api.lyrics.ovh/suggest/${searchText}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data.data[0]);
            printData(data.data);
        })

    search.value = '';
}


function printData(data) {
    for (i = 0; i < 10; i++) {
        console.log(data[i]);
        let { title, artist: { name } } = data[i];
        displayLyrics(name, title);
    }
}

function displayLyrics(artist, title) {
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.lyrics);
        })
}