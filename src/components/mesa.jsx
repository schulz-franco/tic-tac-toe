import { useState } from "react"
import { AiOutlineReload } from "react-icons/ai"

const posicionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const Casilla = ({ valor, onClick, turno })=> {

    const onClickHandler = valor => {
        (turno !== null && valor === null) && onClick()
    }

    const clase = (valor)=> {
        let claseValor = ""
        if (valor !== null) {
            claseValor = valor === "x" ? "equis" : "circulo"
        }
        return claseValor
    }

    return <div onClick={()=> onClickHandler(valor)} className={"casilla " + clase(valor)} />
}

const Tablero = ({ casillas, onClick, turno })=> {
    return(
        <div className="tablero">
            {casillas.map((casilla, index) => {
                return <Casilla 
                key={index} 
                valor={casilla} 
                onClick={()=> onClick(index)} 
                turno={turno} />
            })}
        </div>
    )
}

const Puntuacion = ({ puntos, reset })=> {
    return(
        <div className="puntuacion">
            <span>{puntos[0]}</span>
            <span>{puntos[1]}</span>
            <span onClick={reset}><AiOutlineReload /></span>
        </div>
    )
}

const Mesa = () => {

    const [turno, setTurno] = useState("x")
    const [casillas, setCasillas] = useState(Array(9).fill(null))
    const [puntuacion, setPuntuacion] = useState([0, 0])

    const checkearGanador = (copiaCasillas)=> {
        for (let index = 0; index < posicionesGanadoras.length; index++) {
            const [a, b, c] = posicionesGanadoras[index]
            if (copiaCasillas[a] && copiaCasillas[a] === copiaCasillas[b] && copiaCasillas[a] === copiaCasillas[c]) {
                return reiniciarPartida(copiaCasillas[a], posicionesGanadoras[index])
            }
        }

        if (!copiaCasillas.includes(null)) {
            return reiniciarPartida(null, Array.from(Array(9).keys()))
        }

        setTurno(turno === "x" ? "o" : "x")
    }

    const resetearPartida = ()=> {
        setTurno("x")
        setCasillas(Array(9).fill(null))
        setPuntuacion([0, 0])
    }

    const onClickHandler = casilla => {
        let copiaCasillas = [...casillas]
        copiaCasillas.splice(casilla, 1, turno)
        setCasillas(copiaCasillas)
        checkearGanador(copiaCasillas)
    }

    const reiniciarPartida = (ganador, posicionGanadora)=> {
        setTurno(null)
        if (ganador) {
            let copiaPuntuacion = puntuacion
            if (ganador === "x") {
                copiaPuntuacion[0] = puntuacion[0] + 1
            } else {
                copiaPuntuacion[1] = puntuacion[1] + 1
            }
            setPuntuacion(copiaPuntuacion)
        }
        setTimeout(()=> {
            setCasillas(Array(9).fill(null))
            setTurno("x")
        }, 1000)
    }

    return (
        <div className="main-container">
            <Tablero turno={turno} casillas={casillas} onClick={onClickHandler} />
            <Puntuacion puntos={puntuacion} reset={resetearPartida} />
        </div>
    )
}

export default Mesa