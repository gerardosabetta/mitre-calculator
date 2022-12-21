import "./App.css";
import CoeficientSelector from "./components/CoeficientSelector";
import { FormProvider, useForm } from "react-hook-form";

import _techniques from "./assets/techniques.json";
import { useState } from "react";

const techniques = _techniques.map((technique: any) => ({
  ...technique,
  adjusted_score: technique.cumulative_score,
}));

function App() {
  const [topTechniques, setTopTechniques] = useState<any[]>([]);
  const methods = useForm({});
  const { handleSubmit } = methods;
  const onSubmit = (data: any) => {
    const techniquesWithScore = techniques
      .map((technique: any) => {
        const monitorTypes = Object.entries(data);
        const newTechnique = { ...technique };

        monitorTypes.forEach(([monitorType, score]) => {
          if (newTechnique[`${monitorType}_coverage`]) {
            newTechnique.adjusted_score +=
              (1 / monitorTypes.length) * +(score as string);
          }
        });

        return newTechnique;
      })
      .sort((a: any, b: any) => b.adjusted_score - a.adjusted_score);

    setTopTechniques(techniquesWithScore.slice(0, 10));
  };

  return (
    <div className="App">
      <FormProvider {...methods}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            border: "1px solid black",
          }}
        >
          <div>filters</div>
          <div
            style={{
              padding: "1rem",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <CoeficientSelector name="network" />
              <CoeficientSelector name="process" />
              <CoeficientSelector name="file" />
              <CoeficientSelector name="cloud" />
              <CoeficientSelector name="hardware" />
              <input type="submit" />
            </form>
          </div>

          <div>
            <ol>
              {topTechniques.map((technique) => (
                <li key={technique.id}>
                  {technique.tid} - {technique.name}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </FormProvider>
    </div>
  );
}

export default App;
