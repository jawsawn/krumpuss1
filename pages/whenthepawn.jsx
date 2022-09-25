import { useState, useEffect } from "react";

export default function WhenThePawn() {
    const [word, setword] = useState();
    const generate = () => {
        fetch('https://api.api-ninjas.com/v1/randomword?type=noun', {
            method: "GET",
            headers: {
                "X-Api-Key": "0TbXBklDknADIYd0p5YcQA==PeH2tTMTvY4se5ma"
            }
        })
            .then((response) => response.json())
            .then((data) => setword(data.word));
    }

    useEffect(() => {
        generate()
    }, []);

    return (
        <body background="whenthepawn.png">
            <div className="text">
                <h1>when the {word}</h1>
            </div>

            <footer>
                <a href='/'>Rip The Slit</a>  <br />
                <a href='/whenthepawn'>When The Pawn</a>
            </footer>

            <style jsx>
                {`
                h1 {
                    font-size: 4rem;
                    font-family: "Times New Roman", Times, serif;
                    color: white;
                    text-align: justify;
                }
                .text {
                    position: fixed;
                    top: 20%;
                    left: 20%;
                    background-color: maroon;
                }
                footer {
                    position: fixed;
                    bottom: 1%;
                }
                `}
            </style>
        </body>

    )
}