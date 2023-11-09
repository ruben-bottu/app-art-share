import { app, query, errorHandler } from "mu";

app.get("/hello", (req, res) => {
    const query = `
        SELECT *
        WHERE {
            ?artwork a <http://schema.org/VisualArtwork>;
                <http://schema.org/headline> ?title
        }
    `;
    res.send("Hello mu-javascript-template");
});

app.use(errorHandler);
