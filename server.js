import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());

app.get("/naver-shop", async (req, res) => {
  try {
    const query = req.query.query;
    const limit = req.query.limit || 5;

    const apiUrl = `https://openapi.naver.com/v1/search/shop.json?query=${encodeURIComponent(
      query
    )}&display=${limit}`;

    const response = await fetch(apiUrl, {
      headers: {
        "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET,
      },
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ 환경변수 확인용 로그
console.log("✅ NAVER_CLIENT_ID:", process.env.NAVER_CLIENT_ID);
console.log("✅ NAVER_CLIENT_SECRET:", process.env.NAVER_CLIENT_SECRET);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on ${PORT}`));
