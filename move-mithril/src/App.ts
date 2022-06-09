// @ts-ignore
import m from "mithril";

import "./index.css";
import move from "./move/move";

function AppComponent () {
    const  model = {
        value: '',
        list : []
    }
    const onkeyup = (ev) => {
        model.value = ev.target.value;
        if(ev.which == 13) {

            model.list = [...model.list, {
                _id : model.list.length,
                value : model.value,
                complete: false,
            }];

            model.value = '';
        }

    }

    const view = () => {
        m("input(textbox)",  {onkeyup, value: model.value}),
            m("ul", model.list.map( item => {return m('li', 'dada')}))

    }
}

m.render(
  document.getElementById("app"),
  m("div", { class: "container" }, [

    m("div", "Framework: mithril"),
    m("div", "Language: TypeScript"),
    m("div", "CSS: Empty CSS"),
  ]
  )
);
