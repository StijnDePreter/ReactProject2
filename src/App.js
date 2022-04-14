import React from 'react';
import './App.css';
import Home from './components/home';
import CreateNews from './components/createNews';
import EditNewsForm from './components/editNewsForm';
import News from './components/articleDetail';
import ArticleList from './components/articleList';
import ArticleDetail from './components/articleDetail';
import Info from './components/info';
import { Switch, Route, BrowserRouter, Link, NavLink, Redirect } from 'react-router-dom';
import fetchNews from './features/news/newsSlice';

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
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/createNews">Artikel aanmaken</Nav.Link>
            <Nav.Link href="/info">Info</Nav.Link>
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


