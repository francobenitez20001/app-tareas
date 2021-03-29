import { useReducer } from 'react';
import {MOSTRAR_ALERTA, OCULTAR_ALERTA} from '../../types/index';
import alertaReducer from './alertaReducer';
import {AlertaContext} from './alertaContext';

const AlertaState = props=>{

    const INITIAL_STATE = {
        alerta:null
    }

    const [state,dispatch] = useReducer(alertaReducer,INITIAL_STATE);

    const mostrarAlerta = (msg,categoria)=>{
        dispatch({
            type:MOSTRAR_ALERTA,
            payload:{msg,categoria}
        });

        setTimeout(() => {
            dispatch({type:OCULTAR_ALERTA})
        }, 2000);
    }

    return(
        <AlertaContext.Provider 
            value={{
                alerta:state.alerta,
                mostrarAlerta
            }}>
            {props.children}
        </AlertaContext.Provider>
    )
}
export default AlertaState;