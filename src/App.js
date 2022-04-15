import React from 'react';
import './App.css';
import CreateNews from './components/createNews';
import EditNewsForm from './components/editNewsForm';
import ArticleList from './components/articleList';
import ArticleDetail from './components/articleDetail';
import Info from './components/info';
import { Switch, Route, BrowserRouter, Redirect, NavLink } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'


function Header() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">HBN - Het Beste Nieuws</Navbar.Brand>
          <Nav className="me-auto">
            <NavLink className="navbarlink" to="/" exact activeClassName="active">Home</NavLink>
            <NavLink className="navbarlink" to="/createNews" activeClassName="active">Nieuwtje aanmaken</NavLink>
            <NavLink className="navbarlink" to="/info" activeClassName="active">Meer info</NavLink>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
}



function Main() {
  return (
    <div className="content">
      <Switch>

        <Route exact path="/" component={ArticleList} />
        <Route exact path="/news" component={ArticleList} />
        <Route exact path="/news/:newsId" component={ArticleDetail} />
        <Route exact path="/news/editNews/:newsId" component={EditNewsForm} />
        <Route exact path="/createNews" component={CreateNews} />
        <Route exact path="/info" component={Info} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Container className="contact-content debug-border" >
        <Main />
      </Container>

    </BrowserRouter>
  );
};

export default App;


