import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/api/convert", async (req, res) => {
  try {
    const { from, to, amount } = req.query;

    const response = await axios.get(
      `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`
    );

    if (response.data && response.data.result) {
      res.json({
        from,
        to,
        amount: Number(amount),
        convertedAmount: response.data.result,
      });
    } else {
      res.status(500).json({ error: "Conversion failed. Try again later." });
    }
  } catch (error) {
    res.status(500).json({ error: "Conversion failed. Try again later." });
  }
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
