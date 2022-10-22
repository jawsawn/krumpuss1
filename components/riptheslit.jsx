import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, query, orderBy, deleteDoc, limit, getDoc, onSnapshot } from "firebase/firestore";
const DB = collection(db, "krumpussDB");



export default function RipTheSlit() {
    const [noun, setNoun] = useState();
    const [verb, setVerb] = useState();
    const [list, setList] = useState([]);

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

    const addToDatabase = async () => {
        const docRef = await addDoc(DB,
            {
                name: verb + " the " + noun,
                timestamp: Date.now()
            })
    }
    async function generate() {
        setNoun("...")
        setVerb("...")
        setNoun(await generateWord("noun"))
        setVerb(await generateWord("verb"))
    }
    //onLoad
    useEffect(async () => {
        const q = query(DB, orderBy("timestamp", "desc"), limit(10));
        onSnapshot(q, (snapshot) => {
            setList(snapshot.docs.map(e => e.data().name))
        })
        generate();
    }, []);

    return (
        <div className="content_wrapper">
            <div className="generated_wrapper">
                <div className="title">"{verb} the {noun}"</div>
                <div className="button_wrapper">
                    <button onClick={addToDatabase} >save</button>
                    <button onClick={generate} >new</button>
                </div>
            </div>
            <div className="recent_wrapper">
                <div className="title med" style={{ textDecoration: "underline" }}>10 Recent Rips</div>
                <div className="recent_content">{list.map((e, index) => <div className="title med" key={index}>{`"${e}"`}</div>)}</div>
            </div>
        </div>
    )

}

