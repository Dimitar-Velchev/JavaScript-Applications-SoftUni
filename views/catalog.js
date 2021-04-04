import { html } from '../node_modules/lit-html/lit-html.js';
import { getAllArticles } from '../src/data.js';

const catalogTemplate = (data) => html`
<section id="catalog-page" class="content catalogue">
    <h1>All Articles</h1>

    ${data.length == 0 ? html`<h3 class="no-articles">No articles yet</h3>` : data.map(itemTemplate)}

</section>
`;


const itemTemplate = (article) => html`
<a class="article-preview" href="/details/${article._id}">
    <article>
        <h3>Topic: <span>${article.title}</span></h3>
        <p>Category: <span>${article.category}</span></p>
    </article>
</a>
`;


export async function catalogPage(ctx) {

    const data = await getAllArticles();
    ctx.render(catalogTemplate(data));

}
