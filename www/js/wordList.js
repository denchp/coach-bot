export const updateWordList = data => {
    const listElement = document.getElementById("wordList");
 
    listElement.innerHTML = `<ol>${data.words.map(([name, count]) => {
        return `<li><span class="name">${name}</span> (<span class="count">${count}</span>)`;
    }).join("")}</ol>`;
};