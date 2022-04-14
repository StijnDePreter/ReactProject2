import React from 'react';
import './App.css';
import CreateNews from './components/createNews';
import EditNewsForm from './components/editNewsForm';
import ArticleList from './components/articleList';
import ArticleDetail from './components/articleDetail';
import Info from './components/info';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'


function Header() {
  return(
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




    // <div>
    //   <h1>Simple Single Page Application</h1>
    //   <ul className="header">
    //       <li><NavLink to="/" exact activeClassName="active">Home</NavLink></li>
    //       <li><NavLink to="/createNews" activeClassName="active">Nieuwtje aanmaken</NavLink></li>
    //       <li><NavLink to="/info" activeClassName="active">Meer info</NavLink></li>
    //   </ul>
    // </div>
  );
}
  


function Main() {
  return(
  <div className="content">
      <Switch>

          <Route exact path="/" component={ArticleList} />
          <Route exact path="/news" component={ArticleList} />
          <Route exact path="/news/:newsId" component={ArticleDetail} />
          <Route exact path="/news/editNews/:newsId" component={EditNewsForm} />
          <Route exact path="/createNews" component={CreateNews} />
          <Route exact path="/info" component={Info} />
          <Redirect to="/"/>
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


