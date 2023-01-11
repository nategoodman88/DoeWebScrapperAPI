const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios"); 

const app = express();
const port = process.env.PORT || 6900;

const url = "https://www.doenetwork.org/uid-geo-us-males.php";

//const doe_title_arr = [];

async function getData() {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const titles = $("h3").text();
        return titles;
    }
    catch(e) {
        console.error(e);
    }
}

        /*
        const doe_title = $("article");

        doe_title.each(function() {
            title = $(this).find("h3").text();

            doe_title_arr.push({title});
        })
        return doe_title_arr;
    }
    catch(e) {
        console.error(e);
    }
}
*/

app.get("/data",(req, res)  => {
    getData()
    .then(getData => {
        res.send(JSON.stringify(
            {
                "status": 200,
                "Blah": getData,
            }
        ))
})
    .catch(error => {
        res.send(JSON.stringify(
            {
                error,
            }
        ))
})
}),

app.listen(port, () => console.log("Server running"));
