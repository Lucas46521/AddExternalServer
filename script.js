// Array of background image URLs
const backgroundImages = [
    'background6.jpg',
    'back1.jpg',
    'back2.jpg',
    'back3.jpg',
    // Add more image URLs here
];

// Function to set random background image for the section
function setRandomBackground() {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    const randomImage = backgroundImages[randomIndex];
    const sectionElement = document.getElementById('main-section');
    sectionElement.style.background = `url('${randomImage}') no-repeat center / cover`;
}

// Event listener for when all images are loaded
window.addEventListener('load', setRandomBackground);

document.getElementById('generateButton').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const ip = document.getElementById('ip').value;
    const port = document.getElementById('port').value;

    if (name && ip && port) {
        const urlParams = new URLSearchParams();
        urlParams.append('name', name);
        urlParams.append('ip', ip);
        urlParams.append('port', port);
        const localUrl = window.location.origin + '/?' + urlParams.toString();
        const minecraftUrl = `minecraft:?addExternalServer=${name}|${ip}:${port}`;
        // const minecraftUrl = `minecraft://connect?type=server&ip=${ip}&port=${port}&name=${name}&world=minecraft:overworld`;
        
        document.getElementById('urlText').value = localUrl;
        document.getElementById('redirectButton').setAttribute('href', minecraftUrl);
        document.getElementById('copyUrlTextButton').style.display = 'inline-block';
        document.getElementById('redirectButton').style.display = 'inline-block';
        document.getElementById('error').textContent = '';

        // Exibir a div contendo a área de texto e os botões
        document.getElementById('textAreaContainer').style.display = 'block';
    }  else {
        document.getElementById('error').textContent = 'Por favor, preencha todos os campos.';
        document.getElementById('copyUrlTextButton').style.display = 'none';
        document.getElementById('redirectButton').style.display = 'none';

        // Ocultar a div contendo a área de texto e os botões se os campos não estiverem preenchidos
        document.getElementById('textAreaContainer').style.display = 'none';
    }
});

document.getElementById('copyUrlTextButton').addEventListener('click', function() {
    const urlText = document.getElementById('urlText');
    urlText.select();
    document.execCommand('copy');
});

// Rest of the script...

window.addEventListener('DOMContentLoaded', (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const ip = urlParams.get('ip');
    const port = urlParams.get('port');

    if (name && ip && port) {
        const minecraftUrl = `minecraft:?addExternalServer=${name}|${ip}:${port}`;
        window.location.href = minecraftUrl;
    }
});
