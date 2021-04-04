import { html } from '../node_modules/lit-html/lit-html.js';
import { getAllArticleById, deleteArticle } from '../src/data.js';

const detailsTemplate = (article, isAuthor, onDelete) => html`
<section id="details-page" class="content details">
    <h1>${article.title}</h1>

    <div class="details-content">
        <strong>Published in category ${article.category}</strong>
        <p>${article.content}</p>

        <div class="buttons">

            ${isAuthor ? html` <a @click=${onDelete} href="javascript:void(0)" class="btn delete">Delete</a>
            <a href="/edit/${article._id}" class="btn edit">Edit</a> <a href="/home" class="btn edit">Back</a>` : html`
            <a href="/home" class="btn edit">Back</a>`}

        </div>
    </div>
</section>
`;


export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const userId = sessionStorage.getItem('userId');

    const article = await getAllArticleById(id);

    async function onDelete() {
        const confirmed = confirm('Are you sure you want to delete this item?');
        if (confirmed) {
            await deleteArticle(id)
            ctx.page.redirect("/home");
        }
    }

    ctx.render(detailsTemplate(article, userId === article._ownerId, onDelete));
}