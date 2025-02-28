import express, { response } from "express"
import axios from "axios"
import bodyParser from "body-parser"


const app = express()
const PORT = 8677
const API_URL = "https://secrets-api.appbrewery.com"


const BearerToken = "7f957e9a-956d-4517-a2a1-e639eee317e2";
const config = {
    Headers: {Autorization: `Bearer ${BearerToken}`}
}

app.set("view engine", "ejs");

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))




app.get("/", (req, res) => {
      res.render("index.ejs", {content: "Your web is starting here ...."})
})



app.post("/get-secret", async (req, res) => {

     const searchId = req.body.id
    try {
        const result = await axios.get(
            API_URL + "/secrets/{id}" + searchId, config
        );
        res.render("index.ejs", {content: JSON.stringify(result.data)})
    } catch (error) {
        console.log(error.response.data)
        res.status(500)
    }
})


app.post("/post-secret", async (req, res) => {

    try {
        const result = await axios.post(API_URL + "/secrets", config)
        res.render("index.ejs", {content:JSON.stringify(result.data)})
    } catch (error) {
        console.log(error.response.data)
        res.status(500)
    }
})



app.post("/put-secret", async (req, res) => {

    const searchId = req.body.id
    try {
        const result = await axios.put(
            API_URL + "/secrets/{id}" + searchId, config
        )
        res.render("index.ejs", {content: JSON.stringify(result.data)})
    } catch (error) {
        console.log(error.response.data)
        res.status(500)
    }

})


app.post("/patch-secret", async (req, res) => {
    const searchId = req.body.id
    try {
        const result = await axios.patch(
            API_URL + "/secrets/{id}" + searchId,
            config
        )
        res.render("index.ejs", {content: JSON.stringify(result.data)})
    } catch (error) {

        console.log(error.response.data)
        res.status(404)
    }
})


app.post("/delete-secret", async (req, res) => {
    const searchId = req.body.id
    try {
        const result = await axios.delete(
            API_URL + "/secrets/{id}" + searchId,
          config
        );
        res.render("index.ejs", {content: JSON.stringify(result.data)})
    } catch (error) {
         console.log(error.response.data)
         res.status(404)
    }
})



app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})