import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, query, orderBy, deleteDoc, limit, getDoc, onSnapshot } from "firebase/firestore";
const DB = collection(db, "krumpussDB");



export default function RipTheSlit() {
    const [noun, setNoun] = useState();
    const [verb, setVerb] = useState();
    const [list, setList] = useState([]);

    const generate = async () => {
        //Generate Noun
        setNoun("______")
        fetch('https://api.api-ninjas.com/v1/randomword?type=noun', {
            method: "GET",
            headers: { "X-Api-Key": "0TbXBklDknADIYd0p5YcQA==PeH2tTMTvY4se5ma" }
        })
            .then((response) => response.json())
            .then((data) => setNoun(data.word.toLowerCase()))

        //Generate Verb
        setVerb("______")
        fetch('https://api.api-ninjas.com/v1/randomword?type=verb', {
            method: "GET",
            headers: { "X-Api-Key": "0TbXBklDknADIYd0p5YcQA==PeH2tTMTvY4se5ma" }
        })
            .then((response) => response.json())
            .then((data) => setVerb(data.word.toLowerCase()))
    };

    const addToDatabase = async () => {
        const docRef = await addDoc(DB,
            {
                name: verb + " the " + noun,
                timestamp: Date.now()
            })
    }

    //onLoad
    useEffect(() => {
        generate()
        const q = query(DB, orderBy("timestamp", "desc"), limit(10));
        onSnapshot(q, (snapshot) => {
            setList(snapshot.docs.map(e => e.data().name))
        })
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

