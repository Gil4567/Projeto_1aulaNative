import React, {useState} from "react";
import { TextInput, View, ScrollView, Text, TouchableOpacity, Vibration, FlatList } from "react-native";
import ResultImc from "./ResultImc/index";
import styles from "./styles";

export default function Form (){

    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [messageImc, setMessageImc] = useState("Preencha o peso e altura")
    const [imc, setImc] = useState(null)
    const [textButton, setTextButton] = useState("Calcular")
    const [errorMessage, setErrorMessage] = useState(null) 
    const [imcList, setImcList] = useState([])


    function imcCalculator(){
        let heightFormat = height.replace(",",".")
        let totalImc = ((weight/(heightFormat*heightFormat)).toFixed(2))
        setImcList((arr) => [...arr, {id: new Date().getTime(), imc: totalImc}])
        setImc(totalImc)
    }

    function verificationImc(){
        if(imc == null){
            Vibration.vibrate();
            setErrorMessage("Campo obrigatório*")
        }
    }

    function validationImc(){
        console.log(imcList)
        if(weight != null && height != null){
            imcCalculator()
            setHeight(null)
            setWeight(null)
            setMessageImc("Seu imc é igual:")
            setTextButton("Calcular Novamente")
            setErrorMessage(null)
            return

        }
        else{
            verificationImc()
            setImc(null)
            setTextButton("Calcular")
            setMessageImc("Preencha o peso e altura")
        }
        
    }
    return(
        <View style={styles.formContext}>
            {imc == null ?
            <ScrollView keyboardShouldPersistTaps='handled' style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput style={styles.input} onChangeText={setHeight} value={height} placeholder="Ex. 1.75" keyboardType="numeric"></TextInput>
                <Text style={styles.formLabel}>Peso</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput style={styles.input} onChangeText={setWeight} value={weight} placeholder="Ex. 75.365" keyboardType="numeric"></TextInput>

                <TouchableOpacity style={styles.buttonCalculation} onPress={() => {validationImc()}}>
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </ScrollView>
            : 
            <View style={styles.exibitionResultImc}>
            <ResultImc messageResultImc={messageImc} resultImc={imc}/>
            <TouchableOpacity style={styles.buttonCalculation} onPress={() => {validationImc()}}>
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </View>
            }
            <FlatList style={styles.listasImcs} data={imcList.reverse()} renderItem={({item})=>{
                return(
                    <Text style={styles.resultImcItem}>
                        <Text style={styles.textResultItemList}>Resultado IMC = </Text>
                        {item.imc}
                    </Text>
                    
                )
            }} keyExtractor={(item)=>{item.id}}

            />
        </View>
    );
}