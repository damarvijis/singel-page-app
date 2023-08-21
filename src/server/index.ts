import { Request, Response } from 'express';

const express = require("express")
const path = require("path")
const app = express()
const port = 3002

app.use(express.static("dist"))

app.get("/*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "..", "dist", "index.html"))
})

app.listen(port, () => {
  console.log("Running on port " + port)
})
