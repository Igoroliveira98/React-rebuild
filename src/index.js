function createElement(elementType, props, ...children) {
    const virtualElementProps = {
        ...props,
        children
    }

    if(typeof elementType === "function") {
        return elementType(virtualElementProps);
    }

    return {
        tagName: elementType,
        props: virtualElementProps
    };
}

const React = {
    createElement,
}


// ========================== Convert HTML ==============================

function convertToHTML(virtualNode) {

    if(typeof virtualNode === "string" || typeof virtualNode === "number") {
        return document.createTextNode(virtualNode)
    }

    const $domElement = document.createElement(virtualNode.tagName)

    virtualNode.props.children.forEach((virtualChild) => {
        $domElement.appendChild(convertToHTML(virtualChild));
    })

    return $domElement
}

function render(initialVirtualTree, $domRoot) {

    const $appHTML = convertToHTML(initialVirtualTree)


    $domRoot.appendChild($appHTML);
}

// ============================ Componentes ====================

function Title() {
    return React.createElement("h1", null, "Titulo")
}

function App(props) {

        return ( 
        React.createElement("section", {
            className: "app"
          },
          React.createElement(Title, null), 
          React.createElement("div", null, React.createElement("div", null, "0")), 
          React.createElement("button", null, "Incrementar"), 
          React.createElement("button", null, "Decrementar")
        )
        )
}

render(React.createElement(App, null), document.querySelector("#root"))