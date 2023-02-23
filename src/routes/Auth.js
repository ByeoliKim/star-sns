import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { authService } from "../fbase";

export default function Auth () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const onChange = (event) => {
        //console.log(event.target.name);
        const {
            target: {name, value},
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }
    // 구조분해할당을 풀어서 작성하면
    /*
    const onChange = (event) => {
        const [name, value] = event.target;
        if (name === "email") {
            setEmail(value);
        } else if(name === "password") {
            setPassword(value);
        }
    }
    */
   // preventDefault = 기본 행위가 실행되는 걸 원치 않을 때 사용! "내가 할 거양ㅋ 냅둬!"
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            const auth = getAuth();
            if(newAccount) {
                // create account
                data = await createUserWithEmailAndPassword (
                    auth, email, password
                );
            } else {
                // log in
                data = await signInWithEmailAndPassword (
                    auth, email, password
                );
            }
            console.log(data);
        } catch (error) {
            console.log(error);
        }
        
    }
    return(
        <>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} name="email" type="text" placeholder="Email" required value={email} />
                <input onChange={onChange} name="password" type="password" placeholder="Password" required value={password} />
                <input 
                    type="submit"
                    value={newAccount ? "Create Account" : "Log In"} 
                />
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </>
    )
}