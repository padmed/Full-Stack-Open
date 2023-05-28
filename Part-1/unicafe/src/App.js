import { useState } from "react";

const Button = ({ label, handleStat }) => (
  <button onClick={handleStat}>{label}</button>
);

const DisplayStat = ({ label, reviewCount }) => (
  <p>
    {label} {reviewCount}
  </p>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  return (
    <>
      <div>
        <h1>Give Feeback</h1>
        <Button label="good" handleStat={handleGood} />
        <Button label="neutral" handleStat={handleNeutral} />
        <Button label="bad" handleStat={handleBad} />
      </div>
      <div>
        <h1>Statistics</h1>
        <DisplayStat label="good" reviewCount={good} />
        <DisplayStat label="neutral" reviewCount={neutral} />
        <DisplayStat label="bad" reviewCount={bad} />
      </div>
    </>
  );
};

export default App;
