
# Explicación de las Pruebas del Contrato `ConquerStudents`

Este documento explica paso a paso cómo funcionan las pruebas para el contrato `ConquerStudents` en Solidity utilizando Hardhat y Chai.

## Estructura Básica

El código de prueba está escrito en JavaScript utilizando las librerías `chai` y `hardhat` para probar un contrato inteligente de Solidity llamado `ConquerStudents`.

### 1. Importación de Librerías

```javascript
const { expect } = require("chai");
const { ethers } = require("hardhat");
```

Estas líneas importan las librerías `chai` y `hardhat`. `chai` es una librería de aserciones que nos permite verificar que los resultados de nuestras pruebas son correctos. `hardhat` es una herramienta de desarrollo para Ethereum.

### 2. Descripción del Conjunto de Pruebas

```javascript
describe("ConquerStudents", function () {
```

Esta línea inicia un conjunto de pruebas para el contrato `ConquerStudents`. `describe` es una función de `mocha`, un framework de pruebas en JavaScript.

### 3. Variables y Configuración Inicial

```javascript
  let ConquerStudents;
  let conquerStudents;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    ConquerStudents = await ethers.getContractFactory("ConquerStudents");
    [owner, addr1, addr2] = await ethers.getSigners();
    conquerStudents = await ConquerStudents.deploy();
    await conquerStudents.deployed();
    console.log("Contract deployed successfully");
  });
```

Estas líneas declaran algunas variables que se usarán en las pruebas:

- `ConquerStudents`: Para almacenar la fábrica del contrato.
- `conquerStudents`: Para almacenar la instancia del contrato desplegado.
- `owner`, `addr1`, `addr2`: Para almacenar diferentes cuentas de Ethereum que se usarán en las pruebas.

`beforeEach` es una función que se ejecuta antes de cada prueba individual. En esta función, desplegamos una nueva instancia del contrato `ConquerStudents` antes de cada prueba.

### 4. Pruebas Individuales

#### Registro de un Nuevo Estudiante

```javascript
  it("should register a new student", async function () {
    console.log("Registering a new student: John Doe, age 20");
    await conquerStudents.connect(addr1).register_Students("John", "Doe", 20);
    const student = await conquerStudents.connect(addr1).getStudentByAddress();
    console.log("Registered student data:", student);
    expect(student.name).to.equal("John");
    expect(student.surname).to.equal("Doe");
    expect(student.age).to.equal(20);
    expect(student.exist).to.be.true;
  });
```

Esta prueba verifica que un estudiante puede registrarse correctamente.

1. `console.log` imprime un mensaje en la consola para indicar que se está registrando un nuevo estudiante.
2. `await conquerStudents.connect(addr1).register_Students("John", "Doe", 20);` llama a la función del contrato para registrar un nuevo estudiante con la dirección `addr1`.
3. `const student = await conquerStudents.connect(addr1).getStudentByAddress();` obtiene los datos del estudiante recién registrado.
4. `console.log` imprime los datos del estudiante registrado en la consola.
5. `expect` verifica que los datos del estudiante sean correctos.

#### No Registrar el Mismo Estudiante Dos Veces

```javascript
  it("should not register the same student twice", async function () {
    console.log("Registering the first student: John Doe, age 20");
    await conquerStudents.connect(addr1).register_Students("John", "Doe", 20);
    console.log("Attempting to register the same address with different data");
    await conquerStudents.connect(addr1).register_Students("Jane", "Doe", 21);
    const student = await conquerStudents.connect(addr1).getStudentByAddress();
    console.log("Data after second registration attempt:", student);
    expect(student.name).to.equal("John");
    expect(student.surname).to.equal("Doe");
    expect(student.age).to.equal(20);
    expect(student.exist).to.be.true;

    const allStudents = await conquerStudents.getAllStudents();
    console.log("All students after second registration attempt:", allStudents);
    expect(allStudents.length).to.equal(1);
  });
```

