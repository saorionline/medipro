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
/*
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
*/
// Convertiremos functiones creatingApprovedMovs y createPatient2 en prototipos
function createApprovedMovs({
    name = requiredParam('name'),
    movements = [],
}) {
    const private = {
        '_name': name,
        '_movements': movements, 
    };
    const public = {
        get name() {
            return private['_name'];
        },

        set name(newName) {
            if (newName.length != 0) {
                private['_name'] = newName;
            } else {
                console.warn("The name is expected to have at least one character")
            }
        },

        get movements() {
            return private['_movements'];
        },
    };
};
//Función recursiva para copiar el valor de un objeto previo sin modificar el anterior.
/*
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

*/


// Module Pattern, Create Student with Private and Public Parameters
function createPatient2({
    name = requiredParam("name"),
    email = "email",
    age = requiredParam("12"),
    socialSecurityNum = "123-456-789-01",
    assignedDoctor,
    listOfOrders,
    prescriptions,
    approvedMovements = [],
    treatmentPaths = [],   
} = {}) {
    const privateAttributes = {
        '_name': name,
        '_treatmentPaths': treatmentPaths, // New Feature Added
    };

    const publicAttributes = {
        email,
        age,
        socialSecurityNum,   
        turnStatus :{
            assignedDoctor,
            listOfOrders,
            prescriptions,
        },
        approvedMovements,
        //treatmentPaths, // Removed because of New Feature      
        
        get name(){
            return privateAttributes['_name'];
        },

        set name(newName){
            if (newName.length != 0) {
                privateAttributes['_name'] = newName; 
            } else {
                console.warn("The name is expected to have at least one character");
            }
        },

        get treatmentPaths() {
            return private['_treatmentPaths'];
        },

        set treatmentPaths(newTreatment){
            // Duck Typing
            if(!newTreatment.name) {
                //
                console.warn("Patients treatment doesnt have a title");
                return;
            }
            if(!newTreatment.movements) {
                console.warn("Patients treatment doesnt have a pending requests");
                return;
            }
            if(!isArray(newTreatment.movements)) {
                // Si el atributo "movements" in the new Treatment NO es un array
                console.warn("Patients treatment is not list");
                return;
            }
            /* Si el Nuevo Tratamiento pasa todas las validaciones: 
                tiene título, tiene requerimientos, y es una lista
                    Ruta Valida! Procedemos a añadir ese Tratamiento a la lista*/
                privateAttributes['_treatmentPaths'].push(newTreatment); 
        },
    };
    return publicAttributes;
}

// Seed the Object with data
const dummyPatient = createPatient2({
    name: "Dummy Patient 01",
    email: `dummy-patient-01@example.com`,
    age: 13,
    socialSecurityNum: `123-45-6789-01`,
    approvedMovements: [ true, false, false],
    treatmentPaths: [ 'a', 'b', 'c'],
  });

console.log("List of patients:", dummyPatient);
console.log("Name:", dummyPatient.name); //Getter

dummyPatient.name = "New Name"; //Setter;
console.log("Name:", dummyPatient.name); //Getter

dummyPatient.treatmentPaths = {
    name: "Dummy Treatment",
    movements: [],
}

const primareCare = createApprovedMovs({
    name: "Primary Care",
    movements:[]
})
