// express
import express from 'express'
const app = express()
const port = 8840

// imports
import fetch from "node-fetch";
import { XMLParser, XMLBuilder, XMLValidator} from "fast-xml-parser";

// vars
let api = "https://accountws.nintendo.net/v1/api/admin/mapped_ids?input_type=user_id&output_type=pid&input=";
let mii_api = "https://accountws.nintendo.net/v1/api/miis?pids=";

let nc_id = 'a2efa818a34fa16b8afbc8a74eba3eda';
let nc_secret = 'c91cdb5658bd4954ade78533a339cf9a';

const parser = new XMLParser();

app.get('/all', (req, res) => {
    let nnid = req.query.id;

    fetch(api + nnid, {
        headers: {
        'X-Nintendo-Client-ID': nc_id,
        'X-Nintendo-Client-Secret': nc_secret
        }})
        .then(response => response.text())
        .then(data => {
            let jObj = parser.parse(data);
            let out_id = jObj.mapped_ids.mapped_id.out_id;
            fetch(mii_api+out_id, {
                headers: {
                'X-Nintendo-Client-ID': nc_id,
                'X-Nintendo-Client-Secret': nc_secret
                }
            })
                .then(response => response.text())
                .then(xml => {
                    let jObj2 = parser.parse(xml);
                    res.send(jObj2);
                })
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
})

app.get('/expression', (req, res) => {
    let nnid = req.query.id;
    let expression = req.query.type

    fetch(api + nnid, {
        headers: {
        'X-Nintendo-Client-ID': nc_id,
        'X-Nintendo-Client-Secret': nc_secret
        }})
        .then(response => response.text())
        .then(data => {
            let jObj = parser.parse(data);
            let out_id = jObj.mapped_ids.mapped_id.out_id;
            fetch(mii_api+out_id, {
                headers: {
                'X-Nintendo-Client-ID': nc_id,
                'X-Nintendo-Client-Secret': nc_secret
                }
            })
                .then(response => response.text())
                .then(xml => {
                    let jObj2 = parser.parse(xml);

                    let faces = jObj2.miis.mii.images.image;
                    let face_type = faces.find(face => face.type === expression);

                    res.status(301).redirect(face_type.url)
                    res.send(face_type.url);
                })
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
})

app.get('/whash', (req, res) => {
    let nnid = req.query.id;

    fetch(api + nnid, {
        headers: {
        'X-Nintendo-Client-ID': nc_id,
        'X-Nintendo-Client-Secret': nc_secret
        }})
        .then(response => response.text())
        .then(data => {
            let jObj = parser.parse(data);
            let out_id = jObj.mapped_ids.mapped_id.out_id;
            fetch(mii_api+out_id, {
                headers: {
                'X-Nintendo-Client-ID': nc_id,
                'X-Nintendo-Client-Secret': nc_secret
                }
            })
                .then(response => response.text())
                .then(xml => {
                    try {
                        let jObj2 = parser.parse(xml);
                        res.send(jObj2.miis.mii.data);
                        } catch (e) {
                            res.status(404).send("Not Found");
                        }
                })
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
})

app.get('/mhash', (req, res) => {
    let nnid = req.query.id;

    fetch(api + nnid, {
        headers: {
        'X-Nintendo-Client-ID': nc_id,
        'X-Nintendo-Client-Secret': nc_secret
        }})
        .then(response => response.text())
        .then(data => {
            let jObj = parser.parse(data);
            let out_id = jObj.mapped_ids.mapped_id.out_id;
            fetch(mii_api+out_id, {
                headers: {
                'X-Nintendo-Client-ID': nc_id,
                'X-Nintendo-Client-Secret': nc_secret
                }
            })
                .then(response => response.text())
                .then(xml => {
                    try {
                    let jObj2 = parser.parse(xml);
                    let url = jObj2.miis.mii.images.image[0].url;
                    let urlSplit = url.split("/");
                    let urlPart = urlSplit[urlSplit.length - 1];
                    let result = urlPart.split("_")[0];
                    res.send(result);
                    } catch (e) {
                        res.status(404).send("Not Found");
                    }
                })
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