Esta prueba asegura que no se puede registrar la misma dirección dos veces con diferentes datos.

1. Registra al estudiante `John Doe`.
2. Intenta registrar la misma dirección con datos diferentes `Jane Doe`.
3. Verifica que los datos no cambian después del segundo intento.
4. Verifica que solo hay un estudiante registrado en total.

#### Obtener Estudiante por Dirección

```javascript
  it("should get student by address", async function () {
    console.log("Registering a student: John Doe, age 20");
    await conquerStudents.connect(addr1).register_Students("John", "Doe", 20);
    const student = await conquerStudents.connect(addr1).getStudentByAddress();
    console.log("Student data by address:", student);
    expect(student.name).to.equal("John");
    expect(student.surname).to.equal("Doe");
    expect(student.age).to.equal(20);
    expect(student.exist).to.be.true;
  });
```

Esta prueba verifica que se puede obtener un estudiante por su dirección.

#### Obtener Todos los Estudiantes

```javascript
  it("should get all students", async function () {
    console.log("Registering student 1: John Doe, age 20");
    await conquerStudents.connect(addr1).register_Students("John", "Doe", 20);
    console.log("Registering student 2: Jane Doe, age 21");
    await conquerStudents.connect(addr2).register_Students("Jane", "Doe", 21);
    const allStudents = await conquerStudents.getAllStudents();
    console.log("All students data:", allStudents);
    expect(allStudents.length).to.equal(2);
    expect(allStudents[0].name).to.equal("John");
    expect(allStudents[1].name).to.equal("Jane");
  });
```

Esta prueba verifica que se pueden obtener todos los estudiantes registrados.

#### Obtener Estudiante por ID

```javascript
  it("should get student by ID", async function () {
    console.log("Registering student 1: John Doe, age 20");
    await conquerStudents.connect(addr1).register_Students("John", "Doe", 20);
    console.log("Registering student 2: Jane Doe, age 21");
    await conquerStudents.connect(addr2).register_Students("Jane", "Doe", 21);
    const student1 = await conquerStudents.getStudentById(0);
    const student2 = await conquerStudents.getStudentById(1);
    console.log("Student data by ID 0:", student1);
    console.log("Student data by ID 1:", student2);
    expect(student1.name).to.equal("John");
    expect(student2.name).to.equal("Jane");
  });
```

Esta prueba verifica que se puede obtener un estudiante por su ID.

#### Manejar Dirección de Estudiante No Existente

```javascript
  it("should handle non-existent student address", async function () {
    console.log("Attempting to get student data for unregistered address");
    const student = await conquerStudents.connect(addr1).getStudentByAddress();
    console.log("Student data for unregistered address:", student);
    expect(student.exist).to.be.false;
  });
```

Esta prueba asegura que no se puede obtener datos para una dirección no registrada.

#### Manejar ID de Estudiante Inválido

```javascript
  it("should handle invalid student ID", async function () {
    console.log("Registering a student: John Doe, age 20");
    await conquerStudents.connect(addr1).register_Students("John", "Doe", 20);
    console.log("Attempting to get student by invalid ID 1");
    await expect(conquerStudents.getStudentById(1)).to.be.revertedWith("Invalid student ID");
    console.log("Invalid student ID handled successfully");
  });
```

Esta prueba asegura que intentar obtener un estudiante con un ID inválido resulta en un error.

### Resumen

1. **Preparación**: Antes de cada prueba, se despliega un nuevo contrato.
2. **Pruebas Individuales**: Cada prueba realiza acciones específicas y verifica resultados.
3. **Aserciones**: Se utilizan `expect` para verificar que los resultados son los esperados.
4. **Mensajes en Consola**: `console.log` imprime mensajes para proporcionar información adicional sobre lo que está sucediendo en cada paso.

Espero que esta explicación te ayude a entender cómo funcionan las pruebas y cómo escribir las tuyas propias. Si tienes alguna duda específica, ¡no dudes en preguntar!
