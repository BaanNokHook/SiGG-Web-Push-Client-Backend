require("dotenv").config({ path: "variables.env" });
const PushNotifications = require("@pusher/push-notifications-server");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "client")));

const beamsClient = new PushNotifications({
  instanceId: process.env.INSTANCE_ID,
  secretKey: process.env.SECRET_KEY,
});

app.get("/pusher/beams-auth", function (req, res) {
  // Do your normal auth checks here 🔒
  const userId = "2ce748be-003e-4c7f-a204-2fb3098a0e16"; // get it from your auth system
  const userIDInQueryParam = req.query["user_id"];
  console.log(userIDInQueryParam);
  if (userId != userIDInQueryParam) {
    res.status(401).send("Inconsistent request");
  } else {
    const beamsToken = beamsClient.generateToken(userId);
    console.log("BeamsToken: " + JSON.stringify(beamsToken));
    res.send(JSON.stringify(beamsToken));
  }
});

app.post("/pusher/beams-publish-to-users", function (req, res) {
  console.log("request body: " + JSON.stringify(req.body));
  const userId = req.body.userId; // get it from your auth system
  beamsClient
    .publishToUsers([userId], {
      web: {
        notification: {
          title: req.body.title,
          body: req.body.message,
        },
      },
    })
    .then((publishResponse) => {
      console.log("Just published: ", publishResponse.publishId);
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
  res.status(200).end();
});


app.post("/queryTxnId", function (req, res) {
  console.log("request body:" + JSON.stringify(req.body));
  let resp = {
    "id":"1661445102302",
    "jsonrpc":"2.0",
    "result":{
       "txnEncodeData":"0200000001d6ae071ac67527ec26e3ef7320205ad11f3fc7f1ecd38c8ed7b01402653ef70b000000006a47304402202d9896c41addca73ac3917a213792dec6315b99e631271c2cacdd0355be08d4502200397c4a1f3d415af23a0ee9204571e4865f2dc728e81b3b32682134ed58d82a70121021e3814727b62bb0a3be4ec4faa17fb87504bd3922bffbc8db0c81c5496d467b3ffffffff0200e1f505000000001976a914d57571ee8f1d9bfc741b10e2dfd38bbe6f712cee88ac7c9f8042170000001976a91458d70e440419c1f564f24232f924cf93dc93cfc688ac00000000",
       "txnId":"6659b67d661d19a927dd73ed7fbc5371ae782190501b9eb6c4b9cd4b154859bf"
    }
 };

  res.send(JSON.stringify(resp));
});


app.post("/generateSignatureTxnId", function (req, res) {
  console.log("request body:" + JSON.stringify(req.body));
  let resp = {
       "message":"xxxxxxxxxxx",
       "signature":"16b15f88bbd2e0a22d1d0084b8b7080f2003ea83eab1a00f80d8c18446c9c1b6224f17aa09eaf167717ca4f355bb6dc94356e037edf3adf6735a86fc3741f5231b"
 };

  res.send(JSON.stringify(resp));
});

app.post("/SubmitvalidateTxnId", function (req, res) {
  console.log("request body:" + JSON.stringify(req.body));
  let resp = {
    "id":"1661445102302",
    "jsonrpc":"2.0",
    "result":{
       "txnEncodeData":"16b15f88bbd2e0a22d1d0084b8b7080f2003ea83eab1a00f80d8c18446c9c1b6224f17aa09eaf167717ca4f355bb6dc94356e037edf3adf6735a86fc3741f5231b",
       "txnId":"6659b67d661d19a927dd73ed7fbc5371ae782190501b9eb6c4b9cd4b154859bf"
    }
 };

 
  res.send(JSON.stringify(resp));
});

app.post("/queryTxnId", function (req, res) {                // NSCII(Natnuphoe Standard Code for Information Interchange ) 
  console.log("request body:" + JSON.stringify(req.body));
  let resp = {
    "id":"1661445102302",
    "jsonrpc":"2.0",
    "result":{
       "Encrypted":"9AA70957FDE5AC24D3F5C61776A0605362D3ACF0E33805D5309154E95195FEA13D5AC5D089B2A3265E292F374567EACFB8F3BE20929271801A1AE7B22221DD6BAFEFE2E98FA2EF7A5832516A09B55C4121482",
       "Decrypted":"OUFBNzA5NTdGREU1QUMyNEQzRjVDNjE3NzZBMDYwNTM2MkQzQUNGMEUzMzgwNUQ1MzA5MTU0RTk1MTk1RkVBMTNENUFDNUQwODlCMkEzMjY1RTI5MkYzNzQ1NjdFQUNGQjhGM0JFMjA5MjkyNzE4MDFBMUFFN0IyMjIyMURENkJBRkVGRTJFOThGQTJFRjdBNTgzMjUxNkEwOUI1NUM0MTIxNDgy"
    }
 };

 
  res.send(JSON.stringify(resp));
});

app.post("/wallets/masque/publicKey", (req, res) => {
  console.log("PublicKey request body: " + JSON.stringify(req.body));
  let publicKey = {
    publicKey: "02c0b87cdf43939e3a87002a2b76376e563205d479a8e21d364b424b48a67d4310",
  };
  res.send(publicKey);
});

app.post("/devices", (req, res) => {
  console.log("Device request body: " + JSON.stringify(req.body));
  res.status(201).end();
});

app.post("/devices/:deviceId/status", (req, res) => {
  console.log("Device request Id: " + req.params.deviceId);
  res.status(201).end();
});

app.set("port", process.env.PORT || 5000);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
