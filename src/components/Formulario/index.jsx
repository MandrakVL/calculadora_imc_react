import { useRef, useState } from 'react';
import styles from './Formulario.module.css';

const Formulario = () => {
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [alturaUsuario, setAlturaUsuario] = useState(0);
    const [pesoUsuario, setPesoUsuario] = useState(0);
    const [classificacao, setClassificacao] = useState('');
    const [mensagem, setMensagem] = useState(false);
    const [erro, setErro] = useState(false);
    const inputName = useRef(null);
    const inputAltura = useRef(null);
    const inputPeso = useRef(null);
    // Calcular o IMC
    const calcularIMC = pesoUsuario / (alturaUsuario * alturaUsuario);
    const imc = calcularIMC.toFixed(1);

    const guardaNomeUsuario = (evento) => {
        setNomeUsuario(evento.target.value);
    }
    const guardaAlturaUsuario = (evento) => {
        setAlturaUsuario(evento.target.value);
    }
    const guardaPesoUsuario = (evento) => {
        setPesoUsuario(evento.target.value);
    }

    const exibirResultadoIMC = () => {
        if(nomeUsuario === '' || alturaUsuario === 0 || pesoUsuario === 0) {
            setErro(!erro)
            setTimeout(() => {
                setErro(erro)
            }, 3000)
        } else {
                classificacaoUsuario();
                setMensagem(!mensagem);
        }
    }
    
    const classificacaoUsuario = () => {
        if (imc <= 18.5) {
            setClassificacao(`${nomeUsuario}, você está muito abaixo do peso!`);
        } else if (imc <= 24.9) {
            setClassificacao(`${nomeUsuario}, você está com o peso ideal (parabéns)!`);
        } else if (imc <= 29.9) {
            setClassificacao(`${nomeUsuario}, você está levemente acima do peso!`);
        } else if (imc <= 34.9) {
            setClassificacao(`${nomeUsuario}, você está com a Obesidade grau I.`);
        } else if (imc <= 39.9) {
            setClassificacao(`${nomeUsuario}, você está com a Obesidade grau II.`);
        } else {
            setClassificacao(`${nomeUsuario}, você está com a Obesidade grau III (mórbida).`);
        }
    }

    const limparInputs = () => {
        inputName.current.value = '';
        inputAltura.current.value = '';
        inputPeso.current.value = '';
        setNomeUsuario('');
        setAlturaUsuario(0);
        setPesoUsuario(0);
        setMensagem(null);
    }

    return (
        <div className={styles.form}>
            <div className={styles.textForm}>
                <h1>Calculadora de IMC</h1>
            </div>
            <div className={styles.inputStyles}>
                <input type="text" ref={inputName} placeholder="Seu nome" onChange={guardaNomeUsuario}/>
            </div>
            <div className={styles.inputStyles}>
                <input type="number" ref={inputAltura} placeholder="Sua altura" onChange={guardaAlturaUsuario}/>
            </div>
            <div className={styles.inputStyles}>
                <input type="number" ref={inputPeso} placeholder="Seu peso" onChange={guardaPesoUsuario}/>
            </div>
            <div className={styles.botoesForm}>
                <button onClick={exibirResultadoIMC}>Confirmar</button>
                <button onClick={limparInputs}>Limpar</button>
            </div>
            {mensagem && 
                <div className={styles.resultadoForm}>
                    <h3>Resultado:</h3>
                    <span className={styles.resultadoFormTextIMC}>IMC: {imc}</span>
                    <span className={styles.resultadoFormText}>Classificação: </span>
                    <span className={styles.resultadoFormRespos}>{classificacao}</span>
                </div>
            }
            {erro &&
                <p className={styles.mesangemEstilo}>Por favor preencha todos os campos!</p>
            }
        </div>
    )
}

export default Formulario;