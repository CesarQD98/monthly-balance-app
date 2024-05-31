const { db } = require('@vercel/postgres')
const {
  servicios,
  usuarios,
  gastos,
  sueldos,
  contribuciones,
} = require('../app/lib/placeholder-data')
const bcrypt = require('bcrypt')

async function cleanDB(client) {
  try {
    const query = await client.sql`
      DROP TABLE IF EXISTS servicios, usuarios, gastos, sueldos;
    `

    console.log(`→ → Se hizo un clean-up de la DB`)

    return { query }
  } catch (error) {
    console.error('Error al hacer el clean-up:', error)
    throw error
  }
}

async function seedServicios(client) {
  try {
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS servicios (
      servicio_id SERIAL PRIMARY KEY,
      servicio_nombre VARCHAR(255) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `

    console.log(`→ Creada la tabla 'servicios'.`)

    const insertedServicios = await Promise.all(
      servicios.map(async (servicio) => {
        return client.sql`
        INSERT INTO servicios (servicio_nombre)
        VALUES (${servicio.servicio_nombre});
      `
      })
    )

    console.log(`→ Seedeados ${insertedServicios.length} servicios`)

    return {
      createTable,
      servicios: insertedServicios,
    }
  } catch (error) {
    console.error('Error al seedear servicios:', error)
    throw error
  }
}

async function seedUsuarios(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS usuarios (
        usuario_id SERIAL PRIMARY KEY,
        usuario_nombre VARCHAR(255) NOT NULL,
        usuario_email VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `

    console.log(`→ Creada la tabla 'usuarios'.`)

    const insertedUsuarios = await Promise.all(
      usuarios.map(async (usuario) => {
        return client.sql`
        INSERT INTO usuarios (usuario_nombre, usuario_email)
        VALUES (${usuario.usuario_nombre}, ${usuario.usuario_email});
        `
      })
    )

    console.log(`→ Seedeados ${insertedUsuarios.length} usuarios`)

    return {
      createTable,
      usuarios: insertedUsuarios,
    }
  } catch (error) {
    console.error('Error al seedear usuarios:', error)
    throw error
  }
}

async function seedGastos(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE gastos (
        gasto_id SERIAL PRIMARY KEY,
        servicio_id INT NOT NULL REFERENCES servicios(servicio_id),
        gasto_monto DECIMAL(10,2) NOT NULL CHECK (gasto_monto >= 0),
        gasto_fecha DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `

    console.log(`→ Creada la tabla 'gastos'.`)

    const insertedGastos = await Promise.all(
      gastos.map(async (gasto) => {
        return client.sql`
        INSERT INTO gastos (servicio_id, gasto_monto, gasto_fecha)
        VALUES (${gasto.servicio_id}, ${gasto.gasto_monto}, ${gasto.gasto_fecha});
        `
      })
    )

    console.log(`→ Seedeados ${insertedGastos.length} gastos`)

    return {
      createTable,
      gastos: insertedGastos,
    }
  } catch (error) {
    console.error('Error al seedear usuarios:', error)
    throw error
  }
}

async function seedSueldos(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE sueldos (
        sueldo_id SERIAL PRIMARY KEY,
        usuario_id INT NOT NULL REFERENCES usuarios(usuario_id),
        sueldo_monto DECIMAL(10,2) NOT NULL CHECK (sueldo_monto >= 0),
        sueldo_fecha DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `

    console.log(`→ Creada la tabla 'sueldos'.`)

    const insertedSueldos = await Promise.all(
      sueldos.map(async (sueldo) => {
        return client.sql`
          INSERT INTO sueldos (usuario_id, sueldo_monto, sueldo_fecha)
          VALUES (${sueldo.usuario_id}, ${sueldo.sueldo_monto}, ${sueldo.sueldo_fecha});
        `
      })
    )

    console.log(`→ Seedeados ${insertedSueldos.length} sueldos`)

    return {
      createTable,
      sueldos: insertedSueldos,
    }
  } catch (error) {
    console.error('Error al seedear sueldos:', error)
    throw error
  }
}

async function seedContribuciones(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE contribuciones (
        contribucion_id SERIAL PRIMARY KEY,
        usuario_id INT NOT NULL REFERENCES usuarios(usuario_id),
        contribucion_monto DECIMAL(10,2) NOT NULL CHECK (contribucion_monto >= 0),
        contribucion_fecha DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `

    console.log(`→ Creada la tabla 'contribuciones'.`)

    const insertedContribuciones = await Promise.all(
      contribuciones.map(async (contribucion) => {
        return client.sql`
          INSERT INTO contribuciones (usuario_id, contribucion_monto, contribucion_fecha)
          VALUES (${contribucion.usuario_id}, ${contribucion.contribucion_monto}, ${contribucion.contribucion_fecha})
        `
      })
    )

    console.log(`→ Seedeados ${insertedContribuciones.length} contribuciones`)

    return {
      createTable,
      contribuciones: insertedContribuciones,
    }
  } catch (error) {
    console.error('Error al seedear contribuciones:', error)
    throw error
  }
}

async function main() {
  const client = await db.connect()

  await cleanDB(client)

  await seedServicios(client)
  await seedUsuarios(client)
  await seedGastos(client)
  await seedSueldos(client)
  await seedContribuciones(client)

  await client.end()
}

main().catch((err) => {
  console.error(
    'Ha ocurrido un error mientras se intentaba seedear la base de datos:',
    err
  )
})
