
let result = document.getElementById("result");
let sound = document.getElementById("sound");
let btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + `${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            result.innerHTML = `
            <div class="word">
            <div>
            <h3>${inpWord}</h3>
            </div>
                    
               <br><br>
                <p class="word-meaning">
                   ${data[0].meanings[0].definitions[0].definition}
                </p>    
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;
            sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
});
