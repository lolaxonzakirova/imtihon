let fromText = document.querySelector(".from-text"),
    toText = document.querySelector(".to-text"),
    selectTag = document.querySelectorAll("select"),
    icons = document.querySelectorAll(".row i"),
    translateBtn = document.querySelector("button");

selectTag.forEach((tag, id) => {
    for (let country_code in countries) {
        let selected =
            id == 0
                ? country_code == "en-GB"
                    ? "selected"
                    : ""
                : country_code == "uz-UZ"
                ? "selected"
                : "";
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

translateBtn.addEventListener("click", () => {
    let text = fromText.value.trim(),
        translateFrom = selectTag[0].value,
        translateTo = selectTag[1].value;
    if (!text) return;
    toText.setAttribute("placeholder", "Translating...");

    let xhr = new XMLHttpRequest();

    xhr.open( "GET",`https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`,true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let data = JSON.parse(xhr.responseText);
            toText.value = data.responseData.translatedText;
            data.matches.forEach((data) => {
                if (data.id === 0) {
                    toText.value = data.translation;
                }
            });
            toText.setAttribute("placeholder", "Translation");
        }
    };

    xhr.send();
});
