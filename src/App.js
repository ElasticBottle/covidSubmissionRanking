import React from "react";
import AppStyle from "./App.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SequenceTable from "./components/sequenceTable/sequenceTable";
import { getConfig } from "./services/config";

function App() {
  const [config, setConfig] = React.useState({});

  React.useEffect(() => {
    getConfig().then((result) => setConfig(result));
  }, []);
  return (
    <Row className={AppStyle.app}>
      <Col className="mt-3">
        <SequenceTable config={config} />
      </Col>
    </Row>
  );
}

export default App;
