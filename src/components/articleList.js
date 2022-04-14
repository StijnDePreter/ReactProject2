import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllNews, fetchNews, selectLast10NewNews } from '../features/news/newsSlice'
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


const Article = ({ article }) => {
  return (
    <div className="article" key={article.id}>
      <Card border="primary" style={{ width: '40rem' }}>
        <Card.Header><Link to={`news/${article.id}`}><h2>{article.title}</h2></Link></Card.Header>
        <Card.Body>
          <Card.Title>{article.subtitle}</Card.Title>
          <Card.Text>
            {(article.content.length > 200) ? article.content.substring(0, 197) + '...' : article.content}
          </Card.Text>
          <Link to={`news/${article.id}`}><Button variant="primary">bekijk artikel</Button></Link>
        </Card.Body>
      </Card>
      <br />
    </div>
  )
}

function ArticleList() {
  const dispatch = useDispatch()
  const news = useSelector(selectLast10NewNews)

  const status = useSelector(state => state.news.status)
  const error = useSelector(state => state.news.error)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchNews())
    }
  }, [status, dispatch])

  let content

  if (status === 'loading') {
    content =
      <p>Loading...</p>
  } else if (status === 'succeeded') {
    content = news.map(article => (
      <Article key={article.id} article={article} />
    ))
  } else if (status === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="news-list">
      <h2>'t Beste Nieuws</h2>
      {content}     
    </section>
  )
}

export default ArticleList;
