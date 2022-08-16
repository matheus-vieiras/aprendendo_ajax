const bodyParse = require('body-parser')
const express = require('express')
const app = express()

// prove os arquivos static a partir da aplicacao middleware

app.use(express.static('.'))
app.use(bodyParse.urlencoded({extended: true})) // ou formato de submit de formulario
app.use(bodyParse.json()) // irá aplicar o json em um objeto

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './upload')
    },
    filename: function (req, file, callback) {
        callback(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({storage}).single('arquivo')

app.post('/upload', (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.end('Ocorreu um erro.')
        }

        res.end('Concluido com sucesso!')

    })
})

app.listen(8080, () => console.log('Executando...'))
