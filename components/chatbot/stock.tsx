export async function Stock({
  symbol,
  numOfMonths,
}: {
  symbol: string;
  numOfMonths: number;
}) {
  const data = {
    timeline: [
      { date: "2021-01-01", value: 100 },
      { date: "2021-01-02", value: 110 },
      { date: "2021-01-03", value: 120 },
    ],
  };

  return (
    <div>
      <div>{symbol}</div>

      <div>
        {data.timeline.map((data) => (
          <div>
            <div>{data.date}</div>
            <div>{data.value}</div>
          </div>
        ))}
      </div>

      <div>{numOfMonths}</div>
    </div>
  );
}
