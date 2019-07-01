import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Header from './Header'
import Content from './Content'
import { Provider } from './react-redux'
import './index.css'


function createStore (reducer) {
    let state = null
    const listeners = []
    const subscribe = (listener) => listeners.push(listener)
    const getState = () => state
    const dispatch = (action) => {
      state = reducer(state, action)
      listeners.forEach((listener) => listener())
    }
    dispatch({}) // 初始化 state
    return { getState, dispatch, subscribe }
  }
  
  const themeReducer = (state, action) => {
    if (!state) return {
      themeColor: 'red'
    }
    switch (action.type) {
      case 'CHANGE_COLOR':
        return { ...state, themeColor: action.themeColor }
      default:
        return state
    }
  }
  
const store = createStore(themeReducer)

class Index extends Component {

    // static childContextTypes = {
    //     store: PropTypes.object
    // }
    
    // getChildContext () {
    //     return { store }
    // }

    render () {
        return (
            <div>
                <Header />
                <Content />
            </div>
        )
    }
}

ReactDOM.render(
  <Provider store={store}>
    <Index />
  </Provider> ,
  document.getElementById('root')
)


// const appState = {
//     title : {
//         text : 'React.js 小书',
//         color : 'red'
//     },
//     content : {
//         text : 'React.js 小书内容',
//         color : 'green'
//     }
// }

// function reducer(state , action){
//     if(!state){
//         return {
//             title : {
//                 text : 'React.js 小书',
//                 color : 'red'
//             },
//             content : {
//                 text : 'React.js 小书内容',
//                 color : 'green'
//             }
//         }
//     }
//     switch (action.type) {
//         case 'UPDATE_TITLE_TEXT':
//             return {
//                 ...state ,
//                 title : {
//                     ...state.title,
//                     text : action.text
//                 }
//             }
//         case 'UPDATE_TITLE_COLOR':
//             return {
//                 ...state ,
//                 title : {
//                     ...state.title ,
//                     color : action.color
//                 }
//             }
//         default:
//             return state;
//     }
// }

// function createStore (reducer) {
//     let state = null
//     const listeners = []
//     const subscribe = (listener) => listeners.push(listener)
//     const getState = () => state
//     const dispatch = (action) => {
//       state = reducer(state, action) // 覆盖原对象
//       listeners.forEach((listener) => listener())
//     }
//     dispatch({}) //初始化 state (dispatch default return)
//     return { getState, dispatch, subscribe }
// }

// function renderApp(newAppState , oldAppState = {}){
//     if(newAppState === oldAppState) return
//     console.log('render app ...')
//     renderTitle(newAppState.title , oldAppState.title)
//     renderContent(newAppState.content , oldAppState.content)
// }

// function renderTitle(newTitle , oldTitle = {}){
//     if(newTitle === oldTitle) return
//     console.log('render title ...')
//     const titleDOM = document.getElementById('title')
//     titleDOM.innerHTML = newTitle.text
//     titleDOM.style.color = newTitle.color
// }

// function renderContent(newContent , oldContent = {}){
//     if(newContent === oldContent) return
//     console.log('render content ...')
//     const contentDOM = document.getElementById('content')
//     contentDOM.innerHTML = newContent.text
//     contentDOM.style.color = newContent.color
// }

// const store = createStore(reducer)
// let oldState = store.getState() // 缓存旧的state
// store.subscribe(() => {
//     const newState = store.getState() // 数据可能变化，获取新的 state
//     renderApp(newState, oldState) // 把新旧的 state 传进去渲染
//     oldState = newState // 渲染完以后，新的 newState 变成了旧的 oldState，等待下一次数据变化重新渲染
// })

// renderApp(store.getState()) //首次渲染
// store.dispatch({ type : 'UPDATE_TITLE_TEXT', text : '《React.js 小书》' })
// store.dispatch({ type : 'UPDATE_TITLE_COLOR', color : 'green' })
// // renderApp(store.getState()) // 把新的数据渲染到页面上 （调整到 subscribe监听函数中，实现state变更后的自动重新渲染）


