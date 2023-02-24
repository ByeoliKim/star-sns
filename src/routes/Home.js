import { dbService } from "fbase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";


export default function Home () {
    const [write, setWrite] = useState("");
    const [writes, setWrites] = useState([]);
    const getWrites = async () => {
        const q = query(collection(dbService, "nweets"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const writeObj = {
                ...doc.data(),
                id : doc.id,
            }
            setWrites(prev => [writeObj, ...prev]);
        });
        // const dbWrites = await dbService.collection("nweets").get();
        // //console.log(dbWrites);
        // dbWrites.forEach((document) => {
        //     const writeObject = {
        //         ...document.data(),
        //         id: document.id,
        //     }
        //     setWrites(prev => [writeObject, ...prev]);
        // });
    };
    useEffect(() => {
        getWrites();
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        // dbService.collection("nweets").add({
        //     write,
        //     createAt: Date.now(),
        // });
        // setWrite("");
        try {
            const docRef = await addDoc(collection(dbService, "nweets"), {
                write,
                createAt: Date.now(),
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            console.error(error);
        }
        setWrite("");
    }
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setWrite(value);
        /*
            구조 분해 할당 하기 전은 이런 모양새
            setWrite(event.target.value);
        */
    }
    return(
        <>
            <p style={{
                fontSize: "24px"
            }}>
                안뇽하세요~~~ 별이 홈이어요~ ^^;
                로그인에 성공해야 해당 페이지가 보인답니다?!ㅠㅠbbb
            </p>
            <form onSubmit={onSubmit}>
                <input value={write} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="STAR!" />
            </form>
            <div>
                {writes.map((write) => 
                    <div key={write.id}>
                        <h4>{write.write}</h4>
                    </div>
                )}
            </div>
        </>
    )
}