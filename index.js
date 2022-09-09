var busy = require("busyjs");
var express = require("express");
var app = express();

async function get_notifications(account) {
  console.log("call notifications api", account);
  return new Promise((resolve, reject) => {
    var client = new busy.Client("wss://notifications.blurt.world");
    client.call("get_notifications", [account], (err, result) => {
      if (err !== null) reject(err);
      resolve(result);
    });
  });
}

app.get("/get_notifications/:username", async function (req, res) {
  var result = await get_notifications(req.params.username);
  res.send(result);
});

app.listen(5000, () => {
  console.log("Server is Running");
});
