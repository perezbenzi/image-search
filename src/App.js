import { Formik, Form, Field } from 'formik';
import './content.css';
import './header.css';
import { useState } from 'react';

function App() {
  const [photos, setPhotos] = useState([]);
  const open = url => window.open(url)
  console.log({ photos });

  return (
    <div className="App">
      <header className="header">
        <Formik
          initialValues={{ search: '' }}
          onSubmit={async (values) => {
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, {
              headers: {
                Authorization: 'Client-ID mLHEauvpcccd2j-kyzrqRZH_-WycGk-C3Ho5Cno4JpM',
              },
            });
            const data = await response.json();

            setPhotos(data.results);
          }}
        >
          <Form>
            <Field name="search" />
            <button type="submit">Search</button>
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="grid-container">
          {photos.map(photo => 
            <article key={photo.id} onClick={() => open(photos.links.html) }>
            <img className="grid-item" src={photo.urls.regular}></img>
            </article>)}
        </div>
      </div>
    </div>
  );
}

export default App;
