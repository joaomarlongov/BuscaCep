import {useState} from 'react';
import axios from "axios";

import { Button } from './Styled';

import './style.scss'

import { FaSearchLocation } from "react-icons/fa";


function Cep() {

    const [cep,setCep] = useState<string>('')
    const [logradouro, setLogradouro] = useState<string>('')
    const [bairro, setBairro] = useState<string>('')
    const [cidade, setCidade] = useState<string>('')
    const [uf, setUf] = useState<string>('')

    const [naoEncontrado, setNaoEncontrado] = useState<boolean>(false)

    function buscarCep(){
       axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((response) => {
        setLogradouro(response.data.logradouro)
        setBairro(response.data.bairro)
        setCidade(response.data.localidade)
        setUf(response.data.uf)
       }).catch((erro) => {
        setNaoEncontrado(true)
       })
    }

    function validaCampos(){
      return logradouro && bairro && cidade && logradouro.trim() !== '' && bairro.trim() !== "" && cidade.trim() !== ""
    }

    function invalidoCampos(){
      return logradouro && bairro && cidade && logradouro.trim() == undefined && bairro.trim() == undefined && cidade.trim() == undefined
    }
    


    return (
      <div className='Cep'>
        <h1>Buscar CEP</h1>

        <span className='span-1'>
            <input value={cep} onChange={((e) => setCep(e.target.value))}  type="text" placeholder='Digite um CEP'/>

            
            <Button onClick={() => buscarCep()}>
              <FaSearchLocation style={{marginLeft:"2px"}}/>
            </Button>
            
            
        </span>

        <span className='result'>
            <ul>
              {validaCampos() && !naoEncontrado && <>
                <li>Logradouro: {logradouro}</li>
                <li>Bairro: {bairro}</li>
                <li>Cidade: {cidade}</li>
                <li>UF: {uf}</li>
              </>}

              {invalidoCampos() && naoEncontrado && <>
                CEP não encontrado! 👀
              </>}

              {!validaCampos() && !naoEncontrado && <>
                Esperando um CEP válido para analisar 😎
              </>}
                
              {naoEncontrado  && <>
                CEP não encontrado! 👀
              </>}
            </ul>
        </span>

      </div>
    );
  }
  
  export default Cep;