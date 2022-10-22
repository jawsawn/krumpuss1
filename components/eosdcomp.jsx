import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, query, orderBy, deleteDoc, limit, getDoc, onSnapshot } from "firebase/firestore";
const DB = collection(db, "eosdDB");



export default function EOSD() {
    const [noun, setNoun] = useState();
    const [adj, setAdj] = useState();
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
        setAdj("______")
        fetch('https://api.api-ninjas.com/v1/randomword?type=adjective', {
            method: "GET",
            headers: { "X-Api-Key": "0TbXBklDknADIYd0p5YcQA==PeH2tTMTvY4se5ma" }
        })
            .then((response) => response.json())
            .then((data) => setAdj(data.word.toLowerCase()))
    };

    const addToDatabase = async () => {
        const docRef = await addDoc(DB,
            {
                name: "Embodiment of " + adj + " " + noun,
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
                <div className="title" id="text_eosd">"Embodiment of {adj} {noun}"</div>
                <div className="button_wrapper">
                    <button onClick={addToDatabase} >save</button>
                    <button onClick={generate} >new</button>
                </div>
            </div>

            <div className="recent_wrapper">
                <div className="title med" id="text_eosd" style={{ textDecoration: "underline" }}>10 Recent Devils</div>
                <div className="recent_content">{list.map((e, index) => <div className="title med" key={index}>{`"${e}"`}</div>)}</div>
            </div>
        </div>
    )

}

