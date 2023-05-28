import { useState } from "react";

const Button = ({ label, handleStat }) => (
  <button onClick={handleStat}>{label}</button>
);

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};
const Statistics = ({ stats }) => {
  const total = stats.good + stats.neutral + stats.bad;
  let pstvPerc = (stats.good / total) * 100 + " %";
  let average = (stats.bad * -1 + stats.good) / total;

  if (total === 0) {
    return <p> No feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={stats.good} />
        <StatisticLine text="neutral" value={stats.neutral} />
        <StatisticLine text="bad" value={stats.bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={pstvPerc} />
      </tbody>
    </table>
  );
};

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
        <Statistics stats={{ good: good, neutral: neutral, bad: bad }} />
      </div>
    </>
  );
};

export default App;
