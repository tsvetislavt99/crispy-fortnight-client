function getCookie(cname) {
  let name = cname + '=';
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

function checkCookie() {
  const userSelectSection = document.getElementById('user-select-section');
  const chatSection = document.getElementById('chat-section');

  let user = getCookie('username');
  if (user != '') {
    userSelectSection.style.display = 'none';
    chatSection.style.display = 'flex';
    setTimeout(() => {
      alert('Welcome again ' + user);
    }, 300);
  } else {
    const pickUsernameButton = document.getElementById('pick-username-button');

    pickUsernameButton.addEventListener('click', () => {
      const userNameInput = document.getElementById('username');
      if (userNameInput != '' && userNameInput != null) {
        user = userNameInput.value;
        if (user != '' && user != null) {
          setCookie('username', user, 30);
        }
      }
      userNameInput.value = '';
      userSelectSection.style.display = 'none';
      chatSection.style.display = 'flex';
    });
  }
}

checkCookie();
