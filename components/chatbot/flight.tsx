export async function Flight({ flightNumber }: { flightNumber: string }) {
  const data = {
    status: "On Time",
    source: "JFK",
    destination: "LAX",
  };

  return (
    <div>
      <div>{flightNumber}</div>
      <div>{data.status}</div>
      <div>{data.source}</div>
      <div>{data.destination}</div>
    </div>
  );
}
