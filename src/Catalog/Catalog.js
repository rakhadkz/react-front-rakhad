import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../App.css";

const URL = 'http://localhost:';
const PORT = process.env.REACT_APP_PORT || 3015;
const BASIC_URL = URL + PORT;


export default function Catalog() {
  const [catalogs, setCatalogs] = useState([]);

  const fetchCatalogs = () => {
    axios.get(BASIC_URL + "/catalog").then((res) => {
      setCatalogs(res.data.data);
    });
  };

  useEffect(() => {
    fetchCatalogs();
  }, []);

  return (
    <Container
      style={{ marginTop: "50px", paddingLeft: "100px", paddingRight: "100px" }}
    >
      <Row>
        <Col></Col>
        <Col xs={10}>
          <h3 className="text-center">Movie Catalog</h3>
          <br></br>
          <CatalogList
            setCatalogs={setCatalogs}
            catalogs={catalogs}
            fetchCatalogs={fetchCatalogs}
          />
        </Col>
        <Col>
          <ModalCreate setCatalogs={setCatalogs} />
        </Col>
      </Row>
    </Container>
  );
}

function CatalogList(props) {
  const catalogs = props.catalogs;

  const deleteCatalog = (id, e) => {
    e.preventDefault();
    axios.delete(BASIC_URL + "/catalog/" + id).then((res) => {
      console.log(res.data);
      props.fetchCatalogs();
    });
  };

  const items = catalogs.map((object) => (
    <ListGroup.Item key={object.id}>
      <a href={"/catalogs/" + object.id}>{object.title}</a>
      <small className="text-muted ml-2">{object.count}</small>
      <FontAwesomeIcon
        onClick={(e) => deleteCatalog(object.id, e)}
        className="clickable right trash"
        icon={faTrash}
      />
    </ListGroup.Item>
  ));

  return <ListGroup variant="flush">{items}</ListGroup>;
}

function ModalCreate(props) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCreate = () => {
    axios.post(BASIC_URL + "/catalog", { title: title }).then((res) => {
      console.log(res);
      console.log(res.data);
      setShow(false);
      props.setCatalogs((catalogs) => [
        { ...res.data.data, count: 0 },
        ...catalogs,
      ]);
      setTitle("");
    });
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        className="fixed btn-circle btn-lg"
      >
        <FontAwesomeIcon icon={faPlus} />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New catalog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="titleID">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter catalog title"
              value={title}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
