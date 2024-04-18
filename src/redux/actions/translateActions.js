import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../../constant";

// thunk aksiyonu
export const getLanguages = createAsyncThunk(
  "tarnslate/getLanguages",
  async () => {
    // apiden dis verilerini al
    const res = await axios.request(options);

    // aksiyonun yayload olacak veriyi return etme
    return res.data.data.languages;
  }
);
// çeviri işlemi yapıp sonucunu store aktaran aksiyon
export const translateText = createAsyncThunk(
  "translate/text",
  async ({ text, sourceLang, targetLang }) => {
    // istek için gerekli ayarlar
    const params = new URLSearchParams();
    params.set("source_language", sourceLang.value);
    params.set("target_language", targetLang.value);
    params.set("text", text);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "1fa1b45efamsha481eac3538db60p187b4bjsnf5bb982cc981",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: params,
    };
    const res = await axios.request(options);
    // aksiyonun payload belirleme
    return res.data.data.translatedText;
  }
);
