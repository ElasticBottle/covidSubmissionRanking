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
    <div className={AppStyle.app}>
      <Row>
        <Col className="mt-3">
          <div className={AppStyle.seqTable}>
            <SequenceTable config={config} />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
