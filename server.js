import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

app.use(cors());

app.get("/naver-shop", async (req, res) => {
  const q = req.query.query;
  if (!q) {
    return res.status(400).json({ error: "query 파라미터를 넣어주세요" });
  }

  try {
    const url = `https://openapi.naver.com/v1/search/shop?query=${encodeURIComponent(
      q
    )}&display=10`;

    const resp = await fetch(url, {
      headers: {
        "X-Naver-Client-Id": NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": NAVER_CLIENT_SECRET
      }
    });

    const data = await resp.json();
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "naver api error" });
  }
});

app.get("/", (req, res) => {
  res.send("Naver shopping proxy is running");
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
