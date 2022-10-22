
import { useEffect, useRef, useState } from "react";
import Links from "../components/links"


export default function Page_whenthepawnest() {

    async function generateWord(type = "", opt = "?type=") {
        const word = await fetch(`https://api.api-ninjas.com/v1/randomword${opt}${type}`,
            {
                method: "GET",
                headers: { "X-Api-Key": "0TbXBklDknADIYd0p5YcQA==PeH2tTMTvY4se5ma" }
            })
            
            .then(res => res.json())
        //.then(data => data.word.toLowerCase())
        //console.log(word)
        return word.word.toLowerCase()
    }

    //onLoad
    useEffect(async () => {
        for (let index = 0; index < tempwords.length; index++) {
            const gen = await generateWord(tempwords[index]);
            words[index] = setWords(words => [...words, gen]);
        }
    }, []);

    const [words, setWords] = useState([]);
    let tempwords = [];
    let wordsIndex = 0;
    function Word(word) {
        tempwords.push(word);
        return (
            <div className="inline pink">{words[wordsIndex++]}</div>
        )
    }

    return (
        <div className="page whenthepawn">
            <div className="generated_wrapper">
                <div className="title med">
                    When the {Word("noun")} hits the {Word("noun")} he {Word("verb")}s like a {Word("noun")}<br />
                    What he {Word("verb")}s throws the {Word("verb")}s when he goes to the {Word("noun")}<br />
                    There's no {Word("noun")} to {Word("verb")} when your {Word("noun")} is your {Word("noun")}<br />
                    So when you go {Word("noun")}, you hold your own {Word("noun")}<br />
                    And remember that {Word("noun")} is the greatest of {Word("noun")}s<br />
                    And if you know where you {Word("verb")}, then you know where to {Word("verb")}<br />
                    And if you {Word("verb")} it won't matter, cuz you'll know that you're {Word("noun")}<br />
                    And hell {Word("verb")} the whole thing 'fore he enters the {Word("noun")}<br />
                </div>
            </div>
            <Links />
        </div>
    )
}

// `When the pawn hits the conflicts he thinks like a king
// What he knows throws the blows when he goes to the fight
// And hell win the whole thing 'fore he enters the ring
// There's no body to batter when your mind is your might
// So when you go solo, you hold your own hand
// And remember that depth is the greatest of heights
// And if you know where you stand, then you know where to land
// And if you fall it won't matter, cuz you'll know that you're right`