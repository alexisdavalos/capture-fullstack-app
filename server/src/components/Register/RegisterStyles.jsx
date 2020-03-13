import React from "react";
import styled from 'styled-components';
import background from '../../imgs/background.png'
import logo from '../../imgs/logo.png'

export const BackgroundImage = styled.div`
    width:100%;
    height:100vh;
    background-image: url(${background});
    background-size: cover;
    background-position:center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 5%;
    box-sizing: border-box;
    `;

export const CaptureLogo = styled.div`
    text-align: center;
    background-image: url(${logo});
    background-size: contain;
    background-repeat: no-repeat;
    width:15%;
    height: 10vh;
    margin-bottom: 2%;
    `;


export const FormContainer = styled.div`
    background: #F4F5F7;
    display: flex;
    justify-content: center;
    `;

export const TextContainer = styled.div`
    background: #FFFFFF;
    border: 0.3px solid #959595;
    border-radius: 5px;
    padding-top: 5%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 60%;
    margin: 0 auto;
    `;

export const BioContainer = styled.div`
    background: #FFFFFF;
    border: 0.3px solid #959595;
    border-radius: 5px;
    padding-top: 5%;
    display: flex;
    justify-content: flex-start;
    height: 10vh;
    flex-direction: column;
    margin: 0 auto;
    width: 60%;
    `;


export const Button = styled.button`
    width: 300px;
    height: 35px;
    background: #38A1DE;
    border-radius: 5px;
    color: white;
    margin-top: 10%;
    margin-bottom: 15%;
    `;

export const P = styled.p`
    font-size: 0.6rem;
    `;