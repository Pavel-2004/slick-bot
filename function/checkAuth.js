import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {getFirestore, getDocs, query, collection, doc, getDoc} from "firebase/firestore";
export function getUserIdToken(db, tokenId) {
  const tokenRef = doc(db, "tokens", tokenId)
  return getDoc(tokenRef)
    .then(token => {
      if (token.exists()) {
        var currTime = new Date().getTime() / 1000;
        if (token.data().expires <= currTime) {
          return {error: true, message: "Token expired", auth: true}
        }
        else {
          return {error: false, auth:true, userId: token.data().userId}
        }
      }
      else {
        return {error: true, message: "No such token", auth: true}
      }
    })
}