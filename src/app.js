import express from "express"

const app = express()

const services = [
    {
        id: 1,
        name: "Consulta médica general",
        duration: 30,
        price: 12000,
        category: "salud",
        available: true
    },
    {
        id: 2,
        name: "Sesión de fisioterapia",
        duration: 45,
        price: 15000,
        category: "rehabilitación",
        available: true
    }
];

app.get("/", (req, res)=>{
     
    res.status(200).json({
        status: "success",
        message: "API del Sistema de Turnos y Reservas"
    })

})

app.get("/api/services", (req, res)=>{
    res.status(200).json({
        status: "success",
        data: services
    })
})

export default app