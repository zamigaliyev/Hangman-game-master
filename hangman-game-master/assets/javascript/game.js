var wins = 0
var bands = ["ELTON_JOHN", "OPUS", "STING", "MICHAEL_JACKSON", "FRANK_SINATRA", "METALLICA", "QUEEN", "PHIL_COLLINS", "EAGLES", "LED_ZEPPELIN", "JOHN_LENNON", "SURVIVOR"]
var song_names = ["Sorry Seems To Be The Hardest Word", "Live Is Life", "Englishman In New York", "They Don't Care About Us", "My Way", "Nothing Else Matters", "The Show Must Go On", "Another Day In Paradise", "Hotel California", "Stairway To Heaven", "Imagine", "Eye Of The Tiger"]

// Shekil yaradib sol terefe atdim
var band_image = document.createElement("img")
band_image.src = "./assets/images/hangman-boardgame.jpg"
var left_side = document.querySelector(".band_pic")
left_side.appendChild(band_image)

// Player yaradib sol terefe atdim
var band_song = document.createElement("audio")
band_song.autoplay = true
band_song.style = "height: 30px;"
var left_side = document.querySelector(".song")
left_side.appendChild(band_song)

// Mahni sozleri uchun frame
var lyrics_space = document.querySelector(".lyrics")
// Sag col
var right_space = document.querySelector(".right")
// Mahni sozleri uchun col
var lyrics_sec_space = document.querySelector(".lyrics-sec")
lyrics_sec_space.style = "display: none;"

var offer = document.querySelector(".offer")
offer.style = "display: none;"
offer.onclick = previous_answer

var lyrics_btn = document.querySelector(".lyrics-btn")
lyrics_btn.style = "display: none;"
lyrics_btn.onclick = show_lyrics

var return_btn = document.querySelector(".return-btn")
return_btn.style = "display: none;"
return_btn.onclick = return_game

// Yeni oyun baslatmaq uchun funksiya
function new_game() {
    band = bands[Math.floor(Math.random() * bands.length)]
    len = band.length
    chanses = 12
    letters = []
    guesses = []
    right_guesses = []
    letter_space = document.querySelector("#letters")
    letter_space.innerHTML = ""
    guess_space = document.querySelector("#guesses")
    guess_space.innerHTML = ""
    chanses_space = document.querySelector("#chanses")
    chanses_space.innerHTML = chanses
    for (let i = 0; i < len; i++) {
        letters.push(band[i])
        letter_space = document.createElement('span')
        letter_space.id = i
        letter_space.innerHTML = "_ "
        document.getElementById("letters").appendChild(letter_space)
    }
    if(letters.indexOf('_') !== -1){
        var a = letters.indexOf('_')
        var span_space = document.getElementById(a)
        span_space.innerHTML = "/ "
        span_space.style.color = "#000"
        len--
    }
}

// Qalib gelende cagirilir
function win_func() {
    band_image.src = "./assets/images/" + band.toLowerCase() + ".jpg"
    band_song.src = "./assets/audio/" + band + ".mp3"
    lyrics_space.src = "./assets/lyrics/" + band + ".html"
    band_song.controls = true
    band_song.volume="0.7"
    return_btn.style = "display: none;"
    lyrics_btn.style = "display: inline;"
    offer.style = "display: none;"
    let message = document.querySelector("#msg")
    message.innerHTML = band.replace('_',' ')
    let song_name_space = document.querySelector("#song_name")
    let ind = bands.indexOf(band)
    song_name_space.innerHTML = "'" + song_names[ind] + "'"
    wins++
    let win_space = document.querySelector("#wins")
    win_space.innerHTML = wins
    new_game()
}

// Meglub olanda cagirilir
function lose_func() {
    let message = document.querySelector("#msg")
    message.innerHTML = "YOU LOSE"
    band_image.src = "./assets/images/lose.jpg"
    band_song.src = "./assets/audio/lose.wav"
    band_song.volume="1"
    band_song.controls = false
    let song_name_space = document.querySelector("#song_name")
    song_name_space.innerHTML = ""
    return_btn.style = "display: none;"
    lyrics_btn.style = "display: none;"
    offer.style = "display: inline;"
    new_game()
}

// Her hansi tusha basildiginda dovreye girecek funksiya
function key_click(event) {
    // girilen herfi guess olarak aldim
    var guess = String.fromCharCode(event.keyCode).toUpperCase()
    // yeni yanlish herf girildiyinde
    if (guesses.indexOf(guess) === -1 && letters.indexOf(guess) === -1) {
        if (chanses > 1) {
            chanses--
            guesses.push(guess)
            let guess_space = document.querySelector("#guesses")
            if (guesses.length > 1) {
                guess_space.innerHTML += ", " + guess
            } else {
                guess_space.innerHTML += guess
            }
            chanses_space = document.querySelector("#chanses")
            chanses_space.innerHTML = chanses
        } else {
            previous_band = band
            lose_func()
        }

    // Dogru herf girildiyinde
    } else if (right_guesses.indexOf(guess) === -1 && letters.indexOf(guess) !== -1) {
        right_guesses.push(guess)
        var i = 0;
        while (letters.indexOf(guess, i) >= 0) {
            var a = letters.indexOf(guess, i)
            var span_space = document.getElementById(a)
            span_space.innerHTML = guess
            len--
            i = a + 1
        }
        if(len === 0) win_func()
    }
}

function previous_answer() {
    band_image.src = "./assets/images/" + previous_band.toLowerCase() + ".jpg"
    band_song.src = "./assets/audio/" + previous_band + ".mp3"
    lyrics_space.src = "./assets/lyrics/" + previous_band + ".html"
    band_song.controls = true
    band_song.volume="0.7"
    let message = document.querySelector("#msg")
    message.innerHTML = previous_band.replace('_',' ')
    let song_name_space = document.querySelector("#song_name")
    let ind = bands.indexOf(previous_band)
    song_name_space.innerHTML = "'" + song_names[ind] + "'"
    offer.style = "display: none;"
    lyrics_btn.style = "display: inline;"
}

function show_lyrics() {
    right_space.style = "display: none;"
    lyrics_sec_space.style = "display: inline;"
    lyrics_btn.style = "display: none;"
    return_btn.style = "display: inline;"
}

function return_game() {
    right_space.style = "display: inline;"
    lyrics_sec_space.style = "display: none;"
    return_btn.style = "display: none;"
    lyrics_btn.style = "display: inline;"
}

// Ilk oyunu baslat
new_game()

// Her hansi tusha basildiginda
window.onkeypress = key_click