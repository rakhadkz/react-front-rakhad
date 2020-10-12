import React, { Component, useEffect, useState } from "react";
import { Button, Modal, Container, Form, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../App.css";

const URL = 'http://localhost:';
const PORT = process.env.REACT_APP_PORT || 3000;
const BASIC_URL = URL + PORT;

export default function Movie(props) {
  const { history } = props;

  const [movies, setMovies] = useState([]);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");

  const handleShow = () => {
    setShow(true);
  };

  const id = props.match.params.catalog_id;
  const fetchMovies = () => {
    axios.get(BASIC_URL + "/movie/" + id).then((res) => {
      setMovies(res.data.data);
    });
  };

  const catalogTitle = () => {
    axios
      .get(BASIC_URL + "/catalog/" + id)
      .then((res) => {
        setTitle(res.data.data.title);
      })
      .catch((e) => {
        console.log(e.message);
        setTitle(null);
        history.push("/404");
      });
  };

  useEffect(() => {
    catalogTitle();
    fetchMovies();
  }, []);
  return (
    <Container className="p-5">
      <div className="text-center">
        <h3>{title}</h3>
        <small className="text-muted">
          You can{" "}
          <a className="clickable" onClick={handleShow}>
            create
          </a>{" "}
          a new movie
        </small>
      </div>
      <MovieList movies={movies} fetchMovies={fetchMovies} />
      <ShowModal show={show} setShow={setShow} setMovies={setMovies} id={id} />
    </Container>
  );
}

const MovieList = (props) => {
  const movies = props.movies;

  const deleteMovie = (id, e) => {
    e.preventDefault();
    axios.delete(BASIC_URL + "/movie/" + id).then((res) => {
      console.log(res.data);
      props.fetchMovies();
    });
  };

  const items = movies.map((object) => (
    <ListGroup.Item key={object.id}>
      {object.name}
      <small className="text-muted ml-2">{object.count}</small>
      <FontAwesomeIcon
        onClick={(e) => deleteMovie(object.id, e)}
        className="clickable right trash"
        icon={faTrash}
      />
    </ListGroup.Item>
  ));
  return (
    <ListGroup className="px-5" variant="flush">
      {items}
    </ListGroup>
  );
};

const ShowModal = (props) => {
  const show = props.show;
  const [name, setName] = useState("");
  const id = props.id;

  const handleClose = () => {
    props.setShow(false);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleCreate = () => {
    axios
      .post(BASIC_URL + "/movie", { name: name, catalog_id: id })
      .then((res) => {
        console.log(res.data);
        props.setShow(false);
        props.setMovies((movies) => [res.data.data, ...movies]);
        setName("");
      });
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New catalog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="titleID">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter movie name"
            value={name}
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
  );
};
