import express from "express";
import cheerio from "cheerio";
import axios from "axios";

const app = express();
const port = process.env.PORT || 6900;

const male_doe_url = "https://www.doenetwork.org/uid-geo-us-males.php";
const female_doe_url = "https://www.doenetwork.org/uid-geo-us-females.php";

const male_missing_url = "https://doenetwork.org/mp-geo-us-males.php";
const female_missing_url = "https://doenetwork.org/mp-geo-us-females.php";

let male_doe_arr = [];
let female_doe_arr = [];
let male_missing_arr = [];
let female_missing_arr = []; 

async function getMaleDoes() {
  try {
    const response = await axios.get(male_doe_url);
    const $ = cheerio.load(response.data);
    //Find any element with class rig (the class used by Doe Network's UL of Does) then parse through each child LI, then parse through each child *x* and save that as link to Doe's page. Save h3 and save that as the title of the Doe. Save attributes as attributes of the Doe. Push to previous array for saving
    $(".rig", response.data).each((index, element) => {
      $(element)
        .children("li")
        .each((value, element) => {
          $(element)
            .children("a")
            .each((value, aElement) => {
              let doeNetworkLink = $(aElement).attr("href");
              //console.log(doeNetworkLink); -> for debugging
              let maleDoeTitle = $(element).children("h3").text().toString();
              let maleDoeAttributes = $(element).text().toString();
              //Replace redundant info
              maleDoeAttributes = maleDoeAttributes.replace(maleDoeTitle, "");

              male_doe_arr.push({
                doeNetworkLink,
                maleDoeTitle,
                maleDoeAttributes,
              });

              //console.log(male_doe_arr); -> for debugging
              return male_doe_arr;
            });
        });
    });
  } catch (e) {
    console.error(e);
  }
}

async function getFemaleDoes() {
  try {
    const response = await axios.get(female_doe_url);
    const $ = cheerio.load(response.data);
    //Find any element with class rig (the class used by Doe Network's UL of Does) then parse through each child LI, then parse through each child *x* and save that as link to Doe's page. Save h3 and save that as the title of the Doe. Save attributes as attributes of the Doe. Push to previous array for saving
    $(".rig", response.data).each((index, element) => {
      $(element)
        .children("li")
        .each((value, element) => {
          $(element)
            .children("a")
            .each((value, aElement) => {
              let doeNetworkLink = $(aElement).attr("href");
              //console.log(doeNetworkLink); -> for debugging
              let femaleDoeTitle = $(element).children("h3").text().toString();
              let femaleDoeAttributes = $(element).text().toString();
              //Replace redundant info
              femaleDoeAttributes = femaleDoeAttributes.replace(
                femaleDoeTitle,
                ""
              );
              female_doe_arr.push({
                doeNetworkLink,
                femaleDoeTitle,
                femaleDoeAttributes,
              });
              //console.log(male_doe_arr); -> for debugging
              return male_doe_arr;
            });
        });
    });
  } catch (e) {
    console.error(e);
  }
}

async function getMaleMissing() {
  try {
    const response = await axios.get(male_missing_url);
    const $ = cheerio.load(response.data);
    //Find any element with class rig (the class used by Doe Network's UL of Does) then parse through each child LI, then parse through each child *x* and save that as link to Doe's page. Save h3 and save that as the title of the Doe. Save attributes as attributes of the Doe. Push to previous array for saving
    $(".rig", response.data).each((index, element) => {
      $(element)
        .children("li")
        .each((value, element) => {
          $(element)
            .children("a")
            .each((value, aElement) => {
              let doeMNetworkLink = $(aElement).attr("href");
              //console.log(doeNetworkLink); -> for debugging
              let maleMissingTitle = $(element).children("h3").text().toString();
              let maleMissingAttributes = $(element).text().toString();
              //Replace redundant info
              maleMissingAttributes = maleMissingAttributes.replace(maleMissingTitle, "");

              male_missing_arr.push({
                doeMNetworkLink,
                maleMissingTitle,
                maleMissingAttributes,
              });

              //console.log(male_doe_arr); -> for debugging
              return male_missing_arr;
            });
        });
    });
  } catch (e) {
    console.error(e);
  }
}

async function getFemaleMissing() {
    try {
      const response = await axios.get(female_missing_url);
      const $ = cheerio.load(response.data);
      //Find any element with class rig (the class used by Doe Network's UL of Does) then parse through each child LI, then parse through each child *x* and save that as link to Doe's page. Save h3 and save that as the title of the Doe. Save attributes as attributes of the Doe. Push to previous array for saving
      $(".rig", response.data).each((index, element) => {
        $(element)
          .children("li")
          .each((value, element) => {
            $(element)
              .children("a")
              .each((value, aElement) => {
                let doeMNetworkLink = $(aElement).attr("href");
                //console.log(doeNetworkLink); -> for debugging
                let femaleMissingTitle = $(element).children("h3").text().toString();
                let femaleMissingAttributes = $(element).text().toString();
                //Replace redundant info
                femaleMissingAttributes = femaleMissingAttributes.replace(femaleMissingTitle, "");
  
                female_missing_arr.push({
                  doeMNetworkLink,
                  femaleMissingTitle,
                  femaleMissingAttributes,
                });
  
                //console.log(male_doe_arr); -> for debugging
                return female_missing_arr;
              });
          });
      });
    } catch (e) {
      console.error(e);
    }
  }
function parseData() {
  getMaleDoes();
  getFemaleDoes();
  getMaleMissing();
  getFemaleMissing(); 

}

parseData();

app.get("/maledoes", (req, res) => {
  res.send([{ "Male Does": male_doe_arr }]);
});

app.get("/femaledoes", (req, res) => {
  res.send([{ "Female Does": female_doe_arr }]);
});

app.get("/malemissing", (req, res) => {
    res.send([{ "Missing Males": male_missing_arr }]);
  });

  app.get("/femalemissing", (req, res) => {
    res.send([{ "Missing Females": female_missing_arr }]);
  });
  
app.listen(port, () => console.log("Server running"));
