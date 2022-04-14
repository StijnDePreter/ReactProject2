import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { newsAdded } from '../features/news/newsSlice'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

function CreateNews() {
  const [title, setTitle] = useState('')
  const [subtitle, setSubTitle] = useState('')
  const [content, setContent] = useState('')


  const dispatch = useDispatch()

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onSubTitleChanged = (e) => setSubTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)

  const canSave = [title, content].every(Boolean)

  const history = useHistory()

  const onSaveNewsClicked = async () => {
    if (canSave) {
      try {
        dispatch(newsAdded(
          title,
          subtitle,
          content
        ))
      } catch (err) {
        console.error('Failed to save the news: ', err)
      }
    }
  }

  return (
    <>
      <h2>Een nieuwe artikel aanmaken</h2>
      <Form>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Titel</Form.Label>
          <Form.Control type="text" placeholder="Titel van het nieuwe artikel" value={title} onChange={onTitleChanged} />
          <Form.Text>
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="subtitle">
          <Form.Label>Subtitel</Form.Label>
          <Form.Control type="text" placeholder="Subtitel van het nieuwe artikel" value={subtitle} onChange={onSubTitleChanged} />
          <Form.Text>
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Het artikel" value={content} onChange={onContentChanged} />
          <Form.Text>
          </Form.Text>
        </Form.Group>
        <Link to={`news/`}><Button onClick={onSaveNewsClicked} disabled={!canSave} variant="primary">Artikel opslaan</Button></Link>

      </Form>
    </>
  );
}

export default CreateNews;