const express = require("express");
const bodyParser = require("body-parser");
const { getPresets, getAllPresets } = require("./repositories/preset.repository");
const router = express.Router();
const app = express();

// Here we are configuring express to use body-parser as middleware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var port = process.env.FHU_SYNC_API_PORT ?? 3042;

app.listen(port, () => {
    console.log("Server started on port 3042");
});

router.get("/preset-list", async (request, response, next) => {
    try {
        console.log("Got preset list request")

        var { pageReq, sizeReq, sortReq } = request.query;

        var page = parseInt(pageReq) ?? 1;
        var size = parseInt(sizeReq) ?? 10;
        var sort = sortReq ?? "asc";

        var presets = await getPresets(page, size, sort);

        console.log("Sending payload");
    } catch (e) {
        console.log(e);
        response.json({"error": "Couldn't retrieve preset list"});
    }
    response.json(presets);
});

router.get("/all-presets", async (request, response, next) => {
    try {
        console.log("Got all-presets request")

        var { sinceTimestamp } = request.query;

        var presets = await getAllPresets(sinceTimestamp);

        console.log("Sending payload");
    } catch (e) {
        console.log(e);
        response.json({"error": "Couldn't retrieve preset list"});
    }
    response.json(presets);
});

// Add router to the app.
app.use("/", router);