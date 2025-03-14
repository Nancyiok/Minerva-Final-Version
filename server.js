Bun.serve({
    fetch(req) {
        const url = new URL(req.url);
        console.log("Request URL:", url.toString());

        if (url.pathname === "/web/article-page/article.html") {
            const id = 0;
            console.log("ID from URL:", id);

            return new Response(Bun.file("../web/article-page/article.html?id=" + id));
        }
        else if (url) {
             
        }

        return new Response(Bun.file("./index.html")); 
    },
    port: 3000,
});