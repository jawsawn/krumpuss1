import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, query, orderBy, deleteDoc, limit, getDoc, onSnapshot } from "firebase/firestore";


export default function dbCRUD(dbName) {
    const DB = collection(db, "customDB");
    //Create
    async function addToDB() {
        const docRef = await addDoc(DB,
            {
                name: "Embodiment of " + adj + " " + noun,
                timestamp: Date.now()
            })
    }

    //onLoad
    useEffect(() => {
        //Read
        const q = query(DB, orderBy("timestamp", "desc"), limit(10));
        onSnapshot(q, (snapshot) => {
            setList(snapshot.docs.map(e => e.data().name))
        })
    }, []);

}
