import express from "express";

let cache = []

const app = express();

app.use(express.json());

app.post('/transacao', (req, res) => {
    const dados = req.body;
    if (dados.valor >= 0 && Date.parse(dados.dataHora) <= Date.now()) {
        cache.push(dados);
        // res.statusMessage = "Created with Sucess";
        res.status(200).json({});
        return;
    } else if (dados.valor < 0 || Date.parse(dados.dataHora) > Date.now()) {
        // res.statusMessage = "Unprocessable Entity, Try Again";
        res.status(422).json({});
        return;
    } else {
        // res.statusMessage = "Bad Request, Try Again";
        res.status(400).json({});
        return; 
    }
})

app.delete('/delete', (req, res) => {
    cache = []
    res.statusMessage = "OK, Fine";
    res.status(200).json({})
    return;
})

app.get('/estatistica', (req, res) => {
    let count = 0, sum = 0, avg = 0, min = 0, max = 0;
    for (const transacao of cache) {
        if (Date.parse(transacao.dataHora) >= (Date.now() - 60 * 1000)) {
            count++;
            sum += transacao.valor;
            avg = sum / count;
            if (count === 1) {
                min = transacao.valor;
                max = transacao.valor;
            }
            if (min > parseFloat(transacao.valor)) {
                min = parseFloat(transacao.valor) || 0;
            }
            if (max < parseFloat(transacao.valor)) {
                max = parseFloat(transacao.valor);
            }
        };
    };
    // res.statusMessage = "OK, Take your Statistics";
    res.status(200).json({
        count,
        sum,
        avg,
        min,
        max
    })
    return;
})

app.listen(3000)