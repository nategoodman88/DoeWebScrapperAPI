import express from "express";
import cheerio from "cheerio";
import axios from "axios";

const app = express();
const port = process.env.PORT || 6900;

const male_doe_url = "https://www.doenetwork.org/uid-geo-us-males.php";
const female_doe_url = "https://www.doenetwork.org/uid-geo-us-females.php";

const male_doe_arr = [];
const female_doe_arr = [];

async function getMales() {
    try {
        const response = await axios.get(male_doe_url);
        const $ = cheerio.load(response.data);
        //Find any element with class rig (the class used by Doe Network's UL of Does) then parse through each child LI, then parse through each child h3 and save that as the title of the Doe. Push to previous array for saving
        $(".rig", response.data).each((index, element) => {
            $(element).children("li").each((index, element) => {
                const maleDoeTitle = $(element).children("h3").text()
                //const maleDoeRace = $(element).children("").text() -> WIP 
                male_doe_arr.push({maleDoeTitle},/*{MaleDoeRace} -> WIP */);
                //console.log(male_doe_arr); -> for debugging
                return male_doe_arr;
            })
        })
    }
    catch(e) {
        console.error(e);
    }
}

async function getFemales() {
    try {
        const response = await axios.get(female_doe_url);
        const $ = cheerio.load(response.data);
        //Find any element with class rig (the class used by Doe Network's UL of Does) then parse through each child LI, then parse through each child h3 and save that as the title of the Doe. Push to previous array for saving
        $(".rig", response.data).each((index, element) => {
            $(element).children("li").each((index, element) => {
                const femaleDoeTitle = $(element).children("h3").text()
                //const femaleDoeRace = $(element).children("").text() -> WIP 
                female_doe_arr.push({femaleDoeTitle},/*{femaleDoeRace} -> WIP */);
                //console.log(female_doe_arr); -> for debugging
                return female_doe_arr;
            })
        })
    }
    catch(e) {
        console.error(e);
    }
}
function parseData() {
    getMales();
    getFemales();
}

parseData();

app.get("/males",(req, res)  => {
    res.send(JSON.stringify(
    {
        "Male Does": male_doe_arr,
    }
    ))})

app.get("/females",(req, res)  => {
    res.send(JSON.stringify(
    {
        "Female Does": female_doe_arr,
    }
    ))})

app.listen(port, () => console.log("Server running"));
