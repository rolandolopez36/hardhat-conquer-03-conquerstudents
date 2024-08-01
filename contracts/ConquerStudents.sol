// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

contract ConquerStudents {
    
    struct Students {
        // Define una estructura llamada 'Students' que almacena la información de los estudiantes.
        
        string name;      // Variable para almacenar el nombre del estudiante.
        string surname;   // Variable para almacenar el apellido del estudiante.
        uint8 age;        // Variable para almacenar la edad del estudiante.
        bool exist;       // Variable booleana para verificar si el estudiante existe.
    }
    
    mapping(address => Students) students;
    // Crea un mapeo que asocia una dirección de Ethereum con una estructura 'Students'.

    uint32 numStudents;
    // Variable que cuenta el número total de estudiantes registrados.

    Students [] allStudents;
    // Array dinámico que almacena todas las estructuras de estudiantes.

    address [] studentAddress;
    // Array dinámico que almacena las direcciones de los estudiantes.

    function register_Students(string memory _name, string memory _surname, uint8 _age) public {
        // Función pública para registrar un nuevo estudiante. Recibe el nombre, apellido y edad como parámetros.
        
        if (!students[msg.sender].exist) {
            // Verifica si el estudiante no está registrado ya (si 'exist' es false).
            
            students[msg.sender] = Students(_name, _surname, _age, true);
            // Crea una nueva estructura de estudiante y la asocia con la dirección del remitente (msg.sender).
            
            allStudents.push(students[msg.sender]);
            // Agrega la estructura del estudiante al array 'allStudents'.
            
            numStudents++;
            // Incrementa el contador de estudiantes.
            
            studentAddress.push(msg.sender);
            // Agrega la dirección del estudiante al array 'studentAddress'.
        }
    }

    function getStudentByAddress() public view returns(Students memory) {
        // Función pública que permite obtener la estructura del estudiante asociada a la dirección que llama a la función.
        // La función es de solo lectura (view) y devuelve la estructura del estudiante.
        
        return students[msg.sender];
        // Retorna la estructura del estudiante asociada a la dirección del remitente (msg.sender).
    }

    function getAllStudents() public view returns (Students [] memory) {
        // Función pública que devuelve un array con todas las estructuras de los estudiantes.
        // La función es de solo lectura (view) y retorna un array de estructuras 'Students'.
        
        return allStudents;
        // Retorna el array 'allStudents' que contiene todas las estructuras de los estudiantes.
    }

    function getStudentById(uint8 id) public view returns (Students memory) {
        // Función pública que permite obtener la estructura de un estudiante mediante su ID.
        // La función es de solo lectura (view) y devuelve una estructura 'Students'.
        
        return students[studentAddress[id]];
        // Retorna la estructura del estudiante asociada a la dirección almacenada en 'studentAddress' en el índice 'id'.
    }
}
