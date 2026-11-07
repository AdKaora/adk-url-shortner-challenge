import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card'; 
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { createLink } from './links.js';

export default function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null); 

  function changeUrl(event) {
    setUrl(event.target.value);
    setError(''); 
    setResult(null); 
  }
  async function submit(event) {
    event.preventDefault();
    if (loading) return;  
       
    setError('');
    setResult(null); 
    setLoading(true);
    try {
      const link = await createLink(url);
      setResult(link);
    } catch (creationError) {
      setError(creationError.message);
    } finally {
      setLoading(false);
    }
  } 

  return (
       <main style={{ maxWidth: '600px', margin: '40px auto' }}>
        <Card title="URL shortener" subTitle="Incolla indirizzo" >
          <form onSubmit={submit} aria-busy={loading}>
            <p><label htmlFor="original-url">URL og</label></p>
            <div className="p-inputgroup">          
              <InputText  id="original-url" type="url"  value={url}
                placeholder="https://esempio.com/il-mio-indirizzo"
                onChange={changeUrl}  disabled={loading}       
                invalid={Boolean(error)}  aria-invalid={Boolean(error)}
                aria-describedby={error ? 'url-error' : undefined}
                required
              />
               <Button type="submit" label="Accorcia" loading={loading}/>
            </div>
          </form>
          {error && <Message id="url-error" severity="error" text={error} />}
          {result && (
            <section aria-label="Risultato" aria-live="polite">
              <p><label htmlFor="short-url">Link breve</label></p>
              <div className="p-inputgroup"> 
                <InputText id="short-url" value={window.location.origin + '/' + result.code} readOnly /> 
              </div>
            </section>
          )}
        </Card>
      </main>
  );
}
