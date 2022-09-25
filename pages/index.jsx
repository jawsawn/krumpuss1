import Head from 'next/head'
import { useState, useEffect } from "react";
const verbs = [
  "rip",
  "puncture",
  "break",
  "split",
  "explode",
  "sexplode",
  "erase",
  "destroy",
  "sex"
];

const nouns = [
  "slit",
  "penis",
  "vagina",
  "schism",
  "bussy",
  "rumpus"
];



export default function Home() {
  const [rnoun, setrnoun] = useState();
  const [rverb, setrverb] = useState();


  const generate = () => {
    //noun
    fetch('https://api.api-ninjas.com/v1/randomword?type=noun', {
      method: "GET",
      headers: {
        "X-Api-Key": "0TbXBklDknADIYd0p5YcQA==PeH2tTMTvY4se5ma"
      }
    })
      .then((response) => response.json())
      .then((data) => setrnoun(data.word));

    //verb
    fetch('https://api.api-ninjas.com/v1/randomword?type=verb', {
      method: "GET",
      headers: {
        "X-Api-Key": "0TbXBklDknADIYd0p5YcQA==PeH2tTMTvY4se5ma"
      }
    })
      .then((response) => response.json())
      .then((data) => setrverb(data.word));
  };

  useEffect(() => {
    generate()
  }, []);

  return (
    <main>
      <Head>
        <title>Krumpuss</title>
      </Head>

      <body background="rupikaur.png">

        <div className='text' onClick={generate}>
          <h1>{rverb} the {rnoun}</h1>
        </div>

        <footer>
          <a href='/'>Rip The Slit</a>  <br />
          <a href='/whenthepawn'>When The Pawn</a>
        </footer>

      </body>

      <style jsx>
        {`
                h1 {
                    font-size: 4rem;
                    font-family: "Times New Roman", Times, serif;
                    color: black;
                    text-align: justify;
                  }
                .text {
                  position: fixed;
                  top: 20%;
                  left: 20%;
                  background-color: white;
                }
                footer {
                  position: fixed;
                  bottom: 1%;
                }
                `}
      </style>
    </main>
  )
}
