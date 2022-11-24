import React, {useState} from "react";
import { TextInput, View, ScrollView, Text, TouchableOpacity } from "react-native";
import ResultImc from "./ResultImc/index";
import styles from "./styles";

export default function Form (){

    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [messageImc, setMessageImc] = useState("Preencha o peso e altura")
    const [imc, setImc] = useState(null)
    const [textButton, setTextButton] = useState("Calcular") 
    
    function imcCalculator(){
        return setImc((weight/(height*height)).toFixed(2))
    }

    function validationImc(){
        if(weight != null && height != null){
            imcCalculator()
            setHeight(null)
            setWeight(null)
            setMessageImc("Seu imc é igual:")
            setTextButton("Calcular Novamente")
            return

        }
        setImc(null)
        setTextButton("Calcular")
        setMessageImc("Preencha o peso e altura")
    }
    return(
        <View style={styles.formContext}>
            <ScrollView keyboardShouldPersistTaps='handled' style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <TextInput style={styles.input} onChangeText={setHeight} value={height} placeholder="Ex. 1.75"></TextInput>
                <Text style={styles.formLabel}>Peso</Text>
                <TextInput style={styles.input} onChangeText={setWeight} value={weight} placeholder="Ex. 75.365"></TextInput>

                <TouchableOpacity style={styles.buttonCalculation} onPress={() => {validationImc()}}>
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </ScrollView>
            <ResultImc messageResultImc={messageImc} resultImc={imc}/>
        </View>
    );
}