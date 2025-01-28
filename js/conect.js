fetch('/page-components/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('headerContainer').innerHTML = data;
    })
    .catch(error => console.error('Ошибка загрузки header.html:', error));
