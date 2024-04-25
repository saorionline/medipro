
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
    printName: function(){
        console.log('Hola ${this.name}')
    },
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

// Test para verificar que está prohibido borrar el atributo "name"
delete patientTemplate.name
console.log("Test 1:", patientTemplate)

// Restringir eliminación de atributos
Object.seal(patientTemplate);

// Verificar que está prohibido borrar los atributos de un objeto
Object.isSealed(patientTemplate);

// Verificar que está prohibido borrar ni editar los atributos de un objeto
Object.isFrozen(patientTemplate);

