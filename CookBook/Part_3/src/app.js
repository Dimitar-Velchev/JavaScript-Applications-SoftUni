import { setupCatalog, showCatalog } from './catalog.js';
import { showCreate, setupCreate } from './create.js';
import { setupLogin, showLogin } from './login.js';
import { showRegister, setupRegister } from './register.js';
import { setupDetails} from './details.js';
import { setupEdit} from './edit.js';

main();

function main() {
    setUserNav();

    const nav = document.querySelector('nav');
    const main = document.querySelector('main');
    const catalogSection = document.querySelector('#catalogSection');
    const loginSection = document.querySelector('#loginSection');
    const registerSection = document.querySelector('#registerSection');
    const createSection = document.querySelector('#createSection');
    const detailsSection = document.querySelector('#detailsSection');
    const editSection = document.querySelector('#editSection');

    const links = {
        'catalogLink': showCatalog,
        'loginLink': showLogin,
        'registerLink': showRegister,
        'createLink': showCreate,
    };

    setupCatalog(main, catalogSection, setActiveNav);
    setupLogin(main, loginSection, setActiveNav);
    setupRegister(main, registerSection, setActiveNav);
    setupCreate(main, createSection, setActiveNav);
    setupDetails(main, detailsSection, setActiveNav);
    setupEdit(main, editSection, setActiveNav);

    setUpNavigation();
    showCatalog();

    function setActiveNav(targetId) {
        [...nav.querySelectorAll('a')].forEach(l => {
            if (l.id == targetId) {
                l.classList.add('active');
            } else {
                l.classList.remove('active');
            }
        });

    }

    function setUpNavigation() {
        document.getElementById('logoutBtn').addEventListener('click', logout);

        nav.addEventListener('click', (ev) => {
            if (ev.target.tagName == "A") {
                const view = links[ev.target.id];
                if (typeof view == 'function') {
                    ev.preventDefault();
                    view();
                }
            }
        });
    }

    function setUserNav() {
        if (sessionStorage.getItem('authToken') != null) {
            document.getElementById('user').style.display = 'inline-block';
            document.getElementById('guest').style.display = 'none';
        } else {
            document.getElementById('guest').style.display = 'inline-block';
            document.getElementById('user').style.display = 'none';
        }
    }

    async function logout() {
        const response = await fetch('http://localhost:3030/users/logout', {
            method: 'get',
            headers: {
                'X-Authorization': sessionStorage.getItem('authToken')
            },
        });
        if (response.status == 200) {
            sessionStorage.removeItem('authToken');
            sessionStorage.removeItem('userId');
            sessionStorage.removeItem('email');
            setUserNav();
            showCatalog();
        } else {
            console.error(await response.json());
        }
    }


}







