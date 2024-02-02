import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post("/submit-form", async (req, res) => {
  const { name, email, category, keywords, message } = req.body;
  const discordWebhookUrl =
    "https://discord.com/api/webhooks/1203080369088237638/tQQflKcKiE5h8gZrRLm8dfO0fgMNFdKRBW8MnjbNpRCXD2sSvE8fURImrtAQQIktRwqs";
  const discordMessage = {
    content: `**New Submission**\n\n **Name**:\n ${name}\n\n **Email**:\n ${email}\n\n **Category**:\n ${category}\n\n **Keywords**:\n ${keywords}\n\n **Article**:\n ${message}`,
  };
  console.log(req.body);
  try {
    await axios.post(discordWebhookUrl, discordMessage);
    res.redirect("https://csu-web.vercel.app/thankyou");
  } catch (error) {
    console.error("Error sending message to Discord", error);
    res.status(500).send("Error submitting form");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
