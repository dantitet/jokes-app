import './App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useState } from 'react';

const App = () => {
  const [joke, setJoke] = useState(null);
  const [history, setHistory] = useState([]);

  const fetchJoke = () => {
    axios
      .get('https://official-joke-api.appspot.com/random_joke')
      .then((res) => {
        if (joke) {
          setHistory([...history, joke]);
        }

        setJoke(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <Container className="app">
      <Row>
        <Col>
          <p className="emoji">😂</p>
        </Col>
      </Row>
      <Row>
        <Col className="joke-wrapper">
          {joke ? (
            <Joke joke={joke} />
          ) : (
            <p className="prompt">Ready for a joke?</p>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="info" onClick={fetchJoke}>
            Let me hear a joke
          </Button>
        </Col>
      </Row>
      {history.length > 0 ? (
        <JokesHistory history={history} clearHistory={clearHistory} />
      ) : null}
    </Container>
  );
};

const JokesHistory = (props) => {
  return (
    <Row className="history">
      <Col xs={4} className="description">
        <h2>Jokes history</h2>
        <p>Read your favorite jokes from the past again!</p>
        <Button variant="danger" onClick={props.clearHistory}>
          Clear history
        </Button>
      </Col>
      <Col className="table-wrapper">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Setup</th>
              <th>Punchline</th>
            </tr>
          </thead>
          <tbody>
            {props.history.map((j) => {
              return (
                <tr>
                  <td>{j.setup}</td>
                  <td>{j.punchline}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

const Joke = (props) => {
  return (
    <Jumbotron className="joke" fluid>
      <Container>
        <h1>{props.joke.setup}</h1>
        <p>{props.joke.punchline}</p>
      </Container>
    </Jumbotron>
  );
};

export default App;
