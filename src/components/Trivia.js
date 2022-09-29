import { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../assets/play.mp3";
import correct from "../assets/correct.mp3";
import wrong from "../assets/wrong.mp3";
import data from "../data.json"
import Frage from "./Frage.js";



export default function Trivia( {

    questionNumber,
    setQuestionNumber,
    setTimeOut,
} ) {
    const [question, setQuestion] = useState( 1 );
    const [selectedAnswer, setSelectedAnswer] = useState( null );
    const [className, setClassName] = useState( "answer" );
    const [letsPlay] = useSound( play );
    const [correctAnswer] = useSound( correct );
    const [wrongAnswer] = useSound( wrong );

    useEffect( () => {
        letsPlay();
    }, [letsPlay] );

    useEffect( () => {
        setQuestion( data[questionNumber - 1] );
    }, [data, questionNumber] );

    const delay = ( duration, callback ) => {
        setTimeout( () => {
            callback();
        }, duration );
    };

    const handleClick = ( a ) => {
        setSelectedAnswer( a );
        setClassName( "answer active" );
        delay( 3000, () => {
            setClassName( a.correct ? "answer correct" : "answer wrong" );
        } );


        delay( 5000, () => {
            if ( a.correct ) {
                correctAnswer();
                delay( 1000, () => {
                    setQuestionNumber( ( prev ) => prev + 1 );
                    setSelectedAnswer( null );
                } );

            } else {
                wrongAnswer();
                delay( 1000, () => {
                    setTimeOut( true );
                } );

            }

        } )

    };
    const creatQuastion = () => {
        return data.map( ( post, index ) => <Frage post={post}
            selectedAnswer={selectedAnswer}
            handleClick={handleClick}
            className={className}
            key={index} /> )
    }
    return (
        <div className="trivia">
            <Frage post={data[questionNumber]}
                selectedAnswer={selectedAnswer}
                handleClick={handleClick}
                className={className}
            />
        </div>
    );
}
