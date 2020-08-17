console.log('Initializing js....');

// Lyrics api url formate "https://api.lyrics.ovh/v1/artist/title"

const search = document.getElementById('searchText');
const searchBtn = document.getElementById('btn-search');
const author = document.getElementById('author');
const lyric = document.getElementById('lyric');
const singleResult = document.querySelector('.single-result');
const searchResult = document.querySelector('.search-result');
const lyricTitle = document.getElementById('lyric-title');


searchBtn.addEventListener('click', CallLyricsApi)

// function to call the api
function CallLyricsApi() {
    const searchText = search.value;
    console.log(searchText);

    const songList = fetch(`https://api.lyrics.ovh/suggest/${searchText}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data.data[0]);
            printData(data.data);
            return data.data;
        })

    search.value = '';
}

// single track info
function printData(data) {
    for (i = 0; i < 10; i++) {
        console.log(data[i]);
        let { title, id, artist: { name } } = data[i];

        const getLyricsBtn = document.createElement('button');
        const p = document.createElement('p');


        getLyricsBtn.className = "btn btn-success ml-2 get-lyrics";
        getLyricsBtn.innerText = "Get Lyrics!";
        getLyricsBtn.id = `${id}`;
        p.innerHTML = `<strong>${title}</strong> Album By ${name}`;
        p.className = "author lead";
        p.appendChild(getLyricsBtn);
        author.appendChild(p);

        const card = document.createElement('div');
        card.innerHTML = `<div class="single-result row align-items-center my-3 p-3 get-lyrics" id="singleResult">
                                <div class="col-md-9">
                                    <h3 class="lyrics-name">${title}</h3>
                                    <p class="author lead">Album by <span>${name}</span></p>
                                </div>
                                <div class="col-md-3 text-md-right text-center">
                                    <button class="btn btn-success get-lyrics-card" id="${id}">Get Lyrics</button>
                                </div>
                         </div>`


        searchResult.appendChild(card);
        getLyricsBtn.addEventListener('click', event => { displayLyrics(name, title); });

    }

}


// Display lyrics into the UI
function displayLyrics(artist, title) {
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(res => res.json())
        .then(data => {
            const songLyric = data.lyrics;
            lyricTitle.innerText = title;
            lyric.innerText = songLyric;
            console.log(data.lyrics);
        })
}

