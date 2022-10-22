import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, query, orderBy, deleteDoc, limit, getDoc, onSnapshot } from "firebase/firestore";
const DB = collection(db, "whenthepawnDB");



export default function WhenThePawn() {
    const [noun, setNoun] = useState("...");
    const [list, setList] = useState([]);

    async function generate_noun(){
        return fetch('https://api.api-ninjas.com/v1/randomword?type=noun',
            {
                method: "GET",
                headers: { "X-Api-Key": "0TbXBklDknADIYd0p5YcQA==PeH2tTMTvY4se5ma" }
            })
            .then(res => res.json())
            .then(data => data.word.toLowerCase())
    }

    async function generate() {
        setNoun("...")
        const gen = await generate_noun()
        setNoun(gen)
    }
    
    async function addToDatabase(){
        const docRef = await addDoc(DB,
            {
                name: "when the " + noun,
                timestamp: Date.now()
            })
    }

    //onLoad
    useEffect(async () => {
        const q = query(DB, orderBy("timestamp", "desc"), limit(10));
        onSnapshot(q, snapshot => {
            setList(snapshot.docs.map(e => e.data().name))
        })
        setNoun(await generate_noun());
    }, []);

    return (
        <div className="content_wrapper">
            <div className="generated_wrapper">
                <div className="title">"when the {noun}"</div>
                <div className="button_wrapper">
                    <button onClick={addToDatabase} >save</button>
                    <button onClick={generate} >new</button>
                </div>
            </div>
            <div className="recent_wrapper">
                <div className="title med" style={{ textDecoration: "underline" }}>10 Recent Pawns</div>
                <div className="recent_content">{list.map((e, index) => <div className="title med" key={index}>{`${index + 1}. "${e}"`}</div>)}</div>
            </div>
        </div>
    )

}

