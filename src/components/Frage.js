export default function frage( props ) {
    const post = props.post;
    const selectedAnswer = props.selectedAnswer;
    const handleClick = props.handleClick;
    const className = props.className;
    return <div key={post.id}>
        <>
            <div className="question" key={post.question}>{post.question}</div>
            <div className="answers" key={post.answers}>
                {post.answers.map( ( a, index ) => (
                    <div key={index}
                        className={selectedAnswer === a ? className : "answer"}
                        onClick={() => !selectedAnswer && handleClick( a )}
                    >
                        {a.text}
                    </div>
                ) )}
            </div>
        </>
    </div>
}