const { expect } = require("chai");
const { ethers } = require("hardhat");

// Describimos el conjunto de pruebas para el contrato "ConquerStudents"
describe("ConquerStudents", function () {
  let ConquerStudents;
  let conquerStudents;
  let owner;
  let addr1;
  let addr2;

  // Esta función se ejecuta antes de cada prueba individual
  beforeEach(async function () {
    // Obtenemos la fábrica del contrato "ConquerStudents"
    ConquerStudents = await ethers.getContractFactory("ConquerStudents");
    // Obtenemos tres cuentas diferentes para usar en las pruebas
    [owner, addr1, addr2] = await ethers.getSigners();
    // Desplegamos una nueva instancia del contrato "ConquerStudents"
    conquerStudents = await ConquerStudents.deploy();
    // Esperamos a que el despliegue del contrato se complete
    await conquerStudents.deployed();
    console.log("Contract deployed successfully");
  });

  // Prueba para registrar un nuevo estudiante
  it("should register a new student", async function () {
    console.log("Registering a new student: John Doe, age 20");
    // Llamamos a la función del contrato para registrar un nuevo estudiante
    await conquerStudents.connect(addr1).register_Students("John", "Doe", 20);
    // Obtenemos los datos del estudiante registrado
    const student = await conquerStudents.connect(addr1).getStudentByAddress();
    console.log("Registered student data:", student);
    // Verificamos que los datos del estudiante sean correctos
    expect(student.name).to.equal("John");
    expect(student.surname).to.equal("Doe");
    expect(student.age).to.equal(20);
    expect(student.exist).to.be.true;
  });

  // Prueba para asegurar que no se puede registrar el mismo estudiante dos veces
  it("should not register the same student twice", async function () {
    console.log("Registering the first student: John Doe, age 20");
    // Registramos el primer estudiante
    await conquerStudents.connect(addr1).register_Students("John", "Doe", 20);
    console.log("Attempting to register the same address with different data");
    // Intentamos registrar la misma dirección con datos diferentes
    await conquerStudents.connect(addr1).register_Students("Jane", "Doe", 21);
    // Obtenemos los datos del estudiante registrado
    const student = await conquerStudents.connect(addr1).getStudentByAddress();
    console.log("Data after second registration attempt:", student);
    // Verificamos que los datos no hayan cambiado
    expect(student.name).to.equal("John");
    expect(student.surname).to.equal("Doe");
    expect(student.age).to.equal(20);
    expect(student.exist).to.be.true;

    // Obtenemos todos los estudiantes registrados
    const allStudents = await conquerStudents.getAllStudents();
    console.log("All students after second registration attempt:", allStudents);
    // Verificamos que solo hay un estudiante registrado
    expect(allStudents.length).to.equal(1);
  });

  // Prueba para obtener un estudiante por su dirección
  it("should get student by address", async function () {
    console.log("Registering a student: John Doe, age 20");
    // Registramos un estudiante
    await conquerStudents.connect(addr1).register_Students("John", "Doe", 20);
    // Obtenemos los datos del estudiante por su dirección
    const student = await conquerStudents.connect(addr1).getStudentByAddress();
    console.log("Student data by address:", student);
    // Verificamos que los datos del estudiante sean correctos
    expect(student.name).to.equal("John");
    expect(student.surname).to.equal("Doe");
    expect(student.age).to.equal(20);
    expect(student.exist).to.be.true;
  });

  // Prueba para obtener todos los estudiantes registrados
  it("should get all students", async function () {
    console.log("Registering student 1: John Doe, age 20");
    // Registramos el primer estudiante
    await conquerStudents.connect(addr1).register_Students("John", "Doe", 20);
    console.log("Registering student 2: Jane Doe, age 21");
    // Registramos el segundo estudiante
    await conquerStudents.connect(addr2).register_Students("Jane", "Doe", 21);
    // Obtenemos todos los estudiantes registrados
    const allStudents = await conquerStudents.getAllStudents();
    console.log("All students data:", allStudents);
    // Verificamos que hay dos estudiantes registrados
    expect(allStudents.length).to.equal(2);
    expect(allStudents[0].name).to.equal("John");
    expect(allStudents[1].name).to.equal("Jane");
  });

  // Prueba para obtener un estudiante por su ID
  it("should get student by ID", async function () {
    console.log("Registering student 1: John Doe, age 20");
    // Registramos el primer estudiante
    await conquerStudents.connect(addr1).register_Students("John", "Doe", 20);
    console.log("Registering student 2: Jane Doe, age 21");
    // Registramos el segundo estudiante
    await conquerStudents.connect(addr2).register_Students("Jane", "Doe", 21);
    // Obtenemos los datos del estudiante por su ID
    const student1 = await conquerStudents.getStudentById(0);
    const student2 = await conquerStudents.getStudentById(1);
    console.log("Student data by ID 0:", student1);
    console.log("Student data by ID 1:", student2);
    // Verificamos que los datos de los estudiantes sean correctos
    expect(student1.name).to.equal("John");
    expect(student2.name).to.equal("Jane");
  });

  // Prueba para manejar una dirección de estudiante no existente
  it("should handle non-existent student address", async function () {
    console.log("Attempting to get student data for unregistered address");
    // Intentamos obtener los datos de un estudiante no registrado
    const student = await conquerStudents.connect(addr1).getStudentByAddress();
    console.log("Student data for unregistered address:", student);
    // Verificamos que el estudiante no exista
    expect(student.exist).to.be.false;
  });

  // Prueba para manejar un ID de estudiante inválido
  it("should handle invalid student ID", async function () {
    console.log("Registering a student: John Doe, age 20");
    // Registramos un estudiante
    await conquerStudents.connect(addr1).register_Students("John", "Doe", 20);
    console.log("Attempting to get student by invalid ID 1");
    // Intentamos obtener un estudiante con un ID inválido y verificamos que falle
    await expect(conquerStudents.getStudentById(1)).to.be.revertedWith(
      "revert"
    );
    console.log("Invalid student ID handled successfully");
  });
});
