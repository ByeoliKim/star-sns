import { dbService } from "fbase";
import { addDoc, collection, query, onSnapshot, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";


// export default function Home ({userObj}) {
//     //console.log(userObj);
//     const [write, setWrite] = useState("");
//     const [writes, setWrites] = useState([]);

//     // const getWrites = async () => {
//     //     const q = query(collection(dbService, "nweets"));
//     //     const querySnapshot = await getDocs(q);
//     //     querySnapshot.forEach((doc) => {
//     //         const writeObj = {
//     //             ...doc.data(),
//     //             id : doc.id,
//     //         }
//     //         setWrites(prev => [writeObj, ...prev]);
//     //     });
//     //     // const dbWrites = await dbService.collection("nweets").get();
//     //     // //console.log(dbWrites);
//     //     // dbWrites.forEach((document) => {
//     //     //     const writeObject = {
//     //     //         ...document.data(),
//     //     //         id: document.id,
//     //     //     }
//     //     //     setWrites(prev => [writeObject, ...prev]);
//     //     // });
//     // };
//     useEffect(() => {
//         //getWrites();
//         const q = query(
//             collection(dbService, "nweets"),
//             orderBy("createdAt", "desc")    //firebase collection 내림차 정렬
//         );
//         onSnapshot(q, (snapshot) => {
//             const nweetArr = snapshot.docs.map((document) => ({
//                 id: document.id,
//                 ...document.data(),    
//             }));
//             setWrites(nweetArr);
//         });
//     }, []);

//     const onSubmit = async (event) => {
//         event.preventDefault();
//         // dbService.collection("nweets").add({
//         //     write,
//         //     createAt: Date.now(),
//         // });
//         // setWrite("");
//         try {
//             const docRef = await addDoc(collection(dbService, "nweets"), {
//                 text: write,
//                 createAt: Date.now(),
//                 creatorId: userObj.uid,
//             });
//             console.log("Document written with ID: ", docRef.id);
//         } catch (error) {
//             console.error("Error adding document: ", error);
//         }
//         setWrite("");
//     };
//     const onChange = (event) => {
//         const {
//             target: { value },
//         } = event;
//         setWrite(value);
//         /*
//             구조 분해 할당 하기 전은 이런 모양새
//             setWrite(event.target.value);
//         */
//     };
//     return(
//         <>
//             <p style={{
//                 fontSize: "24px"
//             }}>
//                 안뇽하세요~~~ 별이 홈이어요~ ^^;
//                 로그인에 성공해야 해당 페이지가 보인답니다?!ㅠㅠbbb
//             </p>
//             <form onSubmit={onSubmit}>
//                 <input value={write} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
//                 <input type="submit" value="STAR!" />
//             </form>
//             <div>
//                 {writes.map((write) => 
//                     <div key={write.id}>
//                         <h4>{write.text}</h4>
//                     </div>
//                 )}
//             </div>
//         </>
//     )
// }

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    
    useEffect(() => {
        const q = query(
            collection(dbService, "nweets"),
            orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const nweetArr = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }));
            setNweets(nweetArr);
        });
    }, []);
    
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService, "nweets"), {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        setNweet("");
        };
        const onChange = (event) => {
            const {
                target: { value },
            }  = event;
        setNweet(value);
    };
    
    return (
        <>
            <p style={{
                fontSize: "24px"
            }}>
                안뇽하세요~~~ 별이 홈이어요~ ^^;
                로그인에 성공해야 해당 페이지가 보인답니다
                릐 얼 타 임이 가능해서
                실 시 간 으 로 글 이 올 라 가 욤.
            </p>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="STAR!" />
            </form>
            <div>
                {nweets.map((nweet) => 
                    <div key={nweet.id}>
                        <h4>{nweet.text}</h4>
                    </div>
                )}
            </div>
        </>
    )
    };
    
    export default Home;