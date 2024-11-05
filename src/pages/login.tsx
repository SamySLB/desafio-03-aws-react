
import { app } from '../config/firebaseConfig';
import {GithubAuthProvider,getAuth, signInWithPopup} from 'firebase/auth';

function Login(){
  const githubProvider = new GithubAuthProvider();
  const auth = getAuth(app);

  
  const githubSignUp = () => {
    signInWithPopup(auth,githubProvider)
    .then((response)=>{
      console.log(response.user)
    })
  }
 

  return(
   <div>
      <header></header>
      
      <h1>Digite o nome do usúario que deseja buscar</h1>
      <input type="text" />
     <input type="submit" value="->"/>

        <div></div>
        <p>ou</p>
        <div></div>

      <p>Acesse sua conta com</p>
      <button onClick={githubSignUp}>GitHub</button>
      
      <footer></footer>
      
      </div>
  )
}
export default Login;
