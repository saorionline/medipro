//Función Recursiva. Regresando un valor Booleano, comprueba que sea un objeto
function isObject(subject){
    return typeof subject == "object";
}
// Función recursiva. Regresando un valor Booleano, comprueba que sea un array
function isArray(subject){
    return Array.isArray(subject);
}

//Función recursiva para copiar el valor de un objeto previo sin modificar el anterior.

function deepCopy(subject) {
    let copySubject;
    const subjectIsObject = isObject(subject);
    const subjectIsArray = isArray(subject);

    if (subjectIsObject) {
        copySubject = {};
    }
    else if (subjectIsArray) {
        copySubject = [];
    } else {
        return subject;
    }

    for (key in subject) {
        const keyIsObject = isObject(subject[key]);
        if (keyIsObject) {
            copySubject[key] = deepCopy(subject[key]);
        } else {
            if(subjectIsArray) {
                copySubject.push(subject[key]);
            } else {
                copySubject[key] = subject[key];
            }
        }
    }
    return copySubject
}


const patientTemplate = {
    name: undefined,//"Alejandro",
    age: undefined, //12,
    email: undefined,
    gender: undefined,
    /*printName: function(){
        console.log('Hola ${this.name}')
    },*/
    approvedMovements: undefined,
    treatmentPaths: undefined, 
    turnStatus: {
        assignedDoctor: undefined,
        listOfOrders: undefined,
        prescriptions: undefined,
    },
};

// Seed new Object
const newUser = deepCopy(patientTemplate);
const newUser2 = deepCopy(patientTemplate);

//Encapsulamiento
Object.defineProperty(newUser, "name", {
    value: "Dummy Name",
    configurable: false
})

// Prevenir que nuevas propiedades sean adheridas al Objecto
Object.freeze(patientTemplate);

//Shallow Copy
const newPatient = Object.create(patientTemplate)
const newPatient2 = Object.assign({}, patientTemplate)

patientTemplate.turnStatus.assignedDoctor = "Doctora Diana"
//Si hacemos modificaciones en los Objetos Anidados, se verá afectados los demás
console.log("Primer Actualizacion:", patientTemplate)