import './styles.css';
import { useState } from 'react';
import MyLoader from '../Loader';

function Search() {
const [user, setUser] = useState('');
  //A const abaixo ira receber a requisição da api
  //do github trazendo as informações de usuário
  const [userData, setUserData] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (event) => {
    //Eliminando o comportamento nativo de refresh do React
    event.preventDefault();
    //O fetch é responsável por requisições https
    fetch(`https://api.github.com/users/${user}`)
      .then(response => response.json())
      .then(userResponse => setUserData(userResponse))
      .finally(() => setIsLoading(false));
  }

  const handleChange = (event) => {
    setUser(event.target.value);
  }
    return (
        <div className="search-container">
            <form className="search-form" onSubmit={handleSubmit}>
                <h1 className="search-title">
                    Encontre um perfil Github
                </h1>
                <input 
                    placeholder="Usuário Github" 
                    className="search-input" 
                    type="text" 
                    required
                    value={user}
                    onChange={handleChange}
                />
                <div>
                    <button type="submit" className="search-button">
                        Encontrar
                    </button>
                </div>
            </form>

            <div className="result-container">                             
                <div className="result-img-button">  
                    {isLoading ? <MyLoader /> : (
                        <>                             
                        <img 
                            src={userData.avatar_url} 
                            className="result-img" 
                            alt="" 
                        />  
                                    
                        <div>   
                            <button className="search-button">
                                <a href={`https://github.com/${user}`} target="_new">
                                    Ver perfil
                                </a>
                            </button>
                        </div> 
                        </>
                    )}                                       
                </div>                 
                
                <div className="result-items-container">
                    <span className="result-items-span">
                        Repositório público: {userData.public_repos}
                    </span>
                    <span className="result-items-span">
                        Seguidores: {userData.followers}
                    </span>
                    <span className="result-items-span">
                        Seguindo: {userData.following}
                    </span>
                </div> 
                <div className="result-information-container">
                    <h3 className="information-title">Informações</h3>
                    <h4 className="information-items">Empresa: {userData.company}</h4>
                    <h4 className="information-items">Website/Blog: {userData.blog}</h4>
                    <h4 className="information-items">Localidade: {userData.location}</h4>
                    <h4 className="information-items">Membro desde: {userData.created_at}</h4>
                </div>            
                <div className="clear"></div>
            </div>
        </div>
    );
}

export default Search;