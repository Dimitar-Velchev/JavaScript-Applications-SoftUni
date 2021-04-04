import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import { logout } from '../src/data.js'
import { catalogPage } from '../views/catalog.js';
import { createPage } from '../views/create.js';
import { detailsPage } from '../views/details.js';
import { editPage } from '../views/edit.js';
import { homePage } from '../views/home.js';
import { loginPage } from '../views/login.js';
import { registerPage } from '../views/register.js';


const main = document.getElementById('main-content');

page('/home', decorateContent, homePage);
page('/', decorateContent, homePage);
page('/login', decorateContent, loginPage);
page('/catalog', decorateContent, catalogPage);
page('/create', decorateContent, createPage);
page('/edit/:id', decorateContent, editPage);
page('/details/:id', decorateContent, detailsPage);
page('/register', decorateContent, registerPage);

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();
    setUserNav();
    page.redirect('/home');
});

setUserNav();

page.start();



function decorateContent(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}




function setUserNav() {

    const email = sessionStorage.getItem('email');
    if (email != null) {
        document.getElementById('user').style.display = 'block'
        document.getElementById('guest').style.display = 'none'

    } else {
        document.getElementById('user').style.display = 'none'
        document.getElementById('guest').style.display = 'block'
    }
}