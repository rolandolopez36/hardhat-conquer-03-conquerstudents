# ConquerStudents Project

## Descripción

Este proyecto es un contrato inteligente llamado `ConquerStudents` escrito en Solidity. El contrato permite registrar, gestionar y consultar información de estudiantes en la blockchain de Ethereum.

## Descripción del Contrato

El contrato `ConquerStudents` permite:

- Registrar un nuevo estudiante.
- Obtener la información de un estudiante por su dirección.
- Obtener la lista de todos los estudiantes registrados.
- Obtener la información de un estudiante por su ID.

## Descripción de las Pruebas

Las pruebas se encuentran en el archivo `test/ConquerStudentsTest.js` y están diseñadas para verificar las funcionalidades del contrato `ConquerStudents`. Las pruebas incluyen:

1. **Registro de un nuevo estudiante**
2. **No permitir registrar el mismo estudiante dos veces**
3. **Obtener estudiante por dirección**
4. **Obtener todos los estudiantes**
5. **Obtener estudiante por ID**
6. **Manejar dirección de estudiante no existente**
7. **Manejar ID de estudiante inválido**

Para más detalles sobre las pruebas, puedes consultar el archivo [Explicacion_Pruebas_ConquerStudents.md](Explicacion_Pruebas_ConquerStudents.md).

## Requisitos

- Node.js
- Yarn
- Hardhat
- Chai

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/rolandolopez36/hardhat-conquer-03-conquerstudents.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd hardhat-conquer-03-conquerstudents
   ```

3. Instala las dependencias:

   ```bash
   yarn install
   ```

## Uso

### Compilar el Contrato

Para compilar el contrato inteligente, ejecuta:

```bash
yarn hardhat compile
```

### Desplegar el Contrato

Para desplegar el contrato en una red local, ejecuta:

```bash
yarn hardhat deploy
```

### Ejecutar las Pruebas

Para ejecutar las pruebas, ejecuta:

```bash
yarn hardhat test
```

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request para mejorar el proyecto.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
