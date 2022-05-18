(async () => {
    const pets = (await fetch('http://127.0.0.1:3000/pets/images/').then((res) => res.json())) || [];
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
  await fetch('http://127.0.0.1:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('token', JSON.stringify(data));
    })
    .catch((error) => {
      console.error(error);
    });
}

const addNewUser = async () => {
  const name = document.getElementById('regName').value;
  const login = document.getElementById('regLogin').value;
  const password = document.getElementById('regPassword').value;
  const user = {
    name: name,
    login: login,
    password: password
  };
  await fetch('http://127.0.0.1:3000/reg', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

const uploadImage = async () => {
  const formData = new FormData();
  const fileField = document.querySelector('input[type="file"]');
  formData.append('image', fileField.files[0]);
  const token = localStorage.getItem('token');
  const string = token.split(':')[1].split('"')[1];
  try {
    await fetch('http://127.0.0.1:3000/image/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${string}`
      },
      body: formData
    });
  } catch {
    console.error(error);
  }
  
}