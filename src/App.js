import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from './components/FlashcardList/FlashcardList';
import axios from 'axios';
import './App.css';
import styled, { ThemeProvider } from 'styled-components';
import { lightMode, darkMode, GlobalStyles } from './themes';
import { FaMoon } from 'react-icons/fa';

function App() {
  const [flashcards, setFlashcards] = useState([])
  const [categories, setCategories] = useState([])
  const [theme, setTheme] = useState("light")

  const categoryEl = useRef()
  const amountEl = useRef()

  const StyledApp = styled.div`
    color: ${(props) => props.theme.fontColor};
    button: ${(props) => props.theme.button};
  `

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light")
  }

  useEffect(() => {
    axios
      .get('https://opentdb.com/api_category.php')
      .then(res => {
        setCategories(res.data.trivia_categories)
      })
  }, [])

  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios
    .get('https://opentdb.com/api.php', {
      params: {
        amount: amountEl.current.value,
        category: categoryEl.current.value
      }
    })
    .then(res => {
      setFlashcards(res.data.results.map((questionItem, index) => {
        const answer = decodeString(questionItem.correct_answer)
        const options = [
          ...questionItem.incorrect_answers.map(a => decodeString(a)), 
          answer
        ]

        return {
          id: `${index}-${Date.now()}`,
          question: decodeString(questionItem.question),
          answer: answer,
          options: options.sort(() => Math.random() - .5)
        }
      }))
    })
  }

  return (
    <ThemeProvider theme={theme === "light" ? lightMode : darkMode}>
    <GlobalStyles />
    <StyledApp>
    <>
      <form className="header" onSubmit={handleSubmit}>
      <button className="theme-toggle-btn" onClick={() => themeToggler()}><FaMoon /></button>
      <h1 className="title">Flashcard Trivia Quiz.</h1>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map(category => {
              return <option value={category.id} key={category.id}>{category.name}</option>
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of Questions</label>
          <input type="number" id="amount" min="1" step="1" defaultValue={10} ref={amountEl} />
        </div>
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
      </form>
      <div className="container">
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
    </StyledApp>
    </ThemeProvider>
  );
}

export default App;
