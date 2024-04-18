import React, { useEffect, useMemo, useState } from "react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getLanguages, translateText } from "./redux/actions/translateActions";
import Select from "react-select";
import Loading from "./components/Loading";
import { setAnswer } from "./redux/selices/translateSlice";

const App = () => {
  const dispatch = useDispatch();
  const languageSlice = useSelector((store) => store.languageSlice);
  const translateSlice = useSelector((store) => store.translateSlice);

  const [text, setText] = useState("");

  const [sourceLang, setSourceLang] = useState({
    value: "tr",
    label: "Turkish",
  });
  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  });
  // apiden dil verilerini al store akrat
  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  //  diziyi bizden istenen formata çevirdik
  //  objelerin {code,name} keylerini {value,label} cevirdik

  const data = useMemo(
    () =>
      languageSlice.languages.map((i) => ({
        value: i.code,
        label: i.name,
      })),
    [languageSlice.languages]
  );
  // değiştirme
  const handleSwap = () => {
    // select lerin değişimi
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    // cevap text areasındaki veriyi diğer text area'ya aktar
    setText(translateSlice.answer)
    //soru text areasındaki veriyi diğer text area'ya aktar
    dispatch(setAnswer(text))
  };
  return (
    <div id="main-page">
      <div className="box">
        <h1>Çeviri</h1>
        <div className="upper">
          <Select
            value={sourceLang}
            onChange={setSourceLang}
            className="select"
            options={data}
            isLoading={languageSlice.isLoading}
            isDisabled={languageSlice.isLoading}
          />
          <button onClick={handleSwap}>
            <FaArrowRightArrowLeft />
          </button>
          <Select
            value={targetLang}
            onChange={setTargetLang}
            className="select"
            options={data}
            isLoading={languageSlice.isLoading}
            isDisabled={languageSlice.isLoading}
          />
        </div>
        <div className="middle">
          <div>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <div>
            <textarea disabled value={translateSlice.answer} />
            {translateSlice.isLoading && <Loading />}
          </div>
        </div>
        <button
          onClick={() =>
            dispatch(translateText({ text, sourceLang, targetLang }))
          }
        >
          Çevir
        </button>
      </div>
    </div>
  );
};

export default App;
