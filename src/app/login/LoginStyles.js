import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    login:{
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        formTitle: {
            fontSize: 30,
            fontWeight: 'bold',
            color: '#9d6964',
            margin: 10,
        },
        formImput: {
            borderColor: '#9d6964',
            borderWidth: 1,
            borderRadius: 10,
            fontSize: 18,
            width: '80%',
            padding: 10,
            margin: 10,
        },
    
        formButton: {
            backgroundColor: '#9d6964',
            width: '80%',
            margin: 10,
            padding: 10,
            borderRadius: 10,
            alignItems: 'center',
        },
    
        textButton: {
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
        },
    
        subContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '80%',
        },
    
        subButton: {
            padding: 10,
        },
    
        subTextButton: {
            color: '#9d6964',
        },
    }
    

});