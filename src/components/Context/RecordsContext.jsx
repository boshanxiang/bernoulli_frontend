import React from 'react';

const baseURL = 'http://localhost:8000/'

let legal_entities = []
let natural_persons = []
let equity_classes = []
let equity_tokens = []
let employment_relations = []
let officer_relations = []
let director_relations = []

const getLegalEntities = () => {
    fetch(baseURL + 'legalentities')
      .then(data => {return data.json()}, err => console.log(err))
      .then(parsedData => {
          legal_entities = parsedData}, err => console.log(err))
      .catch((e) => console.log(e.message))
  }

const getNaturalPersons = () => {
fetch(baseURL + 'naturalpersons')
    .then(data => {return data.json()}, err => console.log(err))
    .then(parsedData => {
        natural_persons = parsedData}, err => console.log(err))
    .catch((e) => console.log(e.message))
}

const getEquityClasses = () => {
fetch(baseURL + 'equityclasses')
    .then(data => {return data.json()}, err => console.log(err))
    .then(parsedData => {
    equity_classes = parsedData}, err => console.log(err))
    .catch((e) => console.log(e.message))
}

const getEquityTokens = () => {
fetch(baseURL + 'equitytokens')
    .then(data => {return data.json()}, err => console.log(err))
    .then(parsedData => {
    equity_tokens = parsedData}, err => console.log(err))      .catch((e) => console.log(e.message))
}

const getEmploymentRelations = () => {
fetch(baseURL + 'employmentrelations')
    .then(data => {return data.json()}, err => console.log(err))
    .then(parsedData => {
    employment_relations = parsedData}, err => console.log(err))
    .catch((e) => console.log(e.message))
}

const getOfficerRelations = () => {
fetch(baseURL + 'directorrelations')
    .then(data => {return data.json()}, err => console.log(err))
    .then(parsedData => {
    officer_relations = parsedData}, err => console.log(err))
    .catch((e) => console.log(e.message))
}

const getDirectorRelations = () => {
fetch(baseURL + 'employmentrelations')
    .then(data => {return data.json()}, err => console.log(err))
    .then(parsedData => {
        director_relations = parsedData}, err => console.log(err))
    .catch((e) => console.log(e.message))
}

const getAllRecords = () => {
    getLegalEntities()
    getNaturalPersons()
    getEquityClasses()
    getEquityTokens()
    getEmploymentRelations()
    getOfficerRelations()
    getDirectorRelations()
}


export const RecordsContext = React.createContext({
    legal_entities: [],
    natural_persons: [],
    equity_classes: [],
    equity_tokens: [],
    employment_relations: [],
    officer_relations: [],
    director_relations: [],
    updateRecords: () => getAllRecords(),
})