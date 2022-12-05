import { useEffect, useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [dataChat, setDataChat] = useState([])
  const [username, setUsername] = useState()
  const [state, setState] = useState({username: '', message: ''})

  const handleSetNickname = () => {
    window.sessionStorage.setItem('username', JSON.stringify(state.username))
    setUsername(state.username)
  }

  const sendMessage = () => {
    if (state.message.length){
      const data = JSON.parse(window.localStorage.getItem('data'))
      const message = {
        username: state.username,
        message: state.message,
      }

      window.localStorage.setItem('data', JSON.stringify([...(data?.length ? data : []), ...[message]]))
      setDataChat([...(data?.length ? data : []), ...[message]])
      setState({...state, message: ''})
    }
  }

  const handleKeyDown = (el) => {
    if (el.keyCode === 13) {
      sendMessage()
    }
  }

  const loginForm = (
    <div className="form__container mb-3 bg-light">
      <label htmlFor="exampleFormControlInput1" className="form-label">Имя пользователя</label>
      <input onChange={e => setState({ ...state, username: e.target.value })} type="text" className="form-control" id="form-username" placeholder="Введите имя" />
      <div className="d-flex w-100 justify-content-end">
        <button type="button" className="btn mt-3 btn-primary" onClick={() => handleSetNickname()}>
          Войти
        </button>
      </div>
    </div>
  )

  const sending = (
    <div className="d-flex mt-2">
      <input value={state.message} onKeyDown={handleKeyDown} onChange={e => setState({ ...state, message: e.target.value })} type="text" className="form-control" id="form-message" placeholder="Напишите сообщение" />
      <button type="button" className="btn-sent" onClick={() => sendMessage()}>
        <img className="icon__container" alt="sent" src="/sent.png"/>
      </button>
    </div>
  )

  const messages = (
    <div className="messages__container">
      {dataChat.length ? dataChat.map((item, index) => (
        <div className={`message__item ${state.username === item.username ? 'self' : ''}`} id={`${index}`}>
          <div className="message">
            <div className="username">{item.username}</div>
            {item.message}
          </div>
        </div>
      )) : null}
    </div>
  )

  //Здравствуйте! В этом блоке кода у меня есть один вопрос, я сталкивался с ним уже много раз,
  //но так и не смог найти оптимальное решение.
  //Как подгружать динамически данные из localstorage без бесконечного вызова dataChat в этом случае?
  //Обычно для такого существуют стейт менеджеры(redux,mobx, например), но в задании не указано, что их можно использовать.
  //Если мое тестовое не устроит, можно, пожалуйста, попросить Вас ответить в фидбеке на этот вопрос? Спасибо за Ваше время!
  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem('data'))

    if (data){
      setDataChat(data)
    } else {
      setDataChat([])
    }
  }, [dataChat])

  return (
    <section className="main">
      {username ?
        <div className="main__container">
          {messages}
          {sending}
        </div> : <>{loginForm}</>
      }
    </section>
  );
}

export default App;
