import { View, Text, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/style';


let board = [];
const DICEZ  = 5;
const THROWS = 3;
const CIRCLE = ['numeric-1-circle', 'numeric-2-circle', 'numeric-3-circle', 'numeric-4-circle', 'numeric-5-circle', 'numeric-6-circle'];
let boardSPOT = [];
const SPOTZ = 6;

export default function Gameboard() {
    const [throwsLeft, setThrowsLeft] = useState(THROWS);
    const [wins, setWins] = useState(0);
    const [sum, setSum] = useState(0);
    const [status, setStatus] = useState('');
    const [selectedDice, setSelectedDice] = useState(new Array(DICEZ).fill(false));
    const [selectedSpot, setSelectedSpot] = useState(new Array(SPOTZ).fill(false));


    const row = [];
    for (let i = 0; i < DICEZ; i++) {
            row.push(
        <Pressable
            key={'row' + i}
            onPress={() => selectDice(i)}>
        <MaterialCommunityIcons 
            name={board[i]}
            key={'row' + i}
            size={50}
            color= {getDiceColor(i)}>
        </MaterialCommunityIcons> 
        </Pressable>
        );
    }

    const rowTWO = [];
    for (let i = 0; i < SPOTZ; i++) {
            rowTWO.push(
        <Pressable
            key={'rowTWO' + i}
            onPress={() => selectSpot(i)}>
        <MaterialCommunityIcons 
            name={boardSPOT[i]}
            key={'rowTWO' + i}
            size={50}
            color= {getSpotColor(i)}>
        </MaterialCommunityIcons> 
        </Pressable>
        );
    }

    function getDiceColor(i) {
        if (board.every((val, i, arr) => val === arr[0])){
            return'orange';
        }
        else {
            return selectedDice[i] ? 'black' : 'steelblue';
        }
    };
    
    function selectDice(i) {
        let dices = [...selectedDice];
        dices[i] = selectedDice[i] ? false : true;
        setSelectedDice(dices);
    }

    function getSpotColor(i) {
        if (boardSPOT.every((val, i, arr) => val === arr[0])){
            return'orange';
        }
        else {
            return selectedSpot[i] ? 'black' : 'steelblue';
        }
    };
    
    function selectSpot(i) {
        let spot = [...selectedSpot];
        spot[i] = selectedSpot[i] ? false : true;
        setSelectedSpot(spot);
    }

function throwDices(){
    for (let i = 0; i < DICEZ; i++) {
        if (!selectedDice[i]) {
        let randomNumber = Math.floor(Math.random() * 6 + 1);
        board[i] = 'dice-' + randomNumber;
        }
    }
    setThrowsLeft(throwsLeft-1);
}



useEffect(() => {
    checkBonusPoints();
    if (throwsLeft === THROWS) {
    setStatus('Game has not started');
    }
    else if (throwsLeft < 0 ){
        throwsLeft(THROWS-1);
    }
    }, [throwsLeft]);
    
    

function checkBonusPoints(){
        if (board.every((val, i, arr) => val === arr[0]) && throwsLeft > 0) {
            setStatus('You Won beibi')
        }
        else if (board.every((val, i, arr) => val === arr[0]) && throwsLeft === 0) {
            setStatus('You won, game over')
            setSelectedDice(new Array(DICEZ).fill(false));
        }
        else if (throwsLeft === 0) {
            setStatus('Game over')
            setSelectedDice(new Array(DICEZ).fill(false));
        }
        else {
            setStatus('Keep on throwing babe');
        }
    };


return(
    <View style={styles.gameboard}>
        <View style={styles.flex}>{row}</View>
        <Text style={styles.gameinfo}>Throws left: {throwsLeft}</Text>
        <Text style={styles.gameinfo}>{status}</Text>
        <Pressable style={styles.button}
        onPress={() => throwDices()}>
            <Text style={styles.buttonText}>
                Throw dices
            </Text>
        </Pressable>
        <Text style={styles.gameinfo}>Total: {sum}</Text>
        <View style={styles.flex}>{rowTWO}</View>


    </View>
)
}