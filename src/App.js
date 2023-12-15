import { usePeople } from "./hooks/usePeople";
import Table from "./components/Table";
import Background from "./components/Background";

function App() {
  const [people, isGettingPeople] = usePeople();
  const filteredPeople = people?.filter((person) => person !== undefined);
  return (
    <Background>
      <main>
        {isGettingPeople ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontSize: "28px",
            }}
          >
            Loading people data...
          </div>
        ) : (
          <Table data={filteredPeople} />
        )}
      </main>
      <footer style={{ color: "white" }}>
        <a href="https://www.freepik.com/free-photo/3d-hyperspace-background-with-warp-tunnel-effect_8879794.htm#query=star%20wars%20background&position=0&from_view=keyword&track=ais&uuid=cc0dbc28-c5cb-4df6-9b01-53304dbc2959">
          Image by kjpargeter
        </a>{" "}
        on Freepik
      </footer>
    </Background>
  );
}

export default App;
