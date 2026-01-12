import fetch from "node-fetch";

async function request() {
    const res = await fetch(
        "http://localhost:3000/transacao",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                valor: -0.2,
                dataHora: new Date(1).toISOString(),
            }),
        }
    );

    console.log("Status Code:", res.status);
    console.log("Status Text:", res.statusText); 
    const data = await res.json();
    console.log("Resposta:", data);
}

request();