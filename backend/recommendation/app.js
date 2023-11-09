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

// id, type, title, art-form, description, image-url
// artist: id, type, name
app.get("/hello", async (req, res, next) => {
    // TODO only pick artworks with art form most liked by logged in user
    const getAllArtworksQuery = `
        PREFIX schema: <http://schema.org/>
        PREFIX foaf:   <http://xmlns.com/foaf/0.1/>
        PREFIX mu:     <http://mu.semte.ch/vocabularies/core/>

        SELECT *
        WHERE {
            ?artwork a schema:VisualArtwork ;
                mu:uuid ?artworkId ;
                schema:headline ?title ;
                schema:artform ?artForm ;
                schema:abstract ?description ;
                schema:image ?imageUrl ;
                schema:artist ?artist .
            ?artist mu:uuid ?artistId ;
                schema:name ?name
        }
    `;

    const dbResponse = await executeQuery(getAllArtworksQuery, next);
    const artworks = dbResponse.results.bindings;
    const { artworkId, title, artForm, description, imageUrl, artistId, name } =
        randomItem(artworks);

    const body = {
        data: [
            {
                type: "artworks",
                id: artworkId.value,
                attributes: {
                    title: title.value,
                    "art-form": artForm.value,
                    description: description.value,
                    "image-url": imageUrl.value,
                },
                relationships: {
                    artist: {
                        data: {
                            type: "artists",
                            id: artistId.value,
                        },
                    },
                },
            },
        ],
        included: [
            {
                type: "artists",
                id: artistId.value,
                attributes: {
                    name: name.value,
                },
            },
        ],
    };

    res.send(body);
});

app.use(errorHandler);
