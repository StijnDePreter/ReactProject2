import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'



function News(props) {
  const newsId = props.match.params.newsId
  const article = useSelector(state =>
    state.news.news.find(news => news.id === newsId)
  )

  if (!article) {
    return (
      <section>
        <h2>Article not found!</h2>
      </section>
    )
  }

  return (
    <Card border="primary" style={{ width: '40rem' }}>
      <Card.Header><h2>{article.title}</h2></Card.Header>
      <Card.Body>
        <Card.Title>{article.subtitle}</Card.Title>
        <Card.Text>
          {article.content}
        </Card.Text>
        <Link to={`editNews/${article.id}`}><Button variant="primary">bewerk artikel</Button></Link>
      </Card.Body>
    </Card>
  )
}

export default News;
