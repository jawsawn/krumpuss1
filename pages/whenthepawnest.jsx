
import { useEffect, useRef, useState } from "react";
import Links from "../components/links"


export default function Page_whenthepawnest() {
    const [noun, setNoun] = useState([]);
    const generate = function () {
        const wordNoun = fetch('https://api.api-ninjas.com/v1/randomword?type=noun',
            {
                method: "GET",
                headers: { "X-Api-Key": "0TbXBklDknADIYd0p5YcQA==PeH2tTMTvY4se5ma" }
            })
            .then(res => res.json())
            .then(data => data.word)
        wordNoun.then(a => setNoun(noun => [...noun, a]))
    }

    useEffect(() => {
        for (let i = 0; i < increment; i++) {
            generate()
        }
    }, []);

    let increment = 0;
    function Noun() {
        return(
            <p>{noun[increment++]} </p>
        )
    }

    return (
        <div className="main whenthepawn">
            <div className="generated_content">
                <div className="secret">
                    "When the <Noun/> hits the <Noun/> he thinks like a <Noun/><br />
                    What he knows <Noun/> the blows when he goes to the <Noun/><br />
                    And hell win the whole <Noun/> 'fore he enters the <Noun/><br />
                    There's no <Noun/> to <Noun/> when your <Noun/> is your <Noun/><br />
                    So when you go <Noun/>, you hold your own <Noun/><br />
                    And remember that <Noun/> is the greatest of <Noun/><br />
                    And if you know where you <Noun/>, then you know where to <Noun/><br />
                    And if you <Noun/> it won't matter, cuz you'll know that you're <Noun/>"</div>
            </div>
            <Links />
        </div>
    )
}



`When the pawn hits the conflicts he thinks like a king
What he knows throws the blows when he goes to the fight
And hell win the whole thing 'fore he enters the ring
There's no body to batter when your mind is your might
So when you go solo, you hold your own hand
And remember that depth is the greatest of heights
And if you know where you stand, then you know where to land
And if you fall it won't matter, cuz you'll know that you're right`