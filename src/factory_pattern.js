// Otra forma de fabricar objetos y RORO (Recibir un Objeto, Retornar un Objeto) sin deep copy ni recursividad

//Función Recursiva. Regresando un valor Booleano, comprueba que sea un objeto
function isObject(subject){
    return typeof subject == "object";
}
// Función recursiva. Regresando un valor Booleano, comprueba que sea un array
function isArray(subject){
    return Array.isArray(subject);
}

function requiredParam(param) {
    throw new Error(param + " Required Field.")
}

function createPatient ({
    name = requiredParam("name"),
    email = "email",
    age = requiredParam(12),
    socialSecurityNum = "social security num",
    
    assignedDoctor,
    listOfOrders,
    prescriptions,
     
    approvedMovements = [],
    treatmentPaths = [],   
} = {}) {
    return {
    name,
    email,
    age,
    socialSecurityNum,   
    turnStatus :{
        assignedDoctor,
        listOfOrders,
        prescriptions,
    },
    approvedMovements,
    treatmentPaths,      
    }
}

// Seed the Object with data
const dummyPatient = createPatient({
    name: "Dummy Patient 01",
    email: `dummy-patient-01@example.com`,
    age: 13,
    socialSecurityNum: `123-45-6789-01`,
    approvedMovements: [ true, false, false],
    treatmentPaths: [ 'a', 'b', 'c'],
  });

console.log("List of patients", dummyPatient);
