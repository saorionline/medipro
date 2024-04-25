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
    name: "Treatment 01",
    movements: [],
}

const testOne = createApprovedMovs({
    name: "Movement 01",
    movements:[]
})

//Seed data
const testPatient = createPatient2({
    name: "John Doe",
    email: "john.doe@example.com",
    age: 30,
    assignedDoctor: "Dr. Smith",
    listOfOrders: ["Order 1", "Order 2"],
    prescriptions: ["Prescription 1", "Prescription 2"],
    approvedMovements: [
        { name: "Movement 1", movements: ["Request 1", "Request 2"] },
        { name: "Movement 2", movements: ["Request 3", "Request 4"] },
    ],
    treatmentPaths: [
        { name: "Treatment 1", movements: ["Request 5", "Request 6"] },
        { name: "Treatment 2", movements: ["Request 7", "Request 8"] },
    ],
});

// Y así se van agregando más instancias y prototipos secuencialmente. 🤓

// Seeds
console.log(testPatient.name); // Output: "John Doe"
console.log(testPatient.email); // Output: "john.doe@example.com"
console.log(testPatient.age); // Output: 30
console.log(testPatient.assignedDoctor); // Output: "Dr. Smith"
console.log(testPatient.listOfOrders); // Output: ["Order 1", "Order 2"]
console.log(testPatient.prescriptions); // Output: ["Prescription 1", "Prescription 2"]
console.log(testPatient.approvedMovements); // Output: Array with 2 objects
console.log(testPatient.treatmentPaths); // Output: Array with 2 objects

// Seed 2
console.log(testApprovedMovs.name); // Output: "Movement 1"
console.log(testApprovedMovs.movements); // Output: Array with 2 elements