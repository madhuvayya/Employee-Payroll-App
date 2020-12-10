const selectedValue = () => {
    console.log(document.getElementById('salary').value);
    document.querySelector('.salary-output').textContent = document.getElementById('salary').value;; 
}