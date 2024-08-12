
function Message(){

    const name=''
    if (name)
        return <h1>hello {name} </h1>; // parenthisis will have anything that returns a value: function or var
    return <h1>hello world</h1>    
}

export default Message;

