import {useState} from 'react';
import axios from "axios";

import { Button } from './Styled';
import { error } from 'console';



function Cep() {

    const [cep,setCep] = useState<string>('')
    const [logradouro, setLogradouro] = useState<string>('')
    const [bairro, setBairro] = useState<string>('')
    const [cidade, setCidade] = useState<string>('')
    const [uf, setUf] = useState<string>('')

    function buscarCep(){
       axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((response) => {
        setLogradouro(response.data.logradouro)
        setBairro(response.data.bairro)
        setCidade(response.data.localidade)
        setUf(response.data.uf)
       }).catch((erro) => {
        console.log(erro)
       } )
    }

    function validaCampos(){
      return logradouro.trim() !== '' && bairro.trim() !== "" && cidade.trim() !== ""
    }
    

    return (
      <div>
        <h1>Buscar CEP</h1>

        <span>
            <input value={cep} onChange={((e) => setCep(e.target.value))}  type="text" placeholder='Digite um CEP'/>

            
            <Button onClick={() => buscarCep()}>Buscar</Button>
        </span>

        <span>
            <ul>
              {validaCampos() && <>
                <li>Logradouro: {logradouro}</li>
                <li>Bairro: {bairro}</li>
                <li>Cidade: {cidade}</li>
                <li>UF: {uf}</li>
              </>}

              {!validaCampos() && <>
              Esperando um CEP para analisar 😎
              </>}
                
            </ul>
        </span>

      </div>
    );
  }
  
  export default Cep;