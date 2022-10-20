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
                <div className="generated_content">
                    <div id="text_eosd">"Embodiment of {adj} {noun}"</div>
                    <button onClick={addToDatabase} className="add_button">save</button>
                    <button onClick={generate} className="new_button">new</button>
                </div>

                <div className="top_ones_content">
                    <div style={{textDecoration: "underline"}} id="text_eosd">10 Recent Devils</div>
                    {list.map((e, index) => <div className="top_text" id="text_eosd" key={index}>{(index+1) + ". " + '"' + e + '"'}</div>)}
                </div>
        </div>
    )

}

