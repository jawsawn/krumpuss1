
import { useEffect, useRef, useState } from "react";
import Links from "../components/links"
import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, query, orderBy, deleteDoc, limit, getDoc, onSnapshot } from "firebase/firestore";


export default function Page_custom() {
    const DB = collection(db, "customDB");
    //Create
    async function addToDB() {
        const docRef = await addDoc(DB,
            {
                name: output.slice(1),
                timestamp: Date.now()
            })
    }

    const [input, setInput] = useState("");
    const [list, setList] = useState([]);
    const [output, setOutput] = useState("Enter Text To Generate");

    function rand(input) {
        return Math.floor(Math.random() * input);
    }

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

    async function generateCeleb(type = "", opt = "?name=") {
        const api = await fetch(`https://api.api-ninjas.com/v1/celebrity${opt}${type}`,
            {
                method: "GET",
                headers: { "X-Api-Key": "0TbXBklDknADIYd0p5YcQA==PeH2tTMTvY4se5ma" }
            })
            .then(res => res.json())
        //.then(data => data.word.toLowerCase())
        //console.log(api)
        try {
            return api[rand(api.length)].name
        } catch (error) {
            console.log(error)
        }
    }

    async function generateName(type = "", opt = "?gender=") {
        const api = await fetch(`https://api.api-ninjas.com/v1/babynames${opt}${type}`,
            {
                method: "GET",
                headers: { "X-Api-Key": "0TbXBklDknADIYd0p5YcQA==PeH2tTMTvY4se5ma" }
            })
            .then(res => res.json())
        //.then(data => data.word.toLowerCase())
        //console.log(api)
        try {
            return api[0]
        } catch (error) {
            console.log(error)
        }
    }


    const handleChange = (e) => {
        setInput(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setOutput("...");
        const arr = input.split(" ");
        let parsed = "";
        for (let index = 0; index < arr.length; index++) {
            switch (arr[index]) {
                case "NOUN":
                    parsed = parsed + " " + await generateWord("noun");
                    break;
                case "VERB":
                    parsed = parsed + " " + await generateWord("verb");
                    break;
                case "ADJ":
                    parsed = parsed + " " + await generateWord("adjective");
                    break;
                case "ADV":
                    parsed = parsed + " " + await generateWord("adverb");
                    break;
                case "RAN":
                    parsed = parsed + " " + await generateWord();
                    break;
                case "CELEB:":
                    parsed = parsed + " " + await generateCeleb(arr[index++ + 1]);
                    break;
                case "BOY":
                    parsed = parsed + " " + await generateName("boy");
                    break;
                case "GIRL":
                    parsed = parsed + " " + await generateName("girl");
                    break;
                case "NEUTRAL":
                    parsed = parsed + " " + await generateName("neutral");
                    break;
                default:
                    parsed = parsed + " " + arr[index];
                    break;
            }
        }
        setOutput(parsed);
    }

    //onLoad
    useEffect(() => {
        //Read
        const q = query(DB, orderBy("timestamp", "desc"), limit(10));
        onSnapshot(q, (snapshot) => {
            setList(snapshot.docs.map(e => e.data().name))
        })
    }, []);

    return (
        <div className="page">
            <div className="generated_wrapper">
                <div className="title">{output}</div>
                <form className="recent_wrapper form" onSubmit={handleSubmit}>
                    <input type="text" name="name" spellCheck="false" placeholder="enter text" onChange={handleChange} />
                    <button type="submit">Submit</button>
                    <button type="button" onClick={addToDB}>Save</button>
                </form>
                
            </div>
            <div className="recent_wrapper maxsized">
                <div className="title med break">
                    Create your custom sentence<br />
                    Available keywords: "NOUN" "VERB" "ADJ" "ADV" "RAN" "CELEB: name" "BOY" "GIRL" "NEUTRAL"
                </div>
            </div>
            <div className="recent_wrapper">
                <div className="title med" style={{ textDecoration: "underline" }}>10 Recent Customs</div>
                <div className="recent_content">{list.map((e, index) => <div className="title med" key={index}>{`"${e}"`}</div>)}</div>
            </div>
            <Links />
        </div>
    )
}