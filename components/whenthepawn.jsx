import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, query, orderBy, deleteDoc, limit, getDoc, onSnapshot } from "firebase/firestore";
const DB = collection(db, "whenthepawnDB");



export default function WhenThePawn() {
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
                name: "when" + " the " + noun,
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
                <div className="generated_content">
                    <div className="text">"when the {noun}"</div>
                    <button onClick={addToDatabase} className="add_button">save</button>
                    <button onClick={generate} className="new_button">new</button>
                </div>

                <div className="top_ones_content">
                    <div style={{textDecoration: "underline"}}>10 Recent Pawns</div>
                    {list.map((e, index) => <div className="top_text">{(index+1) + ". " + '"' + e + '"'}</div>)}
                </div>
        </div>
    )

}
