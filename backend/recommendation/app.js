import { app, query, errorHandler } from "mu";

const executeQuery = async (queryString, next) => {
    try {
        return await query(queryString);
    } catch (error) {
        next(new Error(error));
    }
};

const randomItem = (items) => {
    return items[Math.floor(Math.random() * items.length)];
};

app.get("/", async (req, res, next) => {
    // TODO only pick artworks with art form most liked by logged in user
    const getAllArtworksQuery = `
        PREFIX schema: <http://schema.org/>
        PREFIX mu:     <http://mu.semte.ch/vocabularies/core/>

        SELECT *
        WHERE {
            ?artwork a schema:VisualArtwork ;
                mu:uuid ?artworkId .
        }
    `;

    const dbResponse = await executeQuery(getAllArtworksQuery, next);
    const artworks = dbResponse.results.bindings;
    const artworkId = artworks.length
        ? randomItem(artworks).artworkId.value
        : "";

    res.send({ artworkId });
});

app.use(errorHandler);
