(async () => {
    const pets = (await fetch('http://localhost:3000/pets/images/').then((res) => res.json())) || [];
    const container = document.getElementById('container');
    pets.forEach(pet => {
        const petDiv = document.createElement('div');
        petDiv.className = "mySlides";
        petDiv.innerHTML = `<img src="images/${pet}" style="width:100%"></img>`;
        container.appendChild(petDiv);
    });
})();

document.getElementById('registration').style.display = 'none';
function registration() {
  document.getElementById('registration').style.display = 'block';
}

document.getElementById('authorization').style.display = 'none';
function authorization() {
  document.getElementById('authorization').style.display = 'block';
}

const getTokenData = async () => {
  
  const login = document.getElementById('login').value;
  const password = document.getElementById('password').value;
  
  const user = {
    login: login,
    password: password
  };

  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then((response) => {
    response.json();
    alert( response.json());
  })
.then((data) => {
  alert(data);
})
.catch((error) => {
  console.error('Error:', error);
});

 /* const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  });
  
  const result = await response.json();
  alert(result.message);*/
}