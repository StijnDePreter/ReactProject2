import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { selectNewsById, selectAllNews, changeNews } from '../features/news/newsSlice';
import { useDispatch, useSelector } from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

function EditNewsForm(props) {

  const newsId = props.match.params.newsId

  const article = useSelector(state =>
    state.news.news.find(news => news.id === newsId)
  )


  const [title, setTitle] = useState(article.title)
  const [content, setContent] = useState(article.content)

  const dispatch = useDispatch()
  const history = useHistory()

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)

  const onSaveArticleClicked = async () => {
    if (title && content) {
      dispatch(changeNews({ id: newsId, title, content }))
      history.push(`/posts/${newsId}`)
    }
  }

  return (

    <Form>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Titel</Form.Label>
        <Form.Control type="text" placeholder="Titel van het nieuwe artikel" value={title} onChange={onTitleChanged} />
        <Form.Text>
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="content">
        <Form.Label>Content</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Het artikel" value={content} onChange={onContentChanged} />
        <Form.Text>
        </Form.Text>
      </Form.Group>
      <Link to={`news/`}><Button onClick={onSaveArticleClicked} variant="primary">Artikel opslaan</Button></Link>
    </Form>
  )


}

export default EditNewsForm;

