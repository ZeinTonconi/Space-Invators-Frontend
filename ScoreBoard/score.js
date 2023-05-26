

fetch('http://localhost:8080/api/player')
    .then((res) => res.json())
    .then((players) => {
        const table = document.getElementById('scoreBoard')
        players.forEach((player, index) => {
            const tr = document.createElement('tr');
            const name = document.createElement('td');
            name.innerHTML = player.name;
            const id = document.createElement('td');
            id.innerHTML = index+1;
            id.setAttribute('scope','row');
            const score = document.createElement('td');
            score.innerHTML = player.score;
            tr.appendChild(id);
            tr.appendChild(name);
            tr.appendChild(score);
            table.appendChild(tr);
        });
    })
    .catch((error) => {
        console.log(error);
    })

// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
