// Leer datos del sensor MAX30102
function readSensorData () {
    // Dirección del registro de datos
    pins.i2cWriteNumber(
    MAX30102_I2C_ADDRESS,
    6,
    NumberFormat.UInt8LE,
    false
    )
    data2 = pins.i2cReadNumber(MAX30102_I2C_ADDRESS, NumberFormat.UInt16BE, false)
    return data2
}
// Configuración inicial del MAX30102
function setupMAX30102 () {
    basic.showIcon(IconNames.Heart)
    // Reset del dispositivo
    pins.i2cWriteNumber(
    MAX30102_I2C_ADDRESS,
    MAX30102_MODE_CONFIG,
    NumberFormat.UInt8LE,
    false
    )
    // Valor de reset
    pins.i2cWriteNumber(
    MAX30102_I2C_ADDRESS,
    64,
    NumberFormat.UInt8LE,
    false
    )
    basic.pause(100)
    // Configurar modo de SpO2
    pins.i2cWriteNumber(
    MAX30102_I2C_ADDRESS,
    MAX30102_PARTICLE_CONFIG,
    NumberFormat.UInt8LE,
    false
    )
    // Modo de SpO2
    pins.i2cWriteNumber(
    MAX30102_I2C_ADDRESS,
    3,
    NumberFormat.UInt8LE,
    false
    )
    basic.pause(100)
    // Configurar intensidad de LEDs
    pins.i2cWriteNumber(
    MAX30102_I2C_ADDRESS,
    MAX30102_LED_CONFIG,
    NumberFormat.UInt8LE,
    false
    )
    // Intensidad del LED rojo
    pins.i2cWriteNumber(
    MAX30102_I2C_ADDRESS,
    36,
    NumberFormat.UInt8LE,
    false
    )
    // Intensidad del LED IR
    pins.i2cWriteNumber(
    MAX30102_I2C_ADDRESS,
    36,
    NumberFormat.UInt8LE,
    false
    )
}
let temp = 0
let z = 0
let y = 0
let x = 0
let data = 0
let data2 = 0
let MAX30102_PARTICLE_CONFIG = 0
let MAX30102_LED_CONFIG = 0
let MAX30102_MODE_CONFIG = 0
let MAX30102_I2C_ADDRESS = 0
basic.showString("Hello!")
// Dirección I2C del MAX30102
MAX30102_I2C_ADDRESS = 104
// Registro de configuración del MAX30102
MAX30102_MODE_CONFIG = 9
MAX30102_LED_CONFIG = 10
MAX30102_PARTICLE_CONFIG = 11
// Configurar el sensor al inicio
setupMAX30102()
// Inicializar Bluetooth
bluetooth.startUartService()
// Bucle principal
basic.forever(function () {
    // Leer datos del sensor MAX30102
    data = readSensorData()
    // Mostrar los datos del MAX30102 en la consola serial y enviarlos por Bluetooth
    serial.writeLine("MAX30102 Data: " + data)
    bluetooth.uartWriteLine("MAX30102 Data: " + data)
    basic.showNumber(data)
    basic.pause(1000)
    // Leer valores del acelerómetro
    x = input.acceleration(Dimension.X)
    y = input.acceleration(Dimension.Y)
    z = input.acceleration(Dimension.Z)
    // Mostrar los valores de aceleración en la consola serial y enviarlos por Bluetooth
    serial.writeLine("Aceleración X: " + x + " mg")
    serial.writeLine("Aceleración Y: " + y + " mg")
    serial.writeLine("Aceleración Z: " + z + " mg")
    bluetooth.uartWriteLine("Aceleración X: " + x + " mg")
    bluetooth.uartWriteLine("Aceleración Y: " + y + " mg")
    bluetooth.uartWriteLine("Aceleración Z: " + z + " mg")
    // Mostrar la aceleración en X en la pantalla de la micro:bit
    basic.showNumber(x)
    basic.pause(1000)
    // Leer temperatura del sensor interno
    temp = input.temperature()
    // Mostrar la temperatura en la consola serial y enviarla por Bluetooth
    serial.writeLine("Temperatura: " + temp + " °C")
    bluetooth.uartWriteLine("Temperatura: " + temp + " °C")
    // Mostrar la temperatura en la pantalla de la micro:bit
    basic.showNumber(temp)
    basic.pause(1000)
})
