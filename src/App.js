import "./App.css";
import HeadCity from "./HeadCity";
import SearchInformation from "./SearchInformation";

function App() {
  return (
    <div className="App">
      <div className="container">
        <HeadCity />
        <SearchInformation />
      </div>
      <div className="About-creator">
        <a href="https://github.com/Kateryna29/my-react-app" target="_blank">
          Open-source code
        </a>
        , by Kateryna Nykonenko from
        <a href="https://shecodes.io/" target="_blank">
          She Codes
        </a>
      </div>
    </div>
  );
}

export default App;
