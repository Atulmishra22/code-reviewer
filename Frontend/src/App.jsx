import { useEffect, useState} from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import axios from 'axios'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import "highlight.js/styles/github-dark.css";
import './App.css'

function App() {

  const [code, setCode] = useState("")
  const [review, setReview] = useState("")

  useEffect(()=>{
    prism.highlightAll()

  },[])
  async function reviewCode(){
    const response = await axios.post('http://127.0.0.1:3000/ai/get-review',{ code })
    console.log(response.data)
    setReview(response.data)
  }
  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor 
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.js)}
              padding={10}
              style={{
                fontFamily:'"Fira code", monospace',
                fontSize: 16,
                width: '100%',
                height: '100%',
                border: "1px solid #ddd",
                borderRadius: '0.7rem',
                }}
            />
          </div>
          <div className="review" 
            onClick={reviewCode}>Review</div>
        </div>
        <div className="right">
          <Markdown
            rehypePlugins={[rehypeHighlight]}
          >{review}</Markdown>
        </div>
      </main>
    </>
  )
}

export default App
