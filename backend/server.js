const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/audit", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    let validUrl;

    try {
      validUrl = new URL(url);
    } catch {
      return res.status(400).json({ error: "Invalid URL" });
    }

    const start = Date.now();

    const response = await axios.get(validUrl.href, {
      timeout: 10000,
      validateStatus: () => true,
    });

    const responseTime = Date.now() - start;

    const contentType = response.headers["content-type"] || "";

    if (!contentType.includes("text/html")) {
      return res.status(400).json({
        error: "URL is not an HTML page",
      });
    }

    const $ = cheerio.load(response.data);

    const title = $("title").text().trim();

    const metaDescription =
      $('meta[name="description"]').attr("content") || "";

    const h1Count = $("h1").length;

    const imagesMissingAlt = $("img").filter((i, el) => !$(el).attr("alt")).length;

    const bodyText = $("body").text();

    const wordCount = bodyText
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

    res.json({
      httpStatus: response.status,
      responseTimeMs: responseTime,
      pageTitle: title,
      metaDescription,
      h1Count,
      imagesMissingAlt,
      approximateWordCount: wordCount,
    });
  } catch (err) {
    if (err.code === "ECONNABORTED") {
      return res.status(408).json({
        error: "Request Timeout",
      });
    }

    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});