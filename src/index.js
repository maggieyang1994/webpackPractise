// import _ from 'lodash'
// import $ from 'jquery'
import printMe from './print.js'

// import './style.css'

// console.log(process.env.NODE_ENV)
// if (process.env.NODE_ENV !== 'production') {
//   console.log('Looks like we are in development mode!');
// }
// function component() {
//   let element = document.createElement('div');
//   var btn = document.createElement('button');
//   // lodash（目前通过一个 script 引入）对于执行这一行是必需的
//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//   btn.innerHTML = '点击这里，然后查看 console！';
//   btn.onclick = printMe;

//   element.appendChild(btn);
//   return element;
// }

// let element = component()
// document.body.appendChild(element);

// console.log(module)

// if (module.hot) {
//   module.hot.accept('./print.js', function () {
//     console.log('Accepting the updated printMe module!');
//     document.body.removeChild(element);
//     element = component(); // Re//     // 重新渲染 "component"，以便更新 click 事件处理函数
//     document.body.appendChild(element);
//   })
// } 
function getComponent() {
  return new Promise((resolve, reject) => {
    import(/* webpackChunkName: "lodash" */ 'lodash').then(({ default: _ }) => {
      var element = document.createElement('div');
 
      element.innerHTML = _.join(['Hello', 'webpack'], ' ');
      element.classList.add("index");
      var btn = document.createElement("button")
      btn.innerHTML = '点击这里，然后查看 consddosssddddle';
      //   btn.onclick = printMe;
      import (/* webpackPrefetch: true */ './print.js').then(
       btn.onclick = printMe
     )
      element.appendChild(btn);
      console.log('env at index', env);
      console.log('test provideplugins', $(".index"))
      resolve(element);
 
    }).catch(error => resolve(error));
  })
    
  }

 getComponent().then(component => {
   document.body.appendChild(component);
 }).catch((err) => {
  document.body.innerHTML = err
 })

//  if (module.hot) {
//   module.hot.accept();
// }