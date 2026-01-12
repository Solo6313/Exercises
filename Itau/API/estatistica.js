import fetch from "node-fetch";

async function request() {
    const res = await fetch(
        "http://localhost:3000/estatistica",
        {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }
    );

    console.log("Status Code:", res.status);
    console.log("Status Text:", res.statusText);
    const data = await res.json();
    console.log("Resposta:", data);
}

request();